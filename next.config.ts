import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
