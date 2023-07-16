/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 145094811,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "c82e28a68a1e6527823c7266ebd7fa73",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
