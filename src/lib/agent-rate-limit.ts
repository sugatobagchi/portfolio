type Bucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

const MINUTE_WINDOW_MS = 60_000;
const MINUTE_LIMIT = 8;
const HOUR_WINDOW_MS = 3_600_000;
const HOUR_LIMIT = 30;

const minuteBuckets = new Map<string, Bucket>();
const hourBuckets = new Map<string, Bucket>();

function checkWindow(
  store: Map<string, Bucket>,
  key: string,
  windowMs: number,
  limit: number,
): RateLimitResult {
  const now = Date.now();
  let bucket = store.get(key);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    store.set(key, bucket);
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: bucket.resetAt,
    };
  }

  bucket.count += 1;

  return {
    success: true,
    limit,
    remaining: limit - bucket.count,
    resetAt: bucket.resetAt,
  };
}

/** Per-IP rate limit for the public agent demo (in-memory, per server instance). */
export function checkAgentRateLimit(clientKey: string): RateLimitResult {
  const minute = checkWindow(minuteBuckets, clientKey, MINUTE_WINDOW_MS, MINUTE_LIMIT);
  if (!minute.success) return minute;

  const hour = checkWindow(hourBuckets, clientKey, HOUR_WINDOW_MS, HOUR_LIMIT);
  if (!hour.success) return hour;

  return {
    success: true,
    limit: MINUTE_LIMIT,
    remaining: Math.min(minute.remaining, hour.remaining),
    resetAt: Math.min(minute.resetAt, hour.resetAt),
  };
}

export function getClientIpFromHeaders(headerStore: Headers): string {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  return headerStore.get("x-real-ip") ?? "unknown";
}
