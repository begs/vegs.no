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
      {
        source: "/pkmn",
        destination: "https://gist.github.com/begs/91117b6d6eaf14eedd994bfa2b55af86",
        permanent: false,
      },
    ];
  }
};

export default nextConfig;
