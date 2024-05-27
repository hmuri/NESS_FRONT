import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  getProfile,
  patchActivateEmail,
  testEmail,
} from "../../module/apis/mypage";
import Nav from "@/components/common/Nav";
import {
  Icon_camera,
  Icon_select_off,
  Icon_select_on,
  Icon_send_email,
} from "@/module/icons";

export default function Alarm() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [emailSelected, setEmailSelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setProfile(data);
        setEmailSelected(data.isEmailActive);
      }
    };

    fetchProfile();
  }, []);

  const handleEmailSend = async () => {
    const response = await testEmail();
    if (response) {
      alert(
        `${profile?.id}로 테스트 이메일이 발송되었습니다. 1분 내에 확인이 가능합니다.`
      );
    } else {
      alert(
        "이메일 발송에 실패했습니다. 문제가 계속될 경우, maxcse01@gmail.com으로 연락 바랍니다."
      );
    }
  };
  const handleEmailActivate = async () => {
    const response = await patchActivateEmail(!emailSelected);
    if (response) {
      setEmailSelected(!emailSelected);
    } else {
      alert(
        "이메일 활성화에 실패했습니다. 문제가 계속될 경우, maxcse01@gmail.com으로 연락 바랍니다."
      );
    }
  };

  return (
    <div className="p-[25px] mt-[30px] flex justify-center items-center">
      <div className="md:w-[600px]">
        <div className="text-[20px] py-[11px]">개인 정보 수정</div>
        <div className="flex flex-col w-full">
          <div className="rounded-[10px] w-full flex flex-col items-center">
            <div className="w-full text-[16px] font-[500] flex my-[18px] justify-between items-center">
              <div>
                이메일 테스트 <br />
                <span className="text-[#454545]">
                  어떤 이메일이 오는지 테스트해보세요!
                </span>
              </div>
              <button
                onClick={handleEmailSend}
                className="w-[35px] h-[35px] rounded-[50%] bg-[#7A64FF] flex justify-center items-center"
              >
                <Icon_send_email />
              </button>
            </div>
            <div className="w-full text-[16px] font-[500] flex my-[18px] justify-between items-center">
              <div>
                End of Today with NESS <br />
                <span className="text-[#454545]">
                  내일 할 일 알림 이메일을 자정에 발송합니다.
                </span>
              </div>
              <button
                onClick={handleEmailActivate}
                className="flex justify-center items-center"
              >
                {emailSelected ? <Icon_select_on /> : <Icon_select_off />}
              </button>
            </div>
            <div className="w-full text-[16px] font-[500] text-center flex flex-col items-start my-[18px]">
              <div>기타 기능</div>
              <div className="text-[#454545]">기타 기능입니다.</div>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}
