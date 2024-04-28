import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Cookies from "universal-cookie";
import { IChatMessage } from "../interface/chatting";

const cookies = new Cookies();
const token = cookies.get("accessToken") || "";

const useSendMessage = () => {
  const queryClient = useQueryClient(); // 이미 설정된 QueryClient 인스턴스 사용

  return useMutation(
    async (messageText: string) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/chat`,
        { chatType: "USER", text: messageText },
        {
          headers: {
            Authorization: `${token}`, // accessToken 적절히 관리
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        // 전체 메시지 리스트로 업데이트
        queryClient.setQueryData<IChatMessage[]>(
          "chatMessages",
          () => data.chatList
        );
      },
      onError: (error) => {
        const errorMessage: IChatMessage = {
          chatType: "AI",
          text: "예상치 못한 에러가 발생했습니다. 문제가 지속될 경우 maxcse01@gmail.com으로 연락 주세요.",
          id: Date.now(),
          createdDate: new Date().toString(),
        };
        queryClient.setQueryData<IChatMessage[]>(
          "chatMessages",
          (oldMessages) => [...oldMessages!, errorMessage]
        );
      },
    }
  );
};

export default useSendMessage;
