import FloatingNess from "@/components/common/FloatingNess";
import Nav from "@/components/common/Nav";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import BookImg from "../../assets/book.png";
import AIImg from "../../assets/ai.png";
import FireworkImg from "../../assets/firework.png";
import ReactImg from "../../assets/react.png";
import TodayTodo from "@/components/main/TodayTodo";
import WeatherImg from "../../assets/weather.png";

const cookies = new Cookies();
const token = cookies.get("accessToken") || "";

interface IMainData {
  recommendId: number;
  recommend: string;
  scheduleId?: number;
  title?: string;
  start?: string;
  end?: string | null;
  category?: string;
  categoryNum?: number;
  details?: ScheduleDetails;
}

interface ScheduleDetails {
  location: string;
  person: string;
}

const fetchChatMessages = async (): Promise<IMainData | undefined> => {
  try {
    const response = await axios.get<IMainData>(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/main`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch chat messages", error);
  }
};

const Main = () => {
  const [data, setData] = useState<IMainData | undefined>(undefined);
  const items = [
    { image: AIImg, text: "OPEN AI API 공부하기" },
    { image: FireworkImg, text: "여의도 불꽃축제 가기" },
    { image: ReactImg, text: "React Native 공부하기" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchChatMessages();
      setData(result);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="p-[20px] mb-[100px]">
        <div className="mt-[40px] flex w-full mb-[45px]">
          <div className="flex flex-7/10 pr-[20px] h-100px items-center">
            <div className="text-[24px] font-medium ">{data?.recommend}</div>
          </div>
          <div className="flex-3/10">
            <Image src={BookImg} alt={""} width={100} height={100} />
          </div>
        </div>
        <div className="text-[20px] font-[500] mb-[10px]">
          이런 활동은 어떠세요?
        </div>
        <div className="flex flex-row gap-[8px] overflow-x-auto">
          {items.map((item, index) => (
            <div key={index} className="relative">
              <Image
                className="opacity-70 w-[125px] h-[110px] rounded-[10px] relative p-y-[8px] p-x-[10px]"
                src={item.image}
                alt=""
              />
              <div className="absolute text-white left-[0px] top-[0px] z-10 m-[10px]">
                {item.text}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[20px] font-[500] mb-[10px] mt-[40px]">
          오늘의 일정 리마인드
        </div>
        <div className="flex gap-[12px] justify-between">
          <div className="flex flex-col justify-center gap-[5px] rounded-[10px] bg-[#C9DBFF] h-[178px] px-[15px] overflow-auto py-[20px]">
            <Image src={WeatherImg} alt="" />
            <div className="text-[#6B6B6B] text-center text-[16px]">22°C</div>
          </div>
          <TodayTodo />
        </div>
        <div className="text-[20px] font-[500] mb-[10px] mt-[40px]">
          네스 보고서
        </div>
        <div className="rounded-[10px] bg-[#F2F0FF] w-full min-h-[160px]">
          <div className="p-[20px]">
            <div className="text-[16px] font-[500] tracking-tighter">
              오늘은 개발, 토익 공부하기 등의 활동이 있습니다. 이를 바탕으로
              백엔드 공부를 더 공부하시는 건 어떨까요? 토익 공부도 체계적으로
              진행해보시면 좋겠어요.
            </div>
          </div>
        </div>
      </div>
      <Nav />
      <FloatingNess />
    </>
  );
};

export default Main;
