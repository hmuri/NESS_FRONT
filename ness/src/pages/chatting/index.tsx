import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NessImg from "../../assets/ness_chat.png";
import { IChatMessage, ISendMessage } from "../../module/interface/chatting";
import Cookies from "universal-cookie";
import SendImg from "../../assets/send.png";
import LeftChatImg from "../../assets/leftChat.png";
import RightChatImg from "../../assets/rightChat.png";

const cookies = new Cookies();

const Chatting = () => {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    const token = cookies.get("accessToken") || "";
    setAccessToken(token);

    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/chat`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setChatMessages(response.data.chatList);
      } catch (error) {
        console.error("Failed to fetch chat messages", error);
      }
    };

    fetchChatMessages();
  }, []);

  const handleSendMessage = async () => {
    const newChatMessage: ISendMessage = {
      chatType: "USER",
      text: newMessage,
    };
    setNewMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/chat`,
        newChatMessage,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      setChatMessages(response.data.chatList);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="relative mt-[94px] flex-1 w-full bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px] pb-[50px]">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex relative mb-[14px] ${
                message.chatType === "USER" ? "justify-end" : "justify-start"
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
                  src={message.chatType === "USER" ? RightChatImg : LeftChatImg}
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
          ))}
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
        <Image src={NessImg} alt="Ness Logo" />
        네스
      </div>
    </div>
  );
};

export default Chatting;
