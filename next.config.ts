import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/linni",
        destination: "https://nrk.no",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
