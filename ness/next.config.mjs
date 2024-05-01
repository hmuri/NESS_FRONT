/** @type {import('next').NextConfig} */
import withSvgr from "@newhighsco/next-plugin-svgr";

const nextConfig = {
  reactStrictMode: true,
};

export default withSvgr(nextConfig);
