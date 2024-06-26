/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
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
