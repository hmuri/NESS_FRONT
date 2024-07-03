import FloatingNess from "@/components/common/FloatingNess";
import Nav from "@/components/common/Nav";
import { ReactNode, SetStateAction, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import { fetchRecommendMessage } from "../../module/apis/main";
import { getProfile } from "@/module/apis/mypage";
import {
  Icon_big_calm_ness,
  Icon_big_hard_ness,
  Icon_big_normal_ness,
  Icon_floating_ness,
  Icon_information,
  Icon_mic,
  Icon_normal,
} from "@/module/icons";
import Slider from "react-slick";
import useSpeechRecognition from "@/module/hooks/speechRecognition";
import Category from "../../../public/assets/category_des.png";
import { useRouter } from "next/router";
import StopIcon from "../../../public/assets/Stop button.png";
import { useChat } from "@/module/provider/ChatContext";

const cookies = new Cookies();
const token = cookies.get("accessToken") || "";

const Main = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newMessage, setNewMessage] = useState("");

  const { setMessage } = useChat();

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

  const NoIMG = "assets/no_image.png";
  const [data, setData] = useState<IMainData | undefined>(undefined);
  const [items, setItems] = useState<IActivity[] | undefined>(undefined);
  const [isModal, setIsModal] = useState<boolean>(true);
  const [selectedNess, setSelectedNess] = useState<string>("");
  const [scheduleList, setScheduleList] = useState<
    ScheduleItem[] | undefined
  >();
  const [isSTT, setIsSTT] = useState(false);
  const { isListening, stopListening, startListening } =
    useSpeechRecognition(setNewMessage);

  const router = useRouter();

  const imageUrls = [
    "https://ness-static-s3.s3.ap-northeast-2.amazonaws.com/background-1.png",
    "https://ness-static-s3.s3.ap-northeast-2.amazonaws.com/background-2.png",
    "https://ness-static-s3.s3.ap-northeast-2.amazonaws.com/background-3.png",
  ];

  const images = [
    "/assets/chatting_des.png",
    "/assets/recommend_des.png",
    "/assets/category_des.png",
    "/assets/persona_des.png",
    "/assets/email_des.png",
  ];

  const steps = [
    {
      title: "채팅하기",
      subtitle: "NESS와 채팅을 하며 간편하게 일정을 관리해보세요!",
    },
    {
      title: "추천 확인하기",
      subtitle:
        "일정별 추천, 활동 추천, 한줄 추천 등 다양한 일정 기반 추천이 있어요.",
    },
    {
      title: "카테고리 관리하기",
      subtitle:
        "캘린더의 상단 버튼을 눌러 일정의 카테고리를 수정하고 추가해요.",
    },
    {
      title: "페르소나 선택하기",
      subtitle: "선택한 페르소나에 따라 NESS의 관리 방식이 달라져요.",
    },
    {
      title: "이메일 리포트",
      subtitle: "매일 자정, 오늘의 일정을 분석한 이메일 리포트가 발송돼요.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchRecommendMessage();
      setData(result);
      setItems(result?.activityList);
      setScheduleList(result?.scheduleList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setSelectedNess(data.persona);
        setIsModal(data.onBoarding);
      }
    };

    fetchProfile();
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setIsSTT(true);
    }
  };
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
    index: number
  ) => {
    const nextIndex = index % imageUrls.length;
    event.currentTarget.src = imageUrls[nextIndex];
  };
  if (!scheduleList) return null;

  const renderedItems: ReactNode[] = scheduleList.reduce(
    (acc: ReactNode[], schedule: ScheduleItem, index: number) => {
      const date = new Date(schedule.start);
      const dateString = date.toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
      });

      const prevDate =
        index > 0
          ? new Date(scheduleList[index - 1].start).toLocaleDateString(
              "ko-KR",
              {
                month: "2-digit",
                day: "2-digit",
              }
            )
          : null;

      const dateDisplay =
        dateString !== prevDate ? (
          <div className="relative">
            <div
              key={date.toISOString()}
              className=" font-normal text-[#717171] text-[14px] ml-[10px] mt-4 z-8 "
            >
              {dateString}
            </div>
            {/* <div className="absolute bottom-2 border-t-[2px] border-[white] w-full z-1" /> */}
          </div>
        ) : null;

      const timeString = date.toLocaleString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const scheduleItem = (
        <div key={schedule.id} className="relative flex mt-2">
          <div className="ml-[10px] text-[#868686] text-[12px]">
            {timeString}
          </div>
          <div className="absolute left-[54px] top-1 w-[12px] h-[12px] rounded-full bg-[#7A64FF]"></div>
          <div className="pl-[40px]">
            <div className="flex gap-[5px]">
              <strong className="font-bold">{schedule.title}</strong>
              <div
                className="px-[5px] py-[3px] rounded-[5px] text-[10px]"
                style={{ backgroundColor: schedule.categoryColor }}
              >
                {schedule.category}
              </div>
            </div>
            <div className="text-[12px] text-[#868686] flex gap-[10px]">
              {schedule.details.location && (
                <div> 🧭{schedule.details.location}</div>
              )}
              {schedule.details.person && (
                <div> 👯{schedule.details.person}</div>
              )}
            </div>
            <div className="bg-white px-[10px] py-[5px] rounded-[16px] text-[12px] mt-[8px]">
              {schedule.nessComment}
            </div>
          </div>
        </div>
      );

      if (dateDisplay) acc.push(dateDisplay);
      acc.push(scheduleItem);

      return acc;
    },
    []
  );

  return (
    <>
      <div className="fixed top-0 px-[12px] left-0 w-full flex justify-between h-[76px] bg-[#F0ECFF] z-10">
        <div className="flex mt-[20px] items-center justify-center gap-[7px]">
          <Icon_floating_ness />
          <div className="text-[20px] font-bold">NESS</div>
        </div>
        <div className="flex mt-[20px] items-center justify-center">
          <Icon_information
            className="cursor-pointer"
            onClick={() => setIsModal(true)}
          />
        </div>
      </div>
      <div className="p-[20px] mb-[100px] mt-[110px] flex flex-col md:items-center">
        <div className="mt-[20px] flex justify-between items-center w-full md:max-w-[600px] mb-[45px]">
          <div className="flex h-100px md:items-center">
            <div className="text-[24px] font-medium whitespace-normal break-words">
              {data?.recommend}
            </div>
          </div>
          <div className="flex items-center">
            {selectedNess == "NESS" ? (
              <Icon_big_normal_ness />
            ) : selectedNess == "HARDNESS" ? (
              <Icon_big_hard_ness />
            ) : (
              <Icon_big_calm_ness />
            )}
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
              {activeIndex === 0 ? (
                <div className="absolute bottom-[75px] w-full flex justify-center flex-col items-center text-center text-white ">
                  <div
                    className="landing-grabox mb-[5px] py-[5px] px-[10px] rounded-[10px] inline cursor-pointer"
                    onClick={() => router.push("/onboarding/chat")}
                  >
                    채팅 사용법 확인하기
                  </div>
                  <div>
                    더 자세한 채팅 사용법을 준비했어요. <br />
                    NESS와 함께 알아볼까요?
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        <div className="rounded-[15px] px-[30px] py-[10px] bg-[#F2F0FF] w-full md:max-w-[600px] flex flex-col items-center">
          <div className="mb-[15px]">
            추가하고 싶은 일정을 네스에게 말해주세요!
          </div>
          <div className="flex items-center w-full">
            <input
              className="w-full bg-white h-[41px] px-[22px] py-[13px] mr-[8px] mb-[10px] rounded-[20px] border border-purple-600 shadow-md"
              type="text"
              value={newMessage}
              placeholder={isListening ? "듣는 중" : "채팅 입력하기"}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  e.nativeEvent.isComposing === false
                ) {
                  // shiftKey를 누르지 않은 상태에서 Enter를 눌렀을 경우
                  e.preventDefault(); // Form 전송을 방지합니다.
                  console.log("there" + e.currentTarget.value);
                  setMessage(e.currentTarget.value);
                  router.push("/chatting");
                }
              }}
            />
            <div className="right-[70px] cursor-pointer mb-[10px]">
              {isListening ? (
                <Image src={StopIcon} alt="" onClick={toggleListening} />
              ) : (
                <Icon_mic onClick={toggleListening} />
              )}
            </div>
          </div>
          {/* <button onClick={handleSendMessage} disabled={isLoading}></button> */}
          {/* <button onClick={} disabled={!newMessage.trim()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11.0001 0C11.2043 0.000109065 11.4045 0.0570724 11.5782 0.16451C11.7519 0.271948 11.8922 0.425618 11.9835 0.60831L21.8843 20.4086C21.977 20.5945 22.0152 20.8027 21.9945 21.0094C21.9738 21.216 21.895 21.4125 21.7673 21.5763C21.6396 21.74 21.4681 21.8643 21.2727 21.9346C21.0773 22.005 20.866 22.0186 20.6632 21.974L11.0001 19.8267L1.33804 21.974C1.13514 22.0189 0.923671 22.0055 0.728101 21.9352C0.532531 21.8649 0.360865 21.7407 0.232979 21.5769C0.105093 21.4131 0.0262184 21.2165 0.00548795 21.0097C-0.0152425 20.803 0.0230191 20.5945 0.115843 20.4086L10.0166 0.60831C10.1079 0.425618 10.2482 0.271948 10.4219 0.16451C10.5956 0.0570724 10.7958 0.000109065 11.0001 0ZM12.1002 17.8181L18.8833 19.3251L12.1002 5.75969V17.8181Z"
                fill={newMessage.trim() ? "#7A64FF" : "#777777"}
              />
            </svg>
          </button> */}
        </div>
        <div className="text-[20px] w-full font-[500] mb-[10px] mt-[40px] text-left  md:max-w-[600px]">
          앞으로의 일정을 확인해봐요!
        </div>
        <div className="rounded-[10px] bg-[#F2F0FF] w-full min-h-[160px] md:max-w-[600px]">
          <div className="m-[20px] relative">
            <div className="absolute left-[60px] top-1 bottom-0 w-[1px] bg-[#7A64FF]"></div>
            {renderedItems}
          </div>
        </div>
        <div className="text-[20px] font-[500] mt-[20px] mb-[10px] md:w-full md:max-w-[600px]">
          이런 활동은 어떠세요?
        </div>
        <div className="flex flex-col items-center justify-between gap-[8px] overflow-x-auto md:w-full md:max-w-[600px]">
          {items?.map((item, index) => (
            <div key={index} className="rounded-[10px] bg-[#F2F0FF] w-full">
              <div className="px-[17px] py-[15px]">
                <div className="text-[16px] font-[500] tracking-tighter text-center">
                  {item.activity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Nav />
      <FloatingNess message="환영해요!" />
    </>
  );
};

export default Main;
function setSelectedNess(persona: string) {
  throw new Error("Function not implemented.");
}
