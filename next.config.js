/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add external domains if loading images from a CDN or remote server
    formats: ['image/webp'], // Serve optimized WebP format
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },
};

module.exports = nextConfig;
