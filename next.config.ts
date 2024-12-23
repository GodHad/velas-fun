import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'violet-able-landfowl-471.mypinata.cloud',
      },
      {
        hostname: 'localhost'
      },
      {
        hostname: 'ipfs.fleek.co'
      },
      {
        hostname: 'img.freepik.com'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:5000/:path*'
      }
    ]
  }
};

export default nextConfig;
