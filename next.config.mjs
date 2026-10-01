/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // 輸出 /chatroom/index.html 形式，對應舊站的 /chatroom/、/rent/、/about/ 網址
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
