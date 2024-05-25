import CalendarImg from "../../../public/assets/calendar.png";
import NessImg from "../../../public/assets/ness_nav.png";
import AccoutImg from "../../../public/assets/account.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Icon_chat, Icon_home, Icon_report } from "@/module/icons";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="w-full fixed h-[90px] border-t border-gray-[#454545] bg-white bottom-0 left-0 z-15">
      <div className="p-[10px] flex justify-between mx-[44px] z-20">
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[40px] text-[13px] items-center "
          onClick={() => router.push("/calendar")}
        >
          <Image src={CalendarImg} alt={""} />
          일정
        </div>
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[40px] text-[13px] items-center"
          onClick={() => router.push("/chatting")}
        >
          <Icon_chat />
          채팅
        </div>
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[40px] text-[13px] items-center"
          onClick={() => router.push("/main")}
        >
          <Icon_home />홈
        </div>
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[40px] text-[13px] items-center"
          onClick={() => router.push("/report")}
        >
          <Icon_report />
          보고서
        </div>
        <div
          className="text-center h-[47px] flex flex-col justify-between w-[40px] text-[13px] items-center"
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
