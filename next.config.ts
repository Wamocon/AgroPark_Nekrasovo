import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/proposal.html",
      },
    ];
  },
};

export default nextConfig;
