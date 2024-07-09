import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "universal-cookie"; // react-cookie 패키지가 필요합니다.
import axiosInstance from "../axiosInstance";

const useFetchChatMessages = () => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken") || "";

  return useQuery(
    "chatMessages",
    async () => {
      const response = await axiosInstance.get(`/chat`);
      return response.data.chatList;
    },
    {
      staleTime: 300000, // 5분 동안 데이터를 신선하다고 간주
      cacheTime: 600000, // 캐시 유지 시간 10분
      onError: (error) => {
        console.error("Failed to fetch chat messages", error);
      },
    }
  );
};

export default useFetchChatMessages;
