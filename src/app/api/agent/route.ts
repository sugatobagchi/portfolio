import { GoogleGenAI } from "@google/genai";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { volunteer } from "@/data/volunteer";
import {
  checkAgentRateLimit,
  getClientIpFromHeaders,
} from "@/lib/agent-rate-limit";
import fs from "fs";
import path from "path";
import { headers } from "next/headers";
import { z } from "zod";

export const runtime = "nodejs";

const MAX_PROMPT_LENGTH = 500;

const requestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(MAX_PROMPT_LENGTH, "Prompt is too long"),
});

const SYSTEM_INSTRUCTION = `You are a portfolio assistant for Sugato Bagchi. Be direct, friendly, and concise — 1 to 2 short sentences max. No emojis, no hype.

CRITICAL FACTS TO INCLUDE IF ASKED:
* Sugato is a full-stack engineer. His full-stack skills include: Next.js, React.js, Tailwind CSS, Node.js, Express.js, PostgreSQL, Prisma, Firebase, Docker, GCP.
* His AI/ML skills include: Gemini, Vertex AI, LangChain, RAG, Generative AI, PyTorch, FastAPI, Google AI Studio.
* He is currently working at Steora AI as a Software Engineer.
* His community work includes GDG Cloud Kolkata, and Machine Learning Kolkata.
* He is based in Kolkata, India.

ALWAYS respond with strictly valid JSON using this exact shape:
{
  "message": "A short, direct, friendly response — 1 to 2 sentences, no emojis.",
  "a2ui": {
    "component": "Timeline" | "SkillGrid" | "VolunteerList" | "LocationMap" | "None",
    "props": {}
  }
}

Component Rules:
1. For work experience or career timeline: Use "Timeline" and pass { "items": [ { "company": "...", "role": "...", "period": "...", "outcome": "1-2 short lines highlighting the key impact." } ] }. Start from the latest role at the top. Map over the provided Experience Data.
2. For tech stack, skills, or what tools Sugato uses: Use "SkillGrid" and pass { "sections": [ { "name": "Full-Stack", "color": "emerald", "skills": ["Next.js", "React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Docker", "GCP", "Firebase"] }, { "name": "AI / ML", "color": "violet", "skills": ["Gemini", "Vertex AI", "LangChain", "RAG", "Generative AI", "PyTorch", "FastAPI", "Google AI Studio"] } ] }. Always use this exact two-section format when the question is about the full/general tech stack. If the user asks only about ML or only about full-stack, return only the relevant section.
3. For community work: Use "VolunteerList" and pass { "items": [ { "org": "...", "role": "...", "desc": "..." } ] }.
4. For location, where Sugato lives, or base of operations: Use "LocationMap" and pass {}.
5. If no UI is needed, use "None" with {}.

Experience Data: ${JSON.stringify(experience)}
Skills Data: ${JSON.stringify(skills)}
Volunteer Data: ${JSON.stringify(volunteer)}
`;

let cachedAi: GoogleGenAI | null = null;

function jsonError(message: string, status: number, extraHeaders?: HeadersInit) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

function getVertexClient(): GoogleGenAI {
  if (cachedAi) return cachedAi;

  const keyPath = path.join("/tmp", "gcp-key.json");

  if (!fs.existsSync(keyPath)) {
    const jsonStr = process.env.GCP_SERVICE_ACCOUNT_JSON;
    if (!jsonStr) {
      throw new Error("Missing GCP credentials");
    }
    fs.writeFileSync(keyPath, jsonStr, { mode: 0o600 });
  }

  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

  cachedAi = new GoogleGenAI({
    vertexai: true,
    project: process.env.GCP_PROJECT_ID,
    location: "global",
  });

  return cachedAi;
}

export async function GET() {
  return jsonError("Method not allowed", 405);
}

export async function POST(req: Request) {
  const headerStore = await headers();
  const clientIp = getClientIpFromHeaders(headerStore);
  const rateLimit = checkAgentRateLimit(clientIp);

  if (!rateLimit.success) {
    const retryAfterSec = Math.max(
      1,
      Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
    );

    return jsonError("Too many requests. Please try again later.", 429, {
      "Retry-After": String(retryAfterSec),
      "X-RateLimit-Limit": String(rateLimit.limit),
      "X-RateLimit-Remaining": "0",
      "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
    });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonError("Invalid content type", 415);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid request", 400);
  }

  const { prompt } = parsed.data;

  let ai: GoogleGenAI;
  try {
    ai = getVertexClient();
  } catch {
    console.error("Agent Error: missing or invalid GCP credentials");
    return jsonError("Service unavailable", 503);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await ai.models.generateContentStream({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        });

        for await (const chunk of response) {
          controller.enqueue(encoder.encode(chunk.text ?? ""));
        }
        controller.close();
      } catch (error) {
        console.error("Agent Error:", error);
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              message: "Sorry, I could not generate a response right now.",
              a2ui: { component: "None", props: {} },
            }),
          ),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-RateLimit-Limit": String(rateLimit.limit),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
    },
  });
}
