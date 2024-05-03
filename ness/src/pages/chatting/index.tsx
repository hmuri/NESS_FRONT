import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IChatMessage, ISendMessage } from "../../module/interface/chatting";
import LeftChatImg from "../../assets/leftChat.png";
import RightChatImg from "../../assets/rightChat.png";
import { useRouter } from "next/router";
import { useSendMessage } from "@/module/hooks/sendMessages";
import useFetchChatMessages from "@/module/hooks/getMessages";
import { LoadingLottie } from "@/module/LottieComponents";
import { Icon_ness_main } from "@/module/icons";

const Chatting = () => {
  const { data: initialChatMessages } = useFetchChatMessages();
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isLoading } = useSendMessage();

  const router = useRouter();

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

  const handleSendMessage = () => {
    const optimisticMessage: IChatMessage = {
      case: 0,
      chatType: "USER",
      text: newMessage,
      id: Date.now(),
      createdDate: new Date().toString(),
    };

    // 낙관적 UI 업데이트
    setChatMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    setNewMessage("");

    // 메시지 전송, onSuccess로 전체 리스트 업데이트
    sendMessage(newMessage, {
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
        };
        setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
      },
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="relative mt-[94px] flex-1 w-full bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px] pb-[50px]">
          {chatMessages.map((message, index) => {
            if (message.case === 2) {
              const parts = message.text.split("<separate>");
              return (
                <div
                  key={index}
                  className={`flex relative mb-[14px] ${
                    message.chatType === "USER"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-[12px] py-[10px] rounded-[16px] ${
                      message.chatType === "USER"
                        ? "bg-[#7A64FF] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <Image
                      src={
                        message.chatType === "USER" ? RightChatImg : LeftChatImg
                      }
                      className={`absolute bottom-3 ${
                        message.chatType === "USER"
                          ? "right-[-11px]"
                          : "left-[-11px]"
                      }`}
                      alt=""
                    />
                    <p>{parts[0]}</p>
                  </div>
                  {parts[1] && (
                    <div className="p-[12px] mt-[4px] rounded-[16px] bg-[#F0F0F0] text-[#333]">
                      {/* <pre>{JSON.stringify(JSON.parse(parts[1]), null, 2)}</pre> */}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`flex relative mb-[14px] ${
                    message.chatType === "USER"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-[12px] py-[10px] rounded-[16px] ${
                      message.chatType === "USER"
                        ? "bg-[#7A64FF] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <Image
                      src={
                        message.chatType === "USER" ? RightChatImg : LeftChatImg
                      }
                      className={`absolute bottom-3 ${
                        message.chatType === "USER"
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
            placeholder="채팅 입력하기"
            onChange={(e) => setNewMessage(e.target.value)}
          />
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
        <Icon_ness_main />
        네스
      </div>
    </div>
  );
};

export default Chatting;
