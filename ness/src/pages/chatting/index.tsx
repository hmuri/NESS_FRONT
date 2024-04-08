import axios from "axios";
import { IChatMessage, ISendMessage } from "../../module/interface/chatting";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import NessImg from "../../assets/ness_chat.png";

interface IChattingProps {
  defaultMessageList: IChatMessage[];
  accessToken: string;
}
const Chatting = (props: IChattingProps) => {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>(
    props.defaultMessageList
  );
  const [newMessage, setNewMessage] = useState("");
  const handleSendMessage = async () => {
    const newChatMessage: ISendMessage = {
      chatType: "USER",
      text: newMessage,
    };
    setNewMessage("");
    try {
      const response = await axios.post(
        "http://13.125.106.110:8080/chat",
        newChatMessage,
        {
          headers: {
            Authorization: `${props.accessToken}`,
          },
        }
      );
      setChatMessages(response.data.chatList);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-gray-200 bg-white w-full h-[94px] gap-[5px] relative mt-[60px] flex-col flex justify-center items-center">
        <Image src={NessImg} alt="" />
        네스
      </div>
      <div className="relative flex-1 w-full bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px]">
          {chatMessages?.map((message, index) => {
            const isUser = message.chatType === "USER";
            return (
              <div
                key={index}
                className={`flex mb-[14px] ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-[12px] py-[10px] rounded-[16px] ${
                    isUser ? "bg-[#7A64FF] text-white" : "bg-white text-black"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-[25px] left-[20px] right-[20px] flex">
          <input
            className="w-full bg-white h-[41px] px-[22px] py-[13px] rounded-[20px] border border-purple-600 shadow-md"
            type="text"
            value={newMessage}
            placeholder="채팅 입력하기"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>send</button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie;

  let accessToken = "";

  // 쿠키 문자열을 파싱하여 accessToken 추출
  if (cookies) {
    const cookieObj = Object.fromEntries(
      cookies.split(";").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key.trim(), decodeURIComponent(value)];
      })
    );

    accessToken = cookieObj.accessToken || "";
  }

  try {
    const response = await axios.get("http://13.125.106.110:8080/chat", {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const defaultMessageList = response?.data.chatList;

    return {
      props: {
        defaultMessageList,
        accessToken,
      },
    };
  } catch (error) {
    console.error("Failed to fetch profile", error);
  }
}

export default Chatting;
