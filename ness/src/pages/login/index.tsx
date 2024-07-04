"use client";
import Image from "next/image";
import GoogleLogo from "../../../public/assets/google logo.png";
import FloatingBigNess from "@/components/common/FloatingBigNess";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "refused" }>;
}

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_LOGIN_URL}`;
  };
  const router = useRouter();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault(); // 기본 이벤트 차단
      e.prompt(); // 프롬프트를 표시
      e.userChoice.then((choiceResult: { outcome: "accepted" | "refused" }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      });
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as any
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as any
      );
    };
  }, []);

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
      <div
        className="mt-[15px] text-[14px] text-[#868686] cursor-pointer"
        onClick={() => router.replace("/landing")}
      >
        홈페이지로 돌아가기
      </div>
    </div>
  );
}
