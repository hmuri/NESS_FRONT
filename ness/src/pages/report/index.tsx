import { useEffect, useState } from "react";
import { getReportMemories, getReportTags } from "../apis/report";
import { fetchRecommendMessage } from "../apis/main";
import BookImg from "../../assets/book.png";
import Image from "next/image";

const Index = () => {
  const [tags, setTags] = useState<ReportTag[] | undefined>();
  const [reportMemoryList, setMemories] = useState<
    ReportMemory[] | undefined
  >();
  const [memoriesByDate, setMemoriesByDate] = useState({});
  const [recommendMessage, setRecommendMessaage] = useState<
    IMainData | undefined
  >();
  const fetchTags = async () => {
    const data = await getReportTags();
    if (data) {
      setTags(data.reportTagList);
    }
  };
  const fetchMemories = async () => {
    const data = await getReportMemories();
    if (data) {
      setMemories(data.reportMemoryList);
    }
  };

  const fetchData = async () => {
    const result = await fetchRecommendMessage();
    setRecommendMessaage(result);
  };

  useEffect(() => {
    fetchTags();
    fetchMemories();
    fetchData();
  }, []);

  useEffect(() => {
    const startDay = new Date();
    startDay.setDate(startDay.getDate() - 13); // 14일 전부터 오늘까지
    const dateArray = [];
    const memoryMap: { [key: string]: string } = {};

    for (let i = 0; i < 14; i++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
      dateArray.push(formattedDate);
      memoryMap[formattedDate] = "";
    }

    reportMemoryList?.forEach((memory) => {
      const memoryDate = memory.createdDate.split("T")[0];
      if (memoryMap.hasOwnProperty(memoryDate)) {
        memoryMap[memoryDate] = memory.memory;
      }
    });

    setMemoriesByDate(memoryMap);
  }, [reportMemoryList]);

  const memoryEntries = Object.entries(memoriesByDate);
  const firstRow = memoryEntries.slice(0, 7);
  const secondRow = memoryEntries.slice(7);

  return (
    <div className="p-[20px] mb-[100px]">
      <div className="mt-[40px] flex w-full mb-[45px]">
        <div className="w-full flex flex-col pr-[20px] h-100px items-center gap-[40px]">
          <Image src={BookImg} alt={""} width={100} height={100} />
          <div className="text-[24px] font-medium ">
            {recommendMessage?.recommend}
          </div>
        </div>
      </div>
      <div className="text-[20px] font-[500] mb-[10px]">네스 보고서</div>
      <div className="rounded-[10px] bg-[#ECECEC] w-full h-[114px] flex items-center">
        <div className="w-full px-[5px]">
          <div className=" flex justify-between ">
            {firstRow.map(([date, memory]) => (
              <div
                key={date}
                className="w-[43px] h-[43px] rounded-[12px] bg-[#D9D9D9] flex items-center justify-center m-1"
              >
                {memory ? <>{memory}</> : <></>}
              </div>
            ))}
          </div>
          <div className=" flex justify-between">
            {secondRow.map(([date, memory]) => (
              <div
                key={date}
                className="w-[43px] h-[43px] rounded-[12px] bg-[#D9D9D9] flex items-center justify-center m-1"
              >
                {memory ? <>{memory}</> : <></>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-[20px] font-[500] mb-[15px] mt-[40px]">
        당신의 태그
      </div>
      <div className="flex gap-[6px] flex-col">
        {tags?.map((tag) => (
          <div key={tag.id} className="rounded-[10px] bg-[#F2F0FF] w-full">
            <div className="px-[17px] py-[15px]">
              <div className="text-[16px] font-[500] tracking-tighter text-center">
                {tag.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
