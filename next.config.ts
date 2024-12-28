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
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'http',
        hostname: '18.212.112.11'
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
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*'
      }
    ]
  }
};

export default nextConfig;
