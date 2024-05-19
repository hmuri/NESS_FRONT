import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Nav from "../../components/common/Nav";
import { useRouter } from "next/router";
import {
  Icon_bell,
  Icon_calmness,
  Icon_hardness,
  Icon_normal,
  Icon_person,
  Icon_persona_ness,
  Icon_right_arrow,
  Icon_spoit,
} from "@/module/icons";
import urls from "@/module/urls";
import { useEffect, useState } from "react";
import { getProfile } from "../apis/mypage";

export default function Persona() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [selectedNess, setSelectedNess] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setProfile(data);
        setSelectedNess(data.persona);
      }
    };

    fetchProfile();
  }, []);
  return (
    <>
      <div className="p-[15px] mt-[30px]">
        <div className="text-[20px] py-[11px] ml-[10px]">페르소나 설정</div>
        <div className="flex flex-col w-full">
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div className="flex gap-[15px] items-center">
              <div className="w-[50px] flex justify-center">
                <Icon_normal />
              </div>
              <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                <div>
                  기본 페르소나,{" "}
                  <span className="text-[#7A64FF] font-bold">NESS</span>
                </div>
                <div className="text-[#454545]">
                  일반적인 일정 관리 비서입니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div className="flex gap-[15px] items-center ">
              <div className="w-[50px] flex justify-center">
                <Icon_hardness />
              </div>
              <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                <div>
                  하드 페르소나, HARD-
                  <span className="text-[#FF6464] font-bold">NESS</span>
                </div>
                <div className="text-[#454545]">
                  일정관리를 빡게게 도와주는 비서입니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div className="flex gap-[15px] items-center">
              <div className="w-[50px] flex justify-center">
                <Icon_calmness />
              </div>
              <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                <div>
                  이지 페르소나, CALM-
                  <span className="text-[#759CFF] font-bold">NESS</span>
                </div>
                <div className="text-[#454545]">
                  일정관리를 평온히 도와주는 비서입니다.
                </div>
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
