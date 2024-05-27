import FloatingNess from "@/components/common/FloatingNess";
import Nav from "@/components/common/Nav";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import BookImg from "../../../public/assets/book.png";
import NoIMG from "../../../public/assets/no_image.png";
import { fetchRecommendMessage } from "../../module/apis/main";
import { getProfile } from "@/module/apis/mypage";
import { Icon_calmness, Icon_hardness, Icon_normal } from "@/module/icons";

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

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = NoIMG;
  };

  return (
    <>
      <div className="p-[20px] mb-[100px] flex flex-col md:items-center">
        <div className="mt-[40px] flex justify-between w-full md:max-w-[600px] mb-[45px]">
          <div className="flex items-center pr-[20px]">
            {selectedNess == "NESS" ? (
              <Icon_normal />
            ) : selectedNess == "HARDNESS" ? (
              <Icon_hardness />
            ) : (
              <Icon_calmness />
            )}
          </div>
          <div className="flex h-100px md:items-center">
            <div className="text-[24px] font-medium ">{data?.recommend}</div>
          </div>
        </div>
        <div className="text-[20px] font-[500] mb-[10px] md:w-full md:max-w-[600px]">
          이런 활동은 어떠세요?
        </div>
        <div className="flex flex-row items-center justify-between gap-[8px] overflow-x-auto md:w-full md:max-w-[600px]">
          {items?.map((item, index) => (
            <div key={index} className="relative">
              <img
                className="opacity-70 w-[125px] h-[110px] rounded-[10px] relative py-[8px] px-[10px] md:w-[200px] md:h-[150px]"
                src={item.imageTag}
                alt=""
                onError={handleImageError} // onError 이벤트 핸들러 설정
              />
              <div className="absolute text-white left-[0px] top-[0px] z-10 m-[10px]">
                {item.activity}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[20px] font-[500] mb-[10px] mt-[40px]">
          네스 보고서
        </div>
        <div className="rounded-[10px] bg-[#F2F0FF] w-full min-h-[160px]">
          <div className="p-[20px]">
            <div className="text-[16px] font-[500] tracking-tighter">
              {scheduleList?.map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-[20px] border-b border-gray-300"
                >
                  <div className="text-[16px] font-[500]">
                    <strong>{schedule.title}</strong> (
                    {schedule.details.location})
                  </div>
                  <div className="text-[14px]">
                    <div>
                      시작 시간: {new Date(schedule.start).toLocaleString()}
                    </div>
                    <div>
                      종료 시간: {new Date(schedule.end).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-[14px] mt-[4px]">
                    {schedule.details.person && (
                      <div>함께하는 사람: {schedule.details.person}</div>
                    )}
                    <div style={{ color: schedule.categoryColor }}>
                      카테고리: {schedule.category}
                    </div>
                  </div>
                  <div className="text-[14px] mt-[4px] italic">
                    {schedule.nessComment}
                  </div>
                </div>
              ))}
            </div>
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
