import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/linni",
        destination: "https://www.youtube.com/watch?v=jtMHsNhQBvI",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
