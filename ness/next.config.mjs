/** @type {import('next').NextConfig} */
import withSvgr from "@newhighsco/next-plugin-svgr";
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: "public", // 서비스 워커 파일이 저장될 위치
  disable: process.env.NODE_ENV === "development", // 개발 환경에서는 비활성화
});
export default withSvgr(pwaConfig(nextConfig));
