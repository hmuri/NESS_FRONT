import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Nav from "../../components/common/Nav";
import { useRouter } from "next/router";
import {
  Icon_bell,
  Icon_person,
  Icon_persona_ness,
  Icon_right_arrow,
  Icon_spoit,
} from "@/module/icons";
import urls from "@/module/urls";
import axiosInstance from "@/module/axiosInstance";
import { getProfile } from "../apis/mypage";

export default function Alarm() {
  const profile = getProfile();
  const router = useRouter();
  return (
    <>
      <div className="p-[25px]">
        <div className="mt-[76px] flex flex-col w-full items-center">
          <div>
            <img
              src={profile.pictureUrl}
              alt="Profile"
              className="w-[86px] h-[86px] bg-[#F2F0FF] rounded-[50%]"
            />
          </div>
          <div className="flex items-center pt-[36px]">
            <div className="text-[24px] font-medium w-[200px] text-center overflow-wrap-break-word mb-[20px]">
              {profile.nickname}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div
              className="flex gap-[15px] items-center"
              onClick={() => router.push(urls.mypage.edit)}
            >
              <Icon_person />
              <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                <div>개인 정보 수정</div>
                <div className="text-[#454545]">
                  프로필 사진 및 닉네임을 수정합니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div
              className="flex gap-[15px] items-center "
              onClick={() => router.push(urls.mypage.alarm)}
            >
              <Icon_bell />
              <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                <div>알림</div>
                <div className="text-[#454545]">
                  이메일 알림 등을 설정합니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div
              className="flex gap-[15px] items-center "
              onClick={() => router.push(urls.mypage.edit)}
            >
              <Icon_persona_ness />
              <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                <div>페르소나</div>
                <div className="text-[#454545]">
                  일정 관리 비서의 페르소나를 결정합니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div className="flex gap-[15px] items-center">
              <Icon_spoit />
              <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                <div>기타 버튼</div>
                <div className="text-[#454545]">기타 버튼입니다.</div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
