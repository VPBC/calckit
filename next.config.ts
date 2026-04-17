import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/calckit" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/calckit/" : "",
};

export default nextConfig;
