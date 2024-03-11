/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    imageSizes: [600, 960, 1024, 1920],
    deviceSizes: [1200, 1920, 2048, 3840],
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "via.placeholder.com",
      //   pathname: "**",
      // },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
