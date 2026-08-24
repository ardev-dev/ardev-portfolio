/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // نتجاهل فحص ESLint أثناء البناء لأن النشر عبر `vercel build` — نفس نهج maskani_web.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
