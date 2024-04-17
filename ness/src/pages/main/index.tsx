import FloatingNess from "@/components/common/FloatingNess";
import Nav from "@/components/common/Nav";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import BookImg from "../../assets/book.png";
import AIImg from "../../assets/ai.png";
import NoteBookImg from "../../assets/notebook.png";
import ReactImg from "../../assets/react.png";

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
    { image: NoteBookImg, text: "개발 프로젝트 진행하기" },
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
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              className="w-[125px] h-[110px] rounded-[10px] relative p-y-[8px] p-x-[10px]"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                opacity: "0.8",
              }}
            >
              <div className="absolute text-white left-[0px] top-[0px] z-10 m-[10px]">
                {item.text}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[20px] font-[500] mb-[10px] mt-[40px]">
          오늘의 일정 리마인드
        </div>
        <div className="rounded-[10px] bg-[#ECECEC] w-[100%] h-[178px] px-[15px]">
          {data?.title}
        </div>
        <div className="text-[20px] font-[500] mb-[10px] mt-[40px]">
          네스 보고서
        </div>
        <div className="rounded-[10px] bg-[#F2F0FF] w-full min-h-[160px]">
          <div className="p-[20px]">
            <div className="text-[16px] font-[500] tracking-tighter">
              이번 달 들어서 클라이밍을 자주 하셨네요!
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
