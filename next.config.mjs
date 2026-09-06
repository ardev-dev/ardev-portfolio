/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // الصور في public/apps مُصغَّرة ومحوَّلة إلى WebP مسبقاً بمقاس العرض الفعلي،
    // فلا حاجة لمحسِّن Vercel — ولا لحصّته التي نفدت وأسقطت أي صورة جديدة بـ402.
    unoptimized: true,
  },
};

export default nextConfig;
