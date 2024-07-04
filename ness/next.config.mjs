/** @type {import('next').NextConfig} */
import withSvgr from "@newhighsco/next-plugin-svgr";

const nextConfig = {
  reactStrictMode: true,
};

const withPWA = require("next-pwa")({
  dest: "public", // 서비스 워커 파일이 저장될 위치
  disable: process.env.NODE_ENV === "development", // 개발 환경에서는 비활성화
});

export default withPWA(withSvgr(nextConfig));
