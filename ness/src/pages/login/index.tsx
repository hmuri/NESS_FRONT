"use client";
import Image from "next/image";
import GoogleLogo from "../../../public/assets/google logo.png";
import FloatingBigNess from "@/components/common/FloatingBigNess";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_LOGIN_URL}`;
  };

  return (
    <div className="h-[100vh] mx-auto flex justify-center items-center flex-col px-[20px] md:px-0">
      <div className="flex justify-center mb-[20px]">
        <FloatingBigNess />
      </div>
      <div className="text-center text-[20px] mt-[20px]">
        내 손 안의 비서, NESS
      </div>
      <div
        className=" h-[44px] rounded-[4px] flex border border-gray-300 mt-[200px] w-full md:w-[600px]"
        onClick={handleGoogleLogin}
      >
        <div className="w-[51px] h-full py-[8px] flex border-r justify-center">
          <Image src={GoogleLogo} alt="" width={27} height={27} />
        </div>
        <div className="flex w-full justify-center items-center">
          구글 아이디로 회원가입
        </div>
      </div>
    </div>
  );
}
