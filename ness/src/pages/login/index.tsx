"use client";
import Image from "next/image";
import GoogleLogo from "../../assets/google logo.png";
import NessLogo from "../../assets/nessLogo.png";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=470083887407-fur6m1hbh8ds0k75msk96tnd1f2mbdi7.apps.googleusercontent.com&redirect_uri=${process.env.NEXT_PUBLIC_REACT_APP_WEB_BASE_URL}/login/oauth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+profile`;
  };

  return (
    <div className="h-[100vh] mx-auto flex justify-center flex-col">
      <div>
        <Image
          src={NessLogo}
          alt=""
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
      <div className="text-center text-[20px] mt-[20px]">
        내 손 안의 비서, NESS
      </div>
      <div
        className=" mx-[20px] h-[44px] rounded-[4px] flex border border-gray-300 mt-[200px]"
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
