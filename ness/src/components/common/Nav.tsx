import CalendarImg from "../../assets/calendar.png";
import NessImg from "../../assets/ness_nav.png";
import AccoutImg from "../../assets/account.png";
import Image from "next/image";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="w-full fixed h-[90px] border-t border-gray-[#454545] bg-white bottom-0 left-0">
      <div className="p-[20px] flex justify-between mx-[64px] ">
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
          <Image src={NessImg} alt={""} />홈
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
