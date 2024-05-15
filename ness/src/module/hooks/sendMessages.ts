// hooks/useSendMessage.ts
import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("accessToken") || "";

export const useSendMessage = () => {
  return useMutation(
    async ({
      newMessage: messageText,
      isSTT,
    }: {
      newMessage: string;
      isSTT: boolean;
    }) => {
      const chatType = isSTT ? "STT" : "USER";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/chat`,
        { chatType: chatType, text: messageText },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data.chatList; // 서버로부터의 응답 반환
    }
  );
};
