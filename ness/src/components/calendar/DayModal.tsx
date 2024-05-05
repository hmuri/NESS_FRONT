import moment from "moment";
import FloatingNess from "../common/FloatingNess";
import CalendarImage from "../../assets/tabler_calendar-plus.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import TrashBinImage from "../../assets/trash-bin.png";
import LeftArrowImage from "../../assets/left_arrow.png";
import axios from "axios";
import Cookies from "universal-cookie";

interface ScheduleEvent {
  id: number;
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
  6: { name: "미분류", color: "#d9d9d9" },
};

interface IEditScheduleProps {
  event: ScheduleEvent;
  setIsAllVisible: any;
  selectedDate: Date | null;
}
const EditSchedule = ({
  event,
  setIsAllVisible,
  selectedDate,
}: IEditScheduleProps) => {
  // 상태를 관리할 useState 훅 추가
  const [title, setTitle] = useState(event.title);
  const [startTime, setStartTime] = useState(event.start || "");
  const [endTime, setEndTime] = useState(event.end || "");
  const [location, setLocation] = useState(event.details.location || "");
  const [person, setPerson] = useState(event.details.person || "");

  const cookies = new Cookies();

  useEffect(() => {
    const updateSchedule = async () => {
      const accessToken = cookies.get("accessToken");
      const payload = {
        id: event.id,
        title: title,
        start: startTime,
        end: endTime || null,
        location: location,
        person: person,
        categoryNum: event.categoryNum,
      };

      try {
        const response = await axios.put(
          `${
            process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL
          }/schedule?day=${moment(selectedDate).format("YYYY-MM-DD")}`,
          payload,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        console.log("Update response:", response);
      } catch (error) {
        console.error("Failed to update schedule:", error);
      }
    };
    updateSchedule();
  }, [title, startTime, endTime, location, person]);

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
        <input
          type="text"
          className="w-full"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="text-[14px] text-[#868686]">
        <div className="flex justify-between py-[9px]">
          <div className="w-[70px]">⏰ 시간</div>
          <div className=" flex flex-col justify-end">
            <input
              type="time"
              className="text-right w-full ml-[12px]"
              value={moment(startTime).format("HH:mm")}
              onChange={(e) => {
                setStartTime(moment(e.target.value, "HH:mm").toDate());
              }}
            />
            <div>
              ~ {"  "}
              <input
                type="time"
                className="text-right w-full"
                value={endTime ? moment(endTime).format("HH:mm") : ""}
                onChange={(e) => {
                  setEndTime(moment(e.target.value, "HH:mm").toDate());
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between py-[9px]">
          <div>🧭 위치</div>
          <div>
            <input
              type="text"
              className="w-full text-right"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-between py-[9px]">
          <div>👯 사람</div>
          <div>
            <input
              type="text"
              className="w-full text-right"
              value={person}
              onChange={(e) => {
                setPerson(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IAddcheduleProps {
  setIsAllVisible: any;
  selectedDate: Date | null;
}

const AddSchedule = ({ setIsAllVisible, selectedDate }: IAddcheduleProps) => {
  // 상태를 관리할 useState 훅 추가
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(moment().toDate() || "");
  const [endTime, setEndTime] = useState(
    moment().add(1, "hours").toDate() || ""
  );
  const [location, setLocation] = useState("");
  const [person, setPerson] = useState("");

  const cookies = new Cookies();

  useEffect(() => {
    if (!endTime) {
      setEndTime(moment(startTime).add(1, "hours").toDate());
    }
  }, [startTime]);

  useEffect(() => {
    const updateSchedule = async () => {
      const accessToken = cookies.get("accessToken");
      const payload = {
        title: title,
        start: startTime,
        end: endTime,
        location: location,
        person: person,
      };

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/schedule`,
          payload,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        console.log("Update response:", response);
      } catch (error) {
        console.error("Failed to update schedule:", error);
      }
    };
    updateSchedule();
  }, [title, startTime, endTime, location, person]);

  return (
    <div className="w-full px-[7px] mt-[10px]">
      <div className="flex justify-between items-center cursor-pointer">
        <div onClick={() => setIsAllVisible(true)}>
          <Image src={LeftArrowImage} alt="" />
        </div>
        {/* <div
          className="rounded-[20px] w-[115px] h-[40px] py-[10px] px-[2px] text-[15px] font-semibold text-center"
          style={{
            backgroundColor: categoryStyles[event.categoryNum].color,
          }}
        >
          {event.category}
        </div> */}
        <div>
          <Image src={TrashBinImage} alt="" />
        </div>
      </div>
      <div className="w-full py-[18px] text-[24px] font-semibold">
        <input
          type="text"
          className="w-full"
          placeholder="제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="text-[14px] text-[#868686]">
        <div className="flex justify-between py-[9px]">
          <div className="w-[70px]">⏰ 시간</div>
          <div className=" flex flex-col justify-end">
            <input
              type="time"
              className="text-right w-full ml-[12px]"
              value={moment(startTime).format("HH:mm")}
              onChange={(e) => {
                setStartTime(moment(e.target.value, "HH:mm").toDate());
              }}
            />
            <div>
              ~ {"  "}
              <input
                type="time"
                className="text-right w-full"
                value={endTime ? moment(endTime).format("HH:mm") : ""}
                onChange={(e) => {
                  setEndTime(moment(e.target.value, "HH:mm").toDate());
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between py-[9px]">
          <div>🧭 위치</div>
          <div>
            <input
              type="text"
              placeholder="위치"
              className="w-full text-right"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-between py-[9px]">
          <div>👯 사람</div>
          <div>
            <input
              type="text"
              placeholder="사람"
              className="w-full text-right"
              value={person}
              onChange={(e) => {
                setPerson(e.target.value);
              }}
            />
          </div>
        </div>
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
  const modalChange = (event?: ScheduleEvent) => {
    if (event) {
      setSelectedSchedule(event);
    }
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
              <div
                className="absolute right-0 top-[8px]"
                onClick={() => {
                  modalChange();
                }}
              >
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
        ) : selectedSchedule ? (
          <EditSchedule
            event={selectedSchedule}
            setIsAllVisible={setIsAllVisible}
            selectedDate={selectedDate}
          />
        ) : (
          <AddSchedule
            setIsAllVisible={setIsAllVisible}
            selectedDate={selectedDate}
          ></AddSchedule>
        )}
      </div>
      <FloatingNess message={`${ChatDate} 일정을 확인해볼까요?`} />
    </div>
  );
};

export default DayModal;
