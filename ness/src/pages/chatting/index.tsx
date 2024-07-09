import {
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import moment from "moment";
import "moment/locale/ko";
import Image from "next/image";
import { IChatMessage, ISendMessage } from "../../module/interface/chatting";
import LeftChatImg from "../../../public/assets/leftChat.png";
import RightChatImg from "../../../public/assets/rightChat.png";
import { useRouter } from "next/router";
import { useSendMessage } from "@/module/hooks/sendMessages";
import useFetchChatMessages from "@/module/hooks/getMessages";
import { LoadingLottie } from "@/module/LottieComponents";
import {
  Icon_calmness,
  Icon_correct,
  Icon_hardness,
  Icon_information,
  Icon_mic,
  Icon_normal,
  Icon_trash_bin,
  Icon_wrong,
} from "@/module/icons";
import Cookies from "universal-cookie";
import axios from "axios";
import VoiceIcon from "../../../public/assets/Voice.png";
import StopIcon from "../../../public/assets/Stop button.png";
import useSpeechRecognition from "@/module/hooks/speechRecognition";
import { getProfile } from "@/module/apis/mypage";
import { useChat } from "@/module/provider/ChatContext";
import Slider from "react-slick";
import axiosInstance from "@/module/axiosInstance";

interface EventData {
  id?: number;
  start_time: string;
  end_time?: string;
  category: {
    id: number;
    name: string;
    color: string;
  };
  location?: string;
  people?: string;
  info: string;
}

interface Message {
  case: number;
  text: string;
  chatType: "USER" | "STT" | "AI";
}

interface DetailList {
  id: number;
  location?: string | null;
  person?: string | null;
}

const Chatting = () => {
  const { data: initialChatMessages } = useFetchChatMessages();
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isLoading } = useSendMessage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedNess, setSelectedNess] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSTT, setIsSTT] = useState(false);
  const [isSubmitted, setIsSubmmited] = useState(false);
  const { isListening, stopListening, startListening } =
    useSpeechRecognition(setNewMessage);
  const [newSchedule, setNewSchedule] = useState({
    id: 0,
    title: "",
    start: moment().toDate(),
    end: moment().toDate(),
    categoryNum: 0,
    location: "",
    people: "",
  });

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setIsSTT(true);
    }
  };

  const images = ["/assets/chatting_des.png"];

  const steps = [
    {
      title: "채팅하기",
      subtitle: "NESS와 채팅을 하며 간편하게 일정을 관리해보세요!",
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

  const cookies = new Cookies();
  const router = useRouter();

  const { message, setMessage } = useChat();

  const sendMainMessage = useCallback((newMessage: string) => {
    console.log("here44" + newMessage);
    if (newMessage) {
      handleSendMessageFromMain(newMessage);
      setMessage(""); // 상태를 바로 초기화
    }
  }, []);

  useEffect(() => {
    sendMainMessage(message);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (initialChatMessages) {
      setChatMessages(initialChatMessages);
    }
  }, [initialChatMessages]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setSelectedNess(data.persona);
      }
    };

    fetchProfile();
  }, []);

  interface IHandleScheduleAdd {
    data: EventData;
    isAdded: boolean;
    isSubmitted: boolean;
  }

  const handleScheduleAdd = async ({
    data,
    isAdded,
    isSubmitted,
  }: IHandleScheduleAdd) => {
    if (isSubmitted) return;
    setIsSelected(true);
    const scheduleData = {
      id: data.id,
      title: data.info,
      start: new Date(data.start_time),
      end: data.end_time
        ? new Date(data.end_time)
        : new Date(new Date(data.start_time).getTime() + 3600000),
      categoryNum: data.category.id,
      location: data.location || "",
      people: data.people || "",
    };

    try {
      const response = await axiosInstance.post(
        `/schedule/ai?isAccepted=${isAdded}&chatId=${scheduleData.id}`,
        scheduleData
      );

      setChatMessages(response.data.chatList);
      setIsSelected(false);
      setIsSubmmited(true);
    } catch (error) {
      console.error("Failed to update schedule:", error);
      setIsSelected(false);
    }
  };

  interface IHandleScheduleDelete {
    data: EventData;
    isAdded: boolean;
  }

  const handleScheduleDelete = async ({
    data,
    isAdded,
  }: IHandleScheduleDelete) => {
    setIsSelected(true);
    const scheduleData = {
      id: data.id,
      title: data.info,
      start: new Date(data.start_time),
      end: data.end_time
        ? new Date(data.end_time)
        : new Date(new Date(data.start_time).getTime() + 3600000),
      categoryNum: data.category.id,
      location: data.location || "",
      people: data.people || "",
    };

    try {
      const response = await axiosInstance.post(
        `/schedule/ai?isAccepted=${isAdded}&chatId=${scheduleData.id}`,
        scheduleData
      );

      setChatMessages(response.data.chatList);
      setIsSelected(false);
    } catch (error) {
      console.error("Failed to update schedule:", error);
      setIsSelected(false);
    }
  };

  const handleSendMessage = (message: any) => {
    if (!message.trim()) return;
    console.log("text22");
    const optimisticMessage: IChatMessage = {
      case: 0,
      chatType: isSTT ? "STT" : "USER",
      text: message,
      id: Date.now(),
      createdDate: new Date().toString(),
      metadata: null,
    };

    // 낙관적 UI 업데이트
    setChatMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    setNewMessage("");

    // 메시지 전송, onSuccess로 전체 리스트 업데이트
    sendMessage(
      { newMessage, isSTT },
      {
        onSuccess: (chatList) => {
          setChatMessages(chatList);
          setIsSTT(false);
        },
        onError: (error) => {
          console.error("Failed to send message: ", error);
          const errorMessage: IChatMessage = {
            case: 0,
            chatType: "AI",
            text: "예상치 못한 에러가 발생했습니다. 문제가 지속될 경우 maxcse01@gmail.com으로 연락 주세요.",
            id: Date.now(),
            createdDate: new Date().toString(),
            metadata: null,
          };
          setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
        },
      }
    );
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      // shiftKey를 누르지 않은 상태에서 Enter를 눌렀을 경우
      e.preventDefault(); // Form 전송을 방지합니다.
      handleSendMessage(newMessage); // 메시지 전송 함수 호출
      setNewMessage("");
    }
  };

  const handleSendMessageFromMain = (text: string) => {
    console.log("text" + text);
    console.log("here44");
    const newOptimisticMessage: IChatMessage = {
      case: 0,
      chatType: "USER",
      text: text,
      id: Date.now(),
      createdDate: new Date().toString(),
      metadata: null,
    };
    console.log("firsthere" + JSON.stringify(newOptimisticMessage));
    // 낙관적 UI 업데이트
    setChatMessages((prevMessages) => [...prevMessages, newOptimisticMessage]);
    console.log("here" + JSON.stringify(chatMessages));

    // 메시지 전송, onSuccess로 전체 리스트 업데이트
    sendMessage(
      {
        newMessage: text,
        isSTT: isSTT,
      },
      {
        onSuccess: (chatList) => {
          setChatMessages(chatList);
        },
        onError: (error) => {
          console.error("Failed to send message: ", error);
          const errorMessage: IChatMessage = {
            case: 0,
            chatType: "AI",
            text: "예상치 못한 에러가 발생했습니다. 문제가 지속될 경우 maxcse01@gmail.com으로 연락 주세요.",
            id: Date.now(),
            createdDate: new Date().toString(),
            metadata: null,
          };
          setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="relative mt-[94px] flex-1 bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px] pb-[50px]">
          {chatMessages.map((message, index) => {
            if (message.case === 2) {
              if (message.metadata == null) return;
              let jsonData = message.metadata?.trim();

              const jsonStart = jsonData.indexOf("[");
              const jsonEnd = jsonData.lastIndexOf("]") + 1;
              if (jsonStart >= 0 && jsonEnd > jsonStart) {
                jsonData = jsonData.substring(jsonStart, jsonEnd);
              }

              try {
                const dataEntries = JSON.parse(jsonData);
                return (
                  <div
                    key={index}
                    className="flex flex-col max-w-[70%] mb-[14px]"
                  >
                    <div className="relative mb-[5px]">
                      <div
                        className={`${
                          message.chatType === "USER" ||
                          message.chatType === "STT"
                            ? "bg-[#7A64FF] text-white"
                            : "bg-white text-black"
                        } px-[12px] py-[10px] rounded-[16px]`}
                      >
                        <p>{message.text}</p>
                      </div>
                    </div>
                    {dataEntries.map((data: EventData, dataIndex: number) => {
                      const formattedDate = moment(data.start_time)
                        .locale("ko")
                        .format("MMMM Do dddd");
                      return (
                        <div
                          key={`${index}-${dataIndex}`}
                          className="flex flex-col relative mb-[5px]"
                        >
                          <div className="p-[12px] mt-[4px] rounded-[16px] inline bg-white text-[#333]">
                            <div className="text-[15px] font-semibold mb-[11px]">
                              {formattedDate}
                            </div>
                            <div className="flex gap-[11px] flex-row text-[15px]">
                              <div
                                className="rounded-[8px] h-[38px] px-[7px] text-[12px] flex items-center inline font-semibold text-center text-white"
                                style={{ backgroundColor: data.category.color }}
                              >
                                {data.category.name}
                              </div>
                              <div>
                                <div>{data.info}</div>
                                <div>
                                  {data.location && (
                                    <div>🧭 {data.location}</div>
                                  )}
                                </div>
                                <div>
                                  {data.people && <div>👯 {data.people}</div>}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-[10px] py-[5px] rounded-[10px] h-[30px] w-[65px] bg-white flex items-center mt-[5px] justify-between">
                            <Icon_correct
                              onClick={() =>
                                handleScheduleAdd({
                                  data: { ...data, id: message.id },
                                  isAdded: true,
                                  isSubmitted: isSubmitted,
                                })
                              }
                              className="cursor-pointer"
                            />
                            <Icon_wrong
                              onClick={() =>
                                handleScheduleAdd({
                                  data: { ...data, id: message.id },
                                  isAdded: false,
                                  isSubmitted: isSubmitted,
                                })
                              }
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              } catch (error) {
                console.error("Error parsing JSON data: ", error);
                return (
                  <div
                    className="relative mb-[5px] flex max-w-[70%]"
                    key={index}
                  >
                    <div
                      className={`${
                        message.chatType === "USER" ||
                        message.chatType === "STT"
                          ? "bg-[#7A64FF] text-white"
                          : "bg-white text-black"
                      } px-[12px] py-[10px] rounded-[16px]`}
                    >
                      <p>오류가 발생했습니다. 다시 입력해주세요.</p>
                    </div>
                  </div>
                );
              }
            } else if (message.case === 4) {
              if (message.metadata == null) return;
              let jsonData = message.metadata?.trim();

              const jsonStart = jsonData.indexOf("[");
              const jsonEnd = jsonData.lastIndexOf("]") + 1;
              if (jsonStart >= 0 && jsonEnd > jsonStart) {
                jsonData = jsonData.substring(jsonStart, jsonEnd);
              }

              try {
                const dataEntries = JSON.parse(jsonData);
                console.log("here77" + JSON.stringify(dataEntries));
                return (
                  <div
                    key={index}
                    className="flex flex-col max-w-[70%] mb-[14px]"
                  >
                    <div className="relative mb-[5px]">
                      <div
                        className={`${
                          message.chatType === "USER" ||
                          message.chatType === "STT"
                            ? "bg-[#7A64FF] text-white"
                            : "bg-white text-black"
                        } px-[12px] py-[10px] rounded-[16px]`}
                      >
                        <p>{message.text}</p>
                      </div>
                    </div>
                    {dataEntries.map((data: EventData, dataIndex: number) => {
                      const formattedDate = moment(data.start_time)
                        .locale("ko")
                        .format("MMMM Do dddd");
                      return (
                        <div
                          key={`${index}-${dataIndex}`}
                          className="flex flex-col relative mb-[5px]"
                        >
                          <div className="flex items-end gap-[5px]">
                            <div className="w-full p-[12px] mt-[4px] rounded-[16px] inline bg-white text-[#333]">
                              <div className="text-[15px] font-semibold mb-[11px]">
                                {formattedDate}
                              </div>
                              <div className="flex gap-[11px] flex-row text-[15px]">
                                <div
                                  className="rounded-[8px] h-[38px] px-[7px] text-[12px] flex items-center inline font-semibold text-center text-white"
                                  style={{
                                    backgroundColor: data.category.color,
                                  }}
                                >
                                  {data.category.name}
                                </div>
                                <div>
                                  <div>{data.info}</div>
                                  <div>
                                    {data.location && (
                                      <div>🧭 {data.location}</div>
                                    )}
                                  </div>
                                  <div>
                                    {data.people && <div>👯 {data.people}</div>}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex bg-white p-[5px] h-[26px] rounded-[10px]">
                              <Icon_trash_bin
                                onClick={() =>
                                  handleScheduleDelete({
                                    data: { ...data, id: message.id },
                                    isAdded: true,
                                  })
                                }
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="py-[5px] rounded-[10px] h-[30px] w-[75px] text-[15px] inline bg-white text-[#E8505B] flex items-center justify-center mt-[5px]">
                      모두 삭제
                    </div>
                  </div>
                );
              } catch (error) {
                console.error("Error parsing JSON data: ", error);
                return (
                  <div
                    className="relative mb-[5px] flex max-w-[70%]"
                    key={index}
                  >
                    <div
                      className={`${
                        message.chatType === "USER" ||
                        message.chatType === "STT"
                          ? "bg-[#7A64FF] text-white"
                          : "bg-white text-black"
                      } px-[12px] py-[10px] rounded-[16px]`}
                    >
                      <p>오류가 발생했습니다. 다시 입력해주세요.</p>
                    </div>
                  </div>
                );
              }
            } else {
              return (
                <div
                  key={index}
                  className={`flex relative mb-[14px] ${
                    message.chatType === "USER" || message.chatType === "STT"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.chatType === "USER" || message.chatType === "STT"
                        ? "bg-[#7A64FF] text-white"
                        : "bg-white text-black"
                    } max-w-[70%] px-[12px] py-[10px] rounded-[16px]`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              );
            }
          })}

          {isLoading && <LoadingLottie />}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bg-[#F2F0FF] h-[66px] bottom-0 left-[20px] right-[20px] flex items-center">
          <input
            className="w-full bg-white h-[41px] px-[22px] py-[13px] mr-[8px] rounded-[20px] border border-purple-600 shadow-md"
            type="text"
            value={newMessage}
            placeholder={isListening ? "듣는 중" : "채팅 입력하기"}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              handleEnter(e);
            }}
          />
          <div className="fixed right-[70px] cursor-pointer">
            {isListening ? (
              <Image src={StopIcon} alt="" onClick={toggleListening} />
            ) : (
              <Icon_mic onClick={toggleListening} />
            )}
          </div>
          <button
            onClick={() => handleSendMessage(newMessage)}
            disabled={isLoading}
          ></button>
          <button
            onClick={() => handleSendMessage(newMessage)}
            disabled={!newMessage.trim()}
          >
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
          </button>
        </div>
      </div>
      <div className="z-100 border-b border-gray-200 bg-white w-full h-[94px] gap-[5px] fixed top-0 flex flex justify-between items-center px-[15px]">
        <div className="" onClick={() => router.push("/main")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle cx="16" cy="16" r="16" fill="white" />
            <path
              d="M25 15.5139L10 15.5139"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.0385 11.4546L10 15.5139L14.0385 19.5732"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-[2px] items-center">
          {selectedNess == "NESS" ? (
            <Icon_normal />
          ) : selectedNess == "HARDNESS" ? (
            <Icon_hardness />
          ) : (
            <Icon_calmness />
          )}
          네스
        </div>
        <Icon_information
          className="cursor-pointer"
          onClick={() => setIsModal(true)}
        />
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
    </div>
  );
};

export default Chatting;
