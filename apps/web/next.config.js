/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/types"],
  images: {
    domains: ["plus.unsplash.com"],
  },
};

module.exports = nextConfig;
