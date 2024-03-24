import { IChatMessage } from "../../module/interface/chatting";
import { useState } from "react";

const initialMessages =
  require("../../../public/json/chatting.json") as IChatMessage[];

const Chatting = () => {
  const [chatMessages, setChatMessages] =
    useState<IChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const handleSendMessage = () => {
    const newChatMessage: IChatMessage = {
      user: "user",
      time: new Date().toLocaleTimeString(),
      content: newMessage,
    };

    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-gray-200 bg-white w-full h-[94px] fixed mt-[60px] relative flex justify-center items-center">
        네스
      </div>
      <div className="relative flex-1 w-full bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px]">
          {chatMessages.map((message, index) => {
            const isUser = message.user === "user";
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
                  <p>{message.content}</p>
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

export default Chatting;
