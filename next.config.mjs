import "dotenv/config";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    WP_URL: process.env.WP_URL
  },
  distDir: "dist",
  output: "export"
};

export default nextConfig;
