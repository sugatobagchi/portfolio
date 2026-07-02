/** @type {import('next').NextConfig} */

const base_url = process.env.NEXT_PUBLIC_MEET_URL;
const resume_url = process.env.NEXT_PUBLIC_RESUME_URL;

const nextConfig = {
  images: {
    localPatterns: [
      { pathname: "/me.png" },
      { pathname: "/images/**" },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280],
    imageSizes: [128, 192, 256, 384],
  },
  redirects: async () => {
    const redirectsArray = [];

    for (let i = 1; i <= 9; i++) {
      redirectsArray.push({
        source: `/meet${i}`,
        destination: `${base_url}?authuser=${i}`,
        permanent: true,
      });
    }

    redirectsArray.push({
      source: "/meet",
      destination: `${base_url}`,
      permanent: true,
    });

    redirectsArray.push({
      source: "/meet:authuser(\\d+)",
      destination: `${base_url}`,
      permanent: true,
    });

    redirectsArray.push({
      source: "/resume",
      destination: `${resume_url}`,
      permanent: true,
    });

    return redirectsArray;
  },
};

export default nextConfig;
