import FloatingNess from "@/components/common/FloatingNess";
import Nav from "@/components/common/Nav";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import BookImg from "../../../public/assets/book.png";
import NoIMG from "../../../public/assets/no_image.png";
import { fetchRecommendMessage } from "../../module/apis/main";
import { getProfile } from "@/module/apis/mypage";
import {
  Icon_big_calm_ness,
  Icon_big_hard_ness,
  Icon_big_normal_ness,
  Icon_calmness,
  Icon_hardness,
  Icon_normal,
} from "@/module/icons";

const cookies = new Cookies();
const token = cookies.get("accessToken") || "";

const Main = () => {
  const NoIMG = "assets/no_image.png";
  const [data, setData] = useState<IMainData | undefined>(undefined);
  const [items, setItems] = useState<IActivity[] | undefined>(undefined);
  const [selectedNess, setSelectedNess] = useState<string>("");
  const [scheduleList, setScheduleList] = useState<
    ScheduleItem[] | undefined
  >();

  const imageUrls = [
    "https://ness-static-s3.s3.ap-northeast-2.amazonaws.com/background-1.png",
    "https://ness-static-s3.s3.ap-northeast-2.amazonaws.com/background-2.png",
    "https://ness-static-s3.s3.ap-northeast-2.amazonaws.com/background-3.png",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchRecommendMessage();
      setData(result);
      setItems(result?.activityList);
      setScheduleList(result?.scheduleList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setSelectedNess(data.persona);
      }
    };

    fetchProfile();
  }, []);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
    index: number
  ) => {
    const nextIndex = index % imageUrls.length;
    event.currentTarget.src = imageUrls[nextIndex];
  };

  return (
    <>
      <div className="p-[20px] mb-[100px] flex flex-col md:items-center">
        <div className="mt-[40px] flex justify-between items-center w-full md:max-w-[600px] mb-[45px]">
          <div className="flex h-100px md:items-center">
            <div className="text-[24px] font-medium whitespace-normal break-words">
              {data?.recommend}
            </div>
          </div>
          <div className="flex items-center">
            {selectedNess == "NESS" ? (
              <Icon_big_normal_ness />
            ) : selectedNess == "HARDNESS" ? (
              <Icon_big_hard_ness />
            ) : (
              <Icon_big_calm_ness />
            )}
          </div>
        </div>
        <div className="text-[20px] font-[500] mb-[10px] md:w-full md:max-w-[600px]">
          이런 활동은 어떠세요?
        </div>
        <div className="flex flex-row items-center justify-between gap-[8px] overflow-x-auto md:w-full md:max-w-[600px]">
          {items?.map((item, index) => (
            <div key={index} className="relative">
              <img
                className=" w-[125px] h-[110px] rounded-[10px] relative md:w-[200px] md:h-[150px]"
                src={item.imageTag}
                alt=""
                onError={(e) => handleImageError(e, index)} // onError 이벤트 핸들러 설정
              />
              <div className="absolute rounded-[10px] w-full bg-black opacity-50 h-full text-white left-[0px] top-[0px] z-10 p-[10px]"></div>
              <div className="absolute rounded-[10px] w-full h-full text-white left-[0px] top-[0px] z-10 p-[10px]">
                {item.activity}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[20px] w-full font-[500] mb-[10px] mt-[40px] text-left  md:max-w-[600px]">
          일정 리마인드
        </div>
        <div className=" rounded-[10px] bg-[#F2F0FF] w-full min-h-[160px] md:max-w-[600px]">
          <div className="m-[20px] relative">
            <div className="absolute left-[60px] top-1 bottom-0 w-[1px] bg-[#7A64FF]"></div>
            {scheduleList?.map((schedule) => (
              <div key={schedule.id} className="relative flex mt-8 ]">
                <div className="ml-[10px] text-[#868686] text-[12px]">
                  {new Date(schedule.start).toLocaleString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className="absolute left-[54px] top-1 w-[12px] h-[12px] rounded-full bg-[#7A64FF]"></div>
                <div className="pl-[40px]">
                  <div className="flex gap-[5px]">
                    <strong className="font-bold">{schedule.title}</strong>{" "}
                    <div
                      className="px-[5px] py-[3px] rounded-[5px] text-[10px]"
                      style={{ backgroundColor: schedule.categoryColor }}
                    >
                      {schedule.category}
                    </div>
                  </div>
                  <div className="text-[12px] text-[#868686] flex gap-[10px]">
                    {schedule.details.location && (
                      <div> 🧭{schedule.details.location}</div>
                    )}
                    {schedule.details.person && (
                      <div> 👯{schedule.details.person}</div>
                    )}
                  </div>
                  <div className="bg-white px-[10px] py-[5px] rounded-[16px] text-[12px] mt-[8px]">
                    {schedule.nessComment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Nav />
      <FloatingNess message="환영해요!" />
    </>
  );
};

export default Main;
function setSelectedNess(persona: string) {
  throw new Error("Function not implemented.");
}
