import CalendarImg from "../../../public/assets/calendar.png";
import NessImg from "../../../public/assets/ness_nav.png";
import AccoutImg from "../../../public/assets/account.png";
import Image from "next/image";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="w-full fixed h-[90px] border-t border-gray-[#454545] bg-white bottom-0 left-0 z-15">
      <div className="p-[20px] flex justify-between mx-[64px] z-20">
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[28px] text-[13px] items-center "
          onClick={() => router.push("/calendar")}
        >
          <Image src={CalendarImg} alt={""} />
          일정
        </div>
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[28px] text-[13px] items-center"
          onClick={() => router.push("/main")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <circle cx="14" cy="14" r="14" fill="#454545" />
            <path
              d="M11.4074 19.0398C11.4074 19.0398 12.2474 19.5998 13.9274 19.5998C15.6074 19.5998 16.4474 19.0398 16.4474 19.0398"
              stroke="black"
              stroke-linecap="round"
            />
            <circle cx="17.9404" cy="18.1482" r="0.518519" fill="white" />
            <circle cx="20.1805" cy="18.1482" r="0.518519" fill="white" />
            <circle cx="19.0609" cy="19.2678" r="0.518519" fill="white" />
            <circle cx="6.74075" cy="18.1482" r="0.518519" fill="white" />
            <circle cx="8.9808" cy="18.1482" r="0.518519" fill="white" />
            <circle cx="7.86122" cy="19.2678" r="0.518519" fill="white" />
            <ellipse
              cx="18.3344"
              cy="13.9272"
              rx="2.59259"
              ry="2.52"
              fill="white"
            />
            <ellipse
              cx="18.335"
              cy="13.9271"
              rx="1.44033"
              ry="1.4"
              fill="black"
            />
            <ellipse
              cx="9.37412"
              cy="13.9272"
              rx="2.59259"
              ry="2.52"
              fill="white"
            />
            <ellipse
              cx="9.37353"
              cy="13.9271"
              rx="1.44033"
              ry="1.4"
              fill="black"
            />
            <path
              d="M6.22223 10.6504C6.22223 10.6504 7.62223 10.3704 9.02223 10.3704C10.4222 10.3704 11.8222 10.6504 11.8222 10.6504"
              stroke="black"
              stroke-linecap="round"
            />
            <path
              d="M15.7421 10.6504C15.7421 10.6504 17.1421 10.3704 18.5421 10.3704C19.9421 10.3704 21.3421 10.6504 21.3421 10.6504"
              stroke="black"
              stroke-linecap="round"
            />
          </svg>
          홈
        </div>
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[28px] text-[13px] items-center"
          onClick={() => router.push("/mypage")}
        >
          <Image src={AccoutImg} alt={""} />
          계정
        </div>
      </div>
    </nav>
  );
};

export default Nav;
