import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getProfile } from "../apis/mypage";
import Nav from "@/components/common/Nav";
import { Icon_camera } from "@/module/icons";

export default function Edit() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [nickname, setNickname] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setProfile(data);
        setNickname(data.nickname);
        setPictureUrl(data.pictureUrl);
      }
    };

    fetchProfile();
  }, []);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictureUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Updated profile:", { nickname, pictureUrl });
  };

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <>
      <div className="p-[25px] mt-[30px]">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="text-[20px]">개인 정보 수정</div>
            <button
              type="submit"
              className="h-[30px] text-[14px] rounded-[5px] bg-[#7A64FF] px-[14px] text-white"
            >
              저장
            </button>
          </div>
          <div className="mt-[56px] flex w-full justify-center">
            <div className="relative w-[100px] h-[100px]">
              <img
                src={pictureUrl}
                alt="Profile"
                className="w-[86px] h-[86px] bg-[#F2F0FF] rounded-[50%]"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePictureChange}
                style={{ display: "none" }}
              />
              <button
                onClick={handleButtonClick}
                className="absolute w-[35px] h-[35px] rounded-[50%] bg-[#7A64FF] bottom-[5px] right-[10px] flex justify-center items-center"
              >
                <Icon_camera />
              </button>
            </div>
          </div>
          <div className="mt-[20px] py-[18px]">
            <div className="text-[16px] mb-[13px]">닉네임</div>
            <div className="w-full border border-gray-300 rounded-[5px] px-[10px] py-[5px]">
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                className="text-[14px] w-full overflow-wrap-break-word "
              />
            </div>
          </div>
        </form>
      </div>
      <Nav />
    </>
  );
}
