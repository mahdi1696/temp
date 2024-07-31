/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["dash.isandogh.com"],
    },
  },
};

export default nextConfig;
