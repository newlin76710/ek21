/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.ek21.com' },
      { protocol: 'https', hostname: 'ek21.com' },
      { protocol: 'https', hostname: 'eros.ek21.com' },
    ],
  },
};

export default nextConfig;
