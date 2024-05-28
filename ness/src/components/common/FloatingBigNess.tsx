// components/FloatingNess.js
import Image from "next/image";
import NESS_MAIN_LOGO from "../../../public/assets/ness_main_logo.png";
import { useRouter } from "next/router";
import nessChatImg from "../../../public/assets/nessChatImg.png";

const FloatingBigNess = () => {
  const router = useRouter();
  return (
    <div className="z-150">
      <div className="floatingImage " onClick={() => router.push("/chatting")}>
        <svg
          width="100"
          height="99"
          viewBox="0 0 100 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="49.5"
            r="49.5"
            fill="url(#paint0_radial_3626_3850)"
          />
          <path
            d="M53.96 65.3401C53.96 65.3401 56.6 67.3201 61.88 67.3201C67.16 67.3201 69.8 65.3401 69.8 65.3401"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="75.5407" cy="61.8088" r="1.7446" fill="white" />
          <circle cx="83.0777" cy="61.8086" r="1.7446" fill="white" />
          <ellipse
            cx="79.3108"
            cy="65.5761"
            rx="1.7446"
            ry="1.7446"
            fill="white"
          />
          <ellipse
            cx="37.8585"
            cy="61.8088"
            rx="1.7446"
            ry="1.7446"
            fill="white"
          />
          <circle cx="45.3952" cy="61.8086" r="1.7446" fill="white" />
          <ellipse
            cx="41.6284"
            cy="65.5761"
            rx="1.7446"
            ry="1.7446"
            fill="white"
          />
          <ellipse
            cx="76.8663"
            cy="47.6081"
            rx="8.72299"
            ry="8.47875"
            fill="white"
          />
          <ellipse
            cx="74.6253"
            cy="47.6076"
            rx="4.84611"
            ry="4.71042"
            fill="black"
          />
          <ellipse
            cx="46.7186"
            cy="47.6081"
            rx="8.723"
            ry="8.47875"
            fill="white"
          />
          <ellipse
            cx="44.4735"
            cy="47.6076"
            rx="4.84611"
            ry="4.71042"
            fill="black"
          />
          <path
            d="M36.1139 36.582C36.1139 36.582 40.8243 35.6399 45.5347 35.6399C50.2451 35.6399 54.9556 36.582 54.9556 36.582"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M68.1442 36.582C68.1442 36.582 72.8546 35.6399 77.565 35.6399C82.2754 35.6399 86.9858 36.582 86.9858 36.582"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3626_3850"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(30.2 23.76) rotate(65.3441) scale(66.4481)"
            >
              <stop stop-color="#AEA1FF" />
              <stop offset="1" stop-color="#7A64FF" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default FloatingBigNess;
