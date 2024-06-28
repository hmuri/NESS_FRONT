import Nav from "../../components/common/Nav";
import {
  Icon_calmness,
  Icon_hardness,
  Icon_information,
  Icon_left_arrow,
  Icon_normal,
  Icon_radio,
  Icon_unselected_radio,
} from "@/module/icons";
import { SetStateAction, useEffect, useState } from "react";
import { getProfile, updatePersona } from "../../module/apis/mypage";
import { useRouter } from "next/router";
import Slider from "react-slick";

export default function Persona() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [selectedNess, setSelectedNess] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

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
  const images = ["/assets/persona_des.png"];

  const steps = [
    {
      title: "페르소나 선택하기",
      subtitle: "선택한 페르소나에 따라 NESS의 관리 방식이 달라져요.",
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
  const handlePersonaChange = async (persona: string) => {
    const response = await updatePersona(persona);
    if (response) {
      setSelectedNess(persona);
    } else {
      alert(
        "페르소나를 업데이트하는 데에 실패하였습니다. 문제가 계속될 경우, maxcse01@gmail.com 으로 연락 부탁드립니다."
      );
    }
  };
  return (
    <div className="p-[15px] mt-[30px] flex justify-center items-center">
      <div className="w-full md:w-[600px]">
        <div className="flex items-center justify-between">
          <Icon_left_arrow onClick={() => router.back()} />
          <div className="text-[20px] py-[11px]">페르소나 설정</div>
          <Icon_information
            className="cursor-pointer"
            onClick={() => setIsModal(true)}
          />
        </div>
        <div className="flex flex-col w-full">
          {[
            {
              key: "NESS",
              label: "기본 페르소나, NESS",
              description: "일반적인 일정 관리 비서입니다.",
              icon: <Icon_normal />,
            },
            {
              key: "HARDNESS",
              label: "하드 페르소나, HARD-NESS",
              description: "일정관리를 빡세게 도와주는 비서입니다.",
              icon: <Icon_hardness />,
            },
            {
              key: "CALMNESS",
              label: "이지 페르소나, CALM-NESS",
              description: "일정관리를 평온히 도와주는 비서입니다.",
              icon: <Icon_calmness />,
            },
          ].map((persona) => (
            <div
              className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]"
              key={persona.key}
            >
              <div className="flex gap-[15px] items-center">
                <div className="w-[50px] flex justify-center">
                  {persona.icon}
                </div>
                <div className="text-[16px] font-[500] flex flex-col items-start">
                  <div>{persona.label}</div>
                  <div className="text-[#454545]">{persona.description}</div>
                </div>
              </div>
              <div onClick={() => handlePersonaChange(persona.key)}>
                {selectedNess === persona.key ? (
                  <Icon_radio />
                ) : (
                  <Icon_unselected_radio />
                )}
              </div>
            </div>
          ))}
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
