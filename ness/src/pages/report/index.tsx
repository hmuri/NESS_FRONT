import { useEffect, useState } from "react";
import { getReportMemories, getReportTags } from "../apis/report";
import { fetchRecommendMessage } from "../apis/main";
import BookImg from "../../assets/book.png";
import Image from "next/image";

const Index = () => {
  const [tags, setTags] = useState<ReportTagList | undefined>();
  const [memories, setMemories] = useState<ReportMemoryList | undefined>();
  const [recommendMessage, setRecommendMessaage] = useState<
    IMainData | undefined
  >();
  const fetchTags = async () => {
    const data = await getReportTags();
    if (data) {
      setTags(data);
    }
  };
  const fetchMemories = async () => {
    const data = await getReportMemories();
    if (data) {
      setMemories(data);
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
  return (
    <div className="p-[20px] mb-[100px]">
      <div className="mt-[40px] flex w-full mb-[45px]">
        <div className="w-full flex flex-col pr-[20px] h-100px items-center gap-[40px] mb-[40px]">
          <Image src={BookImg} alt={""} width={100} height={100} />
          <div className="text-[24px] font-medium ">
            {recommendMessage?.recommend}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
