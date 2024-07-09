// hooks/useSendMessage.ts
import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "universal-cookie";
import axiosInstance from "../axiosInstance";

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
      const response = await axiosInstance.post(`/chat`, {
        chatType: chatType,
        text: messageText,
      });
      return response.data.chatList; // 서버로부터의 응답 반환
    }
  );
};
