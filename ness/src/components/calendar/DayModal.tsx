import moment from "moment";
import FloatingNess from "../common/FloatingNess";
import CalendarImage from "../../assets/tabler_calendar-plus.png";
import Image from "next/image";
import { useState } from "react";
import TrashBinImage from "../../assets/trash-bin.png";
import LeftArrowImage from "../../assets/left_arrow.png";

interface ScheduleEvent {
  title: string;
  start: Date;
  end?: Date;
  category: string;
  categoryNum: number;
  details: DetailList;
}

interface DetailList {
  id: number;
  location?: string | null;
  person?: string | null;
}

interface DayModalProps {
  events: ScheduleEvent[];
  isOpen: boolean;
  selectedDate: Date | null;
  onRequestClose: () => void;
}

interface CategoryStyle {
  [key: number]: { name: string; color: string };
}

const categoryStyles: CategoryStyle = {
  1: { name: "인턴", color: "#7A64FF" },
  2: { name: "공부", color: "#00C09E" },
  3: { name: "기타", color: "#454545" },
  5: { name: "개발", color: "#ffc0cb" },
};

interface IEditScheduleProps {
  event: ScheduleEvent;
  setIsAllVisible: any;
}
const EditSchedule = ({ event, setIsAllVisible }: IEditScheduleProps) => {
  return (
    <div className="w-full px-[7px] mt-[10px]">
      <div className="flex justify-between items-center cursor-pointer">
        <div onClick={() => setIsAllVisible(true)}>
          <Image src={LeftArrowImage} alt="" />
        </div>
        <div
          className="rounded-[20px] w-[115px] h-[40px] py-[10px] px-[2px] text-[15px] font-semibold text-center"
          style={{
            backgroundColor: categoryStyles[event.categoryNum].color,
          }}
        >
          {event.category}
        </div>
        <div>
          <Image src={TrashBinImage} alt="" />
        </div>
      </div>
      <div className="w-full py-[18px] text-[24px] font-semibold">
        {event.title}
      </div>
      <div className="text-[14px] text-[#868686]">
        {event.start && (
          <div className="flex justify-between py-[9px]">
            <div>⏰ 시간</div>
            <div>
              {moment(event.start).format("HH:mm")}
              {event.end && <> ~ {moment(event.end).format("HH:mm")}</>}
            </div>
          </div>
        )}
        {event.details.location && (
          <div className="flex justify-between py-[9px]">
            <div>🧭 위치</div>
            <div>{event.details.location}</div>
          </div>
        )}
        {event.details.person && (
          <div className="flex justify-between py-[9px]">
            <div>👯 사람</div>
            <div>{event.details.person}</div>
          </div>
        )}
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const DayModal = ({
  events,
  isOpen,
  selectedDate,
  onRequestClose,
}: DayModalProps) => {
  const [isAllVisible, setIsAllVisible] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleEvent>();
  const modalChange = (event: ScheduleEvent) => {
    setSelectedSchedule(event);
    setIsAllVisible(false);
  };

  if (!isOpen) return null;

  const sortedEvents = events.sort((a, b) => a.categoryNum - b.categoryNum);

  const groupedEvents = sortedEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, ScheduleEvent[]>);
  const ChatDate = moment(selectedDate).format("dddd");

  return (
    <div
      className="day-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onRequestClose}
    >
      <div
        className="bg-white w-[348px] h-[501px] px-[25px] rounded-[20px] pt-[9px] pb-[20px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isAllVisible ? (
          <>
            <div className="flex relative justify-center mt-[10px] mb-[21px]">
              <div className="rounded-[20px] w-[115px] h-[40px] bg-[#F2F0FF]  py-[10px] px-[2px] text-[15px] font-semibold text-center">
                {moment(selectedDate).format("DD일 dddd")}
              </div>
              <div className="absolute right-0 top-[8px]">
                <Image
                  src={CalendarImage}
                  alt={"no image"}
                  width={24}
                  height={24}
                />
              </div>
            </div>
            {Object.entries(groupedEvents).map(([category, events], index) => (
              <div key={index} className="mb-[33px]">
                <div>
                  <div
                    className="px-[12px] py-[6px] text-[15px] text-white inline-flex rounded-[8px] mb-[21px]"
                    style={{
                      backgroundColor:
                        categoryStyles[events[0].categoryNum].color,
                    }}
                  >
                    <span className="text-white">{category}</span>
                  </div>
                </div>
                {events.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-center mb-[16px] cursor-pointer"
                    onClick={() => {
                      modalChange(event);
                    }}
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          categoryStyles[event.categoryNum].color,
                      }}
                    ></span>
                    <p>{event.title}</p>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          selectedSchedule && (
            <EditSchedule
              event={selectedSchedule}
              setIsAllVisible={setIsAllVisible}
            />
          )
        )}
      </div>
      <FloatingNess message={`${ChatDate} 일정을 확인해볼까요?`} />
    </div>
  );
};

export default DayModal;
