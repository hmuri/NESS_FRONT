// components/FloatingNess.js
import Image from "next/image";
import NESS_MAIN_LOGO from "../../assets/ness_main_logo.png";
import { useRouter } from "next/router";
import nessChatImg from "../../assets/nessChatImg.png";

interface FloatingNessProps {
  message?: string;
}

const FloatingNess = ({ message }: FloatingNessProps) => {
  const router = useRouter();
  return (
    <div className="z-150">
      <div
        className="floatingImage fixed bottom-[80px] w-h-[50px] right-[20px] "
        onClick={() => router.push("/chatting")}
      >
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_3186_676)">
            <circle
              cx="27"
              cy="25"
              r="25"
              fill="url(#paint0_radial_3186_676)"
            />
            <path
              d="M29 33C29 33 30.3333 34 33 34C35.6667 34 37 33 37 33"
              stroke="black"
              stroke-linecap="round"
            />
            <circle cx="39.8993" cy="31.2166" r="0.881111" fill="white" />
            <circle cx="43.7059" cy="31.2163" r="0.881111" fill="white" />
            <circle cx="41.8034" cy="33.1191" r="0.881111" fill="white" />
            <circle cx="20.8679" cy="31.2166" r="0.881111" fill="white" />
            <circle cx="24.6744" cy="31.2163" r="0.881111" fill="white" />
            <circle cx="22.7719" cy="33.1191" r="0.881111" fill="white" />
            <ellipse
              cx="40.5688"
              cy="24.0446"
              rx="4.40555"
              ry="4.2822"
              fill="white"
            />
            <ellipse
              cx="39.437"
              cy="24.0445"
              rx="2.44753"
              ry="2.379"
              fill="black"
            />
            <ellipse
              cx="25.3428"
              cy="24.0446"
              rx="4.40555"
              ry="4.2822"
              fill="white"
            />
            <ellipse
              cx="24.2089"
              cy="24.0445"
              rx="2.44753"
              ry="2.379"
              fill="black"
            />
            <path
              d="M19.9868 18.4758C19.9868 18.4758 22.3658 18 24.7448 18C27.1238 18 29.5028 18.4758 29.5028 18.4758"
              stroke="black"
              stroke-linecap="round"
            />
            <path
              d="M36.1637 18.4758C36.1637 18.4758 38.5427 18 40.9217 18C43.3007 18 45.6797 18.4758 45.6797 18.4758"
              stroke="black"
              stroke-linecap="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_3186_676"
              x="0"
              y="0"
              width="58"
              height="58"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="2" dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_3186_676"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_3186_676"
                result="shape"
              />
            </filter>
            <radialGradient
              id="paint0_radial_3186_676"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(17 12) rotate(65.3441) scale(33.5596)"
            >
              <stop stop-color="#AEA1FF" />
              <stop offset="1" stop-color="#7A64FF" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {message && (
        <div
          className={
            "chatting-img fixed text-[13px] bottom-[93px] right-[100px] max-w-[70%] px-[12px] py-[10px] rounded-[16px] bg-[#ECECEC] text-black shadow-lg"
          }
        >
          <p>{message}</p>
        </div>
      )}
      <Image
        src={nessChatImg}
        className="chatting-img fixed bottom-[100px] right-[90px]"
        alt=""
      />
    </div>
  );
};

export default FloatingNess;
