import { useEffect, useState } from "react";
import { getReportMemories, getReportTags } from "../../module/apis/report";
import { fetchRecommendMessage } from "../../module/apis/main";
import BookImg from "../../../public/assets/book.png";
import Image from "next/image";
import Nav from "@/components/common/Nav";
import { getProfile } from "@/module/apis/mypage";
import {
  Icon_big_calm_ness,
  Icon_big_hard_ness,
  Icon_big_normal_ness,
  Icon_calmness,
  Icon_hardness,
  Icon_normal,
} from "@/module/icons";

const Index = () => {
  const [tags, setTags] = useState<ReportTag[] | undefined>();
  const [reportMemoryList, setMemories] = useState<
    ReportMemory[] | undefined
  >();
  const [selectedTag, setSelectedTag] = useState<ReportTag | undefined>();
  const [isModal, setIsModal] = useState(false);
  const [memoriesByDate, setMemoriesByDate] = useState({});
  const [recommendMessage, setRecommendMessaage] = useState<
    IMainData | undefined
  >();
  const [selectedNess, setSelectedNess] = useState<string>("");
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

  const handleSelectTag = (tag: ReportTag) => {
    setSelectedTag(tag);
    setIsModal(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setSelectedNess(data.persona);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-[20px] mb-[100px] flex justify-center ">
      <div className="md:w-[600px]">
        <div className="mt-[40px] flex w-full mb-[45px]">
          <div className="w-full flex flex-col pr-[20px] h-100px items-center gap-[40px]">
            {selectedNess == "NESS" ? (
              <Icon_big_normal_ness />
            ) : selectedNess == "HARDNESS" ? (
              <Icon_big_hard_ness />
            ) : (
              <Icon_big_calm_ness />
            )}
            <div className="text-[24px] font-medium whitespace-normal break-words">
              {recommendMessage?.recommend}
            </div>
          </div>
        </div>
        <div className="text-[20px] font-[500] mb-[10px]">당신의 메모리</div>
        <div className="rounded-[10px] bg-[#F2F0FF] w-full h-[114px] flex items-center">
          <div className="w-full px-[5px]">
            <div className=" flex justify-between ">
              {firstRow.map(([date, memory]) => (
                <div
                  key={date}
                  className="w-[43px] h-[43px] rounded-[12px] text-[30px] flex items-center justify-center m-1"
                >
                  {memory ? <>{memory}</> : <></>}
                </div>
              ))}
            </div>
            <div className=" flex justify-between">
              {secondRow.map(([date, memory]) => (
                <div
                  key={date}
                  className="w-[43px] h-[43px] rounded-[12px] text-[30px] flex items-center justify-center m-1"
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
            <div
              key={tag.id}
              onClick={() => handleSelectTag(tag)}
              className="rounded-[10px] bg-[#F2F0FF] w-full"
            >
              <div className="px-[17px] py-[15px]">
                <div className="text-[16px] font-[500] tracking-tighter text-center">
                  {tag.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Nav />
      {isModal && (
        <TagModal
          selectedNess={selectedNess}
          selectedTag={selectedTag}
          setIsModal={setIsModal}
        />
      )}
    </div>
  );
};

const TagModal = ({
  selectedNess,
  selectedTag,
  setIsModal,
}: {
  selectedNess: string;
  selectedTag: ReportTag | undefined;
  setIsModal: any;
}) => {
  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // 자식 요소로 이벤트 전파를 막음
  };
  return (
    <div
      className="w-[100vw] h-[100vh] bg-black fixed bottom-0 left-0 bg-opacity-50 z-20 flex justify-center"
      onClick={() => setIsModal(false)}
    >
      <div
        onClick={handleModalClick}
        className="fixed flex gap-[15px] flex-col items-center justify-center px-[30px] bottom-0 bg-white w-full h-[300px] rounded-t-[12px] md:w-[650px] md:rounded-t-[20px]"
      >
        {selectedNess == "NESS" ? (
          <Icon_big_normal_ness />
        ) : selectedNess == "HARDNESS" ? (
          <Icon_big_hard_ness />
        ) : (
          <Icon_big_calm_ness />
        )}
        <div className="text-[#7a64ff] font-semibold text-[20px]">
          {selectedTag?.title}
        </div>
        <div>{selectedTag?.info}</div>
      </div>
    </div>
  );
};

export default Index;
