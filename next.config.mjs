/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.extensions.push('.jsx');
    return config;
  },
};

export default nextConfig;