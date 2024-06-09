import Image from "next/image";
import NESSImg from "../../../public/assets/ness_main_logo.png";
import BackImg from "../../../public/assets/landing1.png";
import Landing2 from "../../../public/assets/landing2.png";
import Landing3 from "../../../public/assets/landing3.png";
import Landing4 from "../../../public/assets/landing4.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Index = () => {
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = window.scrollY < 50; // 50px 아래로 스크롤되면 투명하게 처리
      setIsTop(isAtTop);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 클린업 함수
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className=" w-full">
      <div className="w-full md:w-[600px]">
        <div
          className={`fixed px-[23px] w-full top-0 ${
            isTop ? "bg-white" : "bg-[rgba(255,255,255,0.5)]"
          } h-[76px] flex items-center justify-between z-10 transition-all duration-300`}
        >
          <div className="flex items-center  gap-[10px] border-[1px] bg-white  border-[#D9D9D9] rounded-[12px] p-[10px]">
            <Image src={NESSImg} alt="" width={30} height={30} />
            <span className="font-bold text-[20px] ">NESS</span>
          </div>
          <div
            className="landing-grabox px-[15px] py-[10px] text-white rounded-[12px] text-[15px] font-bold"
            onClick={() => router.replace("/login")}
          >
            회원가입 및 로그인
          </div>
        </div>
        <Image className=" w-full mt-[76px]" alt="" src={BackImg} />
        <div className="h-[190px] relative flex justify-center">
          <div className="box-shadow text-[24px] text-center font-extrabold rounded-[20px]  p-[10px] absolute top-[-20px] bg-white">
            채팅으로 간편하게 <br /> 일정을 관리해보세요.
          </div>
          <div className="landing-grabox text-center px-[15px] py-[10px] text-white rounded-[12px] text-[12px] absolute bottom-[32px]">
            구글 로그인으로 간편하게
            <br /> 프로필 생성하고 모든 기능 사용해보기
          </div>
        </div>
        <div className="flex px-[18px] gap-[45px] flex-col w-full leading-tight">
          <div className="flex gap-[15px] justify-center w-full">
            <Image alt="" src={Landing2} width={200} height={153} />
            <div className="font-bold text-[17px] text-left">
              채팅만으로
              <br /> 일정을 간단히
              <br />
              추가할 수 있어요.
              <div className="mt-[15px] text-[12px] font-extralight">
                채팅 한 번만 입력하면
                <br /> 바로 캘린더에 추가 가능해요
              </div>
            </div>
          </div>
          <div className="flex gap-[15px] justify-center w-full">
            <div className="font-bold text-[17px] text-right">
              AI 비서가
              <br /> 일정을 요약하고
              <br /> 분석해줘요.
              <div className="mt-[15px] text-[12px] font-extralight">
                일일히 찾아볼 필요 없이,
                <br /> AI 비서가 알아서
                <br /> 관련있는 일정을 찾아
                <br />
                분석해줘요.
              </div>
            </div>
            <Image alt="" src={Landing3} width={200} height={153} />
          </div>
          <div className="flex gap-[15px] justify-center w-full">
            <Image alt="" src={Landing4} width={200} height={153} />
            <div className="font-bold text-[17px] text-left">
              맞춤형 관리를
              <br /> 받아보세요.
              <div className="mt-[15px] text-[12px] font-extralight leading-tight">
                일반적인 NESS,
                <br /> 열정적으로 삶을 관리하려면
                <br /> HARDNESS,
                <br /> 워라밸을 챙기고 싶다면
                <br />
                CALMNESS로 맞춤형 <br />
                관리를 받아보세요.
              </div>
            </div>
          </div>
        </div>
        <div className="h-[157px] bg-[#F2F0FF] p-[20px] mt-[40px] leading-relaxed">
          <div className="text-[16px] font-bold mb-[10px]">NESS</div>
          <a
            className="text-[#7A64FF] font-medium underline"
            href="https://midnight-roadrunner-22a.notion.site/6975b1228cda4e61ab8f78e8a28221f7"
          >
            개인정보 처리 방침
          </a>
          <br />
          <a
            className="text-[#7A64FF] font-medium underline"
            href="mailto:maxcse01@gmail.com"
          >
            이메일로 연락하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
