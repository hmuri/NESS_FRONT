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
    <div className="min-h-100vh w-full bg-[#F2F0FF] p-[20px]">
      <div>
        {chatMessages.map((message, index) => {
          const isUser = message.user === "user";
          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  isUser
                    ? "bg-purple-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>send</button>
    </div>
  );
};

export default Chatting;
