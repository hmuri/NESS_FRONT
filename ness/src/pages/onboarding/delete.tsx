import { useEffect, useRef, useState } from "react";
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
  Icon_mic,
  Icon_normal,
  Icon_wrong,
} from "@/module/icons";
import Cookies from "universal-cookie";
import axios from "axios";
import StopIcon from "../../../public/assets/Stop button.png";
import useSpeechRecognition from "@/module/hooks/speechRecognition";
import { getProfile } from "@/module/apis/mypage";

const Chatting = () => {
  const { data: initialChatMessages } = useFetchChatMessages();
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    {
      case: 1,
      id: 1,
      chatType: "AI",
      createdDate: "2024-06-19T12:00:00Z",
      text: "성공적으로 일정 분석을 진행했어요!\n이제 일정을 삭제해불까요?",
      metadata: null,
    },
    {
      case: 10,
      id: 3,
      chatType: "AI",
      createdDate: "2024-06-19T12:03:00Z",
      text: "일정 삭제하기",
      metadata: null,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isLoading } = useSendMessage();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedNess, setSelectedNess] = useState<string>("");
  const [isSTT, setIsSTT] = useState(false);
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

  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setSelectedNess(data.persona);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    chatMessages.forEach((message) => {
      if (message.case === 2) {
        const parts = message.text.split("<separate>");
        let jsonData = parts[1].trim();

        const jsonStart = jsonData.indexOf("{");
        const jsonEnd = jsonData.lastIndexOf("}") + 1;

        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          jsonData = jsonData.substring(jsonStart, jsonEnd);
        }

        try {
          const data = JSON.parse(jsonData);

          setNewSchedule((prevSchedule) => ({
            ...prevSchedule,
            id: message.id,
            start: new Date(data?.start_time),
            end: data?.end_time
              ? new Date(data?.end_time)
              : new Date(new Date(data.start_time).getTime() + 3600000),
            categoryNum: data?.category.id,
            location: data?.location ? data?.location : "",
            people: data?.people ? data?.people : "",
            title: data?.info,
          }));
        } catch (error) {
          console.error("Error parsing JSON data: ", error);
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              case: 0,
              chatType: "AI",
              text: "오류가 발생했습니다. 리포트를 통해 제보해주세요.",
              id: Date.now(),
              createdDate: new Date().toString(),
              metadata: null,
            },
          ]);
        }
      }
    });
  }, [chatMessages]);

  const confirmSchedule = async (isAdded: boolean) => {
    const accessToken = cookies.get("accessToken");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/schedule/ai?isAccepted=${isAdded}&chatId=${newSchedule.id}`,
        newSchedule,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      setChatMessages(response.data.chatList);
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

  const handleScheduleAdd = (isAdded: boolean) => {
    setIsSelected(true);
    confirmSchedule(isAdded);
  };

  const handleSendMessage = () => {
    const optimisticMessage: IChatMessage = {
      case: 0,
      chatType: isSTT ? "STT" : "USER",
      text: newMessage,
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
  const handleButton = (text: string) => {
    if (text == "일정 삭제하기") {
      addMessage();
    } else if (text == "일정 삭제하기") {
      router.replace("/onboarding/delete");
    }
  };
  const addMessage = () => {
    const newMessages: IChatMessage[] = [
      {
        case: 1,
        id: chatMessages.length + 1,
        chatType: "USER",
        createdDate: "2024-06-19T12:05:00Z",
        text: "여가 관련 일정 삭제",
        metadata: null,
      },
      {
        case: 2,
        id: chatMessages.length + 2,
        chatType: "AI",
        createdDate: "2024-06-19T12:06:00Z",
        text: `아래 일정을 삭제해 드릴까요?
        <separate>
        {
          "info": "쇼핑가기",
          "location": "신촌",
          "person": "홍길동",
          "start_time": "2024-06-14T21:00:00",
          "end_time": "2024-06-14T22:00:00",
          "category": {
            "name": "약속",
            "id": 12,
            "color": "#759CFF"
          }
        }`,
        metadata: null,
      },
      {
        case: 11,
        id: chatMessages.length + 3,
        chatType: "AI",
        createdDate: "2024-06-19T12:03:00Z",
        text: "모두 삭제",
        metadata: null,
      },
    ];
    setChatMessages([...chatMessages, ...newMessages]);
  };
  const addSecondMessage = () => {
    const newMessages: IChatMessage[] = [
      {
        case: 0,
        id: chatMessages.length + 4,
        chatType: "AI",
        createdDate: "2024-06-19T13:03:00Z",
        text: "수고하셨어요! 이제 NESS와 함께, 실제 채팅을 진행해보세요.",
        metadata: null,
      },
      {
        case: 12,
        id: chatMessages.length + 5,
        chatType: "AI",
        createdDate: "2024-06-19T14:03:00Z",
        text: "채팅 바로가기",
        metadata: null,
      },
    ];
    setChatMessages([...chatMessages, ...newMessages]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="relative mt-[94px] flex-1 bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px] pb-[50px]">
          {chatMessages.map((message, index) => {
            if (message.case === 12) {
              return (
                <div
                  key={index}
                  className="landing-grabox max-w-[70%] relative mb-[14px] flex-col justify-start py-[5px] px-[10px] rounded-[10px] inline text-white cursor-pointer"
                  onClick={() => router.replace("/chatting")}
                >
                  {message.text}
                </div>
              );
            }
            if (message.case === 11) {
              return (
                <div
                  key={index}
                  className="bg-white flex relative mb-[14px] py-[10px] rounded-[10px] w-[90px] justify-center text-[#E8505B] cursor-pointer"
                  onClick={addSecondMessage}
                >
                  {message.text}
                </div>
              );
            }
            if (message.case === 10) {
              return (
                <div
                  key={index}
                  className="cursor-pointer landing-grabox max-w-[70%] relative mb-[14px] flex-col justify-start py-[5px] px-[10px] rounded-[10px] inline text-white"
                  onClick={() => handleButton(message.text)}
                >
                  {message.text}
                </div>
              );
            }
            if (message.case === 2) {
              const parts = message.text.split("<separate>");
              let jsonData = parts[1].trim();
              const jsonStart = jsonData.indexOf("{");
              const jsonEnd = jsonData.lastIndexOf("}") + 1;
              if (jsonStart >= 0 && jsonEnd > jsonStart) {
                jsonData = jsonData.substring(jsonStart, jsonEnd); // JSON 데이터 추출
              }
              const data = JSON.parse(jsonData);
              const formattedDate = moment(data?.start_time)
                .locale("ko")
                .format("MMMM Do dddd");
              return (
                <div
                  key={index}
                  className={`flex max-w-[70%] relative mb-[14px] flex-col ${
                    message.chatType === "USER" || message.chatType === "STT"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="relative mb-[5px]">
                    <div
                      className={`px-[12px] py-[10px] rounded-[16px] ${
                        message.chatType === "USER" ||
                        message.chatType === "STT"
                          ? "bg-[#7A64FF] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <Image
                        src={
                          message.chatType === "USER" ||
                          message.chatType === "STT"
                            ? RightChatImg
                            : LeftChatImg
                        }
                        className={`absolute bottom-3 ${
                          message.chatType === "USER" ||
                          message.chatType === "STT"
                            ? "right-[-11px]"
                            : "left-[-11px]"
                        }`}
                        alt=""
                      />
                      <p>{parts[0]}</p>
                    </div>
                  </div>
                  {parts[1] && (
                    <div className="p-[12px] mt-[4px] rounded-[16px] max-w-[70%] inline bg-white text-[#333]">
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
                            {data.location && <div>🧭 {data.location}</div>}
                            {data.people && <div>👯 {data.people}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
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
                    className={`max-w-[70%] px-[12px] py-[10px] rounded-[16px] ${
                      message.chatType === "USER" || message.chatType === "STT"
                        ? "bg-[#7A64FF] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <Image
                      src={
                        message.chatType === "USER" ||
                        message.chatType === "STT"
                          ? RightChatImg
                          : LeftChatImg
                      }
                      className={`absolute bottom-3 ${
                        message.chatType === "USER" ||
                        message.chatType === "STT"
                          ? "right-[-11px]"
                          : "left-[-11px]"
                      }`}
                      alt=""
                    />
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
          />
          <div className="fixed right-[70px] cursor-pointer">
            {isListening ? (
              <Image src={StopIcon} alt="" onClick={toggleListening} />
            ) : (
              <Icon_mic onClick={toggleListening} />
            )}
          </div>
          <button onClick={handleSendMessage} disabled={isLoading}></button>
          <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
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
      <div className="z-100 border-b border-gray-200 bg-white w-full h-[94px] gap-[5px] fixed top-0 flex-col flex justify-center items-center">
        <div className="fixed left-[10px]" onClick={() => router.push("/main")}>
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
        {selectedNess == "NESS" ? (
          <Icon_normal />
        ) : selectedNess == "HARDNESS" ? (
          <Icon_hardness />
        ) : (
          <Icon_calmness />
        )}
        네스
      </div>
    </div>
  );
};

export default Chatting;
