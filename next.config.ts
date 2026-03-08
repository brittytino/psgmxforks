import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow serving external video/image URLs used in components
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "93w95scdts.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
