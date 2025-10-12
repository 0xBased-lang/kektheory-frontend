import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'explorer.bf1337.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kektech.xyz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.kektech.xyz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.ipfs.nftstorage.link',
      },
      {
        protocol: 'https',
        hostname: '**.ipfs.w3s.link',
      },
    ],
    unoptimized: false,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
