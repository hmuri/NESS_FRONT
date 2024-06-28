import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  getProfile,
  patchActivateEmail,
  testEmail,
} from "../../module/apis/mypage";
import Nav from "@/components/common/Nav";
import {
  Icon_camera,
  Icon_information,
  Icon_left_arrow,
  Icon_select_off,
  Icon_select_on,
  Icon_send_email,
} from "@/module/icons";
import Slider from "react-slick";

export default function Alarm() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [emailSelected, setEmailSelected] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

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

  const images = ["/assets/email_des.png"];

  const steps = [
    {
      title: "이메일 리포트",
      subtitle: "매일 자정, 오늘의 일정을 분석한 이메일 리포트가 발송돼요.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    beforeChange: (current: any, next: SetStateAction<number>) =>
      setActiveIndex(next),
    arrows: false, // 화살표 버튼 숨기기
    customPaging: function (i: number) {
      return (
        <div
          style={{
            width: i === activeIndex ? "12px" : "6px",
            height: "6px",
            borderRadius: "5px",
            backgroundColor: i === activeIndex ? "#272B55" : "#d1d5db",
          }}
        ></div>
      );
    },
    dotsClass: "slick-dots landing-dots", // 커스텀 dots CSS 클래스
  };

  return (
    <div className="p-[25px] mt-[30px] flex justify-center items-center">
      <div className="w-full md:w-[600px]">
        <div className="flex items-center justify-between">
          <Icon_left_arrow onClick={() => router.back()} />
          <div className="text-[20px] py-[11px]">이메일 알림</div>
          <Icon_information
            className="cursor-pointer"
            onClick={() => setIsModal(true)}
          />
        </div>
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
      {isModal && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div
            className="fixed top-[30px] right-[50px] text-[25px] text-white cursor-pointer"
            onClick={() => setIsModal(false)}
          >
            X
          </div>
          <div
            className="relative flex flex-col justify-center w-full h-[100vh] md:max-w-[600px] pb-[20px] overflow-auto "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center jusitfy-center mt-[30px] mb-[20px]">
              <div className="text-center w-full text-[27px] font-bold text-[#7A64FF]">
                {steps[activeIndex].title}
              </div>
              <div className="text-center text-[15px] text-white w-[210px]">
                {steps[activeIndex].subtitle}
              </div>
            </div>
            <Slider {...settings}>
              {images.map((img, index) => (
                <div
                  key={index}
                  className=" flex justify-center pb-0 w-full items-center"
                >
                  <img src={img} alt="" className="max-h-[65vh] mx-auto" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
      <Nav />
    </div>
  );
}
