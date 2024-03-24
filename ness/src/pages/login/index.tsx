"use client";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?client_id=470083887407-fur6m1hbh8ds0k75msk96tnd1f2mbdi7.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login/oauth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+profile";
  };

  return (
    <div className="my-auto mx-auto">
      <div>
        <div className="w-[150px] h-[150px] bg-gray-500 mt-[50%] mx-auto"></div>
      </div>
      <div className="text-center text-[20px] mt-[20px]">
        내 손 안의 비서, NESS
      </div>
      <div
        className=" mx-[20px] h-[44px] rounded-[4px] flex border border-gray-300 mt-[200px]"
        onClick={handleGoogleLogin}
      >
        <div className="w-[51px] h-full flex border-r"></div>
        <div className="flex w-full justify-center items-center">
          구글 아이디로 회원가입
        </div>
      </div>
    </div>
  );
}
