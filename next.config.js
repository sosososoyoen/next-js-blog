/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    ppr: true,
  },
};

module.exports = nextConfig;
