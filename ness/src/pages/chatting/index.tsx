import { GetServerSidePropsContext } from "next";
import { IChatMessage, ISendMessage } from "../../module/interface/chatting";
import { useEffect, useState } from "react";

const Chatting = ({ accessToken }: any) => {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new WebSocket(
      `ws://localhost:3000?accessToken=${accessToken}`
    );

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      const newMessage: IChatMessage = JSON.parse(event.data);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [accessToken]);

  const handleSendMessage = () => {
    if (ws) {
      const newChatMessage: ISendMessage = {
        chatType: "USER",
        text: newMessage,
      };

      ws.send(JSON.stringify(newChatMessage));
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-gray-200 bg-white w-full h-[94px] fixed mt-[60px] relative flex justify-center items-center">
        네스
      </div>
      <div className="relative flex-1 w-full bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px]">
          {chatMessages.map((message, index) => {
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

  // 쿠키에서 액세스 토큰 추출
  if (cookies) {
    const cookieObj = Object.fromEntries(
      cookies.split(";").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key.trim(), decodeURIComponent(value)];
      })
    );

    accessToken = cookieObj.accessToken || "";
  }

  return {
    props: {
      accessToken,
    },
  };
}

export default Chatting;
