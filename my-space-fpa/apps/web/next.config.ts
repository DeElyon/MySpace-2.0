import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@msf/ui', '@msf/config'],
  images: {
    domains: ['ui-avatars.com'],
  },
};

export default nextConfig;
