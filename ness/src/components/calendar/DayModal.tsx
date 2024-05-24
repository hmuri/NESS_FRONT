import moment from "moment";
import FloatingNess from "../common/FloatingNess";
import CalendarImage from "../../../public/assets/tabler_calendar-plus.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import TrashBinImage from "../../../public/assets/trash-bin.png";
import LeftArrowImage from "../../../public/assets/left_arrow.png";
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
  setUpdatedEvent: any;
}
const EditSchedule = ({
  event,
  setIsAllVisible,
  selectedDate,
  setUpdatedEvent,
}: IEditScheduleProps) => {
  // 상태를 관리할 useState 훅 추가
  const [title, setTitle] = useState(event.title);
  const [startTime, setStartTime] = useState(event.start || "");
  const [endTime, setEndTime] = useState(event.end || "");
  const [location, setLocation] = useState(event.details.location || "");
  const [person, setPerson] = useState(event.details.person || "");

  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  useEffect(() => {
    const updateSchedule = async () => {
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
        setUpdatedEvent(response.data?.scheduleList);
      } catch (error) {
        console.error("Failed to update schedule:", error);
      }
    };
    updateSchedule();
  }, [title, startTime, endTime, location, person]);

  const deleteSchedule = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/schedule?id=${id}`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      setUpdatedEvent(response.data?.scheduleList);
      setIsAllVisible(true);
      console.log("Update response:", response);
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

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
        <div onClick={() => deleteSchedule(event.id)}>
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
              type="datetime-local"
              className="text-right w-full ml-[0px]"
              value={moment(startTime).format("YYYY-MM-DDTHH:mm")} // datetime-local 형식에 맞게 값을 포맷합니다
              onChange={(e) => {
                setStartTime(moment(e.target.value).toDate());
              }}
            />
            <div>
              ~ {"  "}
              <input
                type="datetime-local"
                className="text-right w-[200px]"
                value={
                  endTime ? moment(endTime).format("YYYY-MM-DDTHH:mm") : ""
                }
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
  setUpdatedEvent: any;
}

const AddSchedule = ({
  setUpdatedEvent,
  setIsAllVisible,
  selectedDate,
}: IAddcheduleProps) => {
  // 상태를 관리할 useState 훅 추가
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(
    moment(selectedDate).toDate() || ""
  );
  const [endTime, setEndTime] = useState(
    moment(selectedDate).add(1, "hours").toDate() || ""
  );
  const [location, setLocation] = useState("");
  const [person, setPerson] = useState("");

  const cookies = new Cookies();

  useEffect(() => {
    if (!endTime) {
      setEndTime(moment(startTime).add(1, "hours").toDate());
    }
  }, [startTime]);

  const updateSchedule = async () => {
    const accessToken = cookies.get("accessToken");
    const payload = {
      title: title,
      start: startTime,
      end: endTime,
      location: location,
      person: person,
      categoryNum: 6,
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
      console.log("scheduleList" + response.data?.scheduleList);
      setIsAllVisible(true);
      setUpdatedEvent(response.data?.scheduleList);
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            onClick={() => {
              updateSchedule();
            }}
          >
            <path
              d="M8.99999 16.3164L5.70668 13.0231C5.47282 12.7892 5.15563 12.6578 4.8249 12.6578C4.49417 12.6578 4.17699 12.7892 3.94312 13.0231C3.70926 13.2569 3.57788 13.5741 3.57788 13.9048C3.57788 14.0686 3.61014 14.2308 3.6728 14.382C3.73547 14.5333 3.82733 14.6708 3.94312 14.7866L8.12313 18.9666C8.61076 19.4542 9.39905 19.4542 9.88668 18.9666L20.4667 8.38661C20.7005 8.15275 20.8319 7.83556 20.8319 7.50483C20.8319 7.1741 20.7005 6.85692 20.4667 6.62306C20.2328 6.38919 19.9156 6.25781 19.5849 6.25781C19.2542 6.25781 18.937 6.3892 18.7031 6.62306L8.99999 16.3164Z"
              fill="#A7A7A7"
              stroke="#A7A7A7"
              stroke-width="0.5"
            />
          </svg>
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
              type="datetime-local"
              className="text-right w-full ml-[12px]"
              value={moment(startTime).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => {
                setStartTime(
                  moment(e.target.value, "YYYY-MM-DDTHH:mm").toDate()
                );
              }}
            />
            <div>
              ~ {"  "}
              <input
                type="datetime-local"
                className="text-right w-full ml-[12px]"
                value={
                  endTime ? moment(endTime).format("YYYY-MM-DDTHH:mm") : ""
                }
                onChange={(e) => {
                  setEndTime(
                    moment(e.target.value, "YYYY-MM-DDTHH:mm").toDate()
                  );
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
              placeholder="입력"
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
              placeholder="입력"
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
  const [updatedEvent, setUpdatedEvent] = useState<ScheduleEvent[]>(events);
  const modalChange = (event?: ScheduleEvent) => {
    if (event) {
      setSelectedSchedule(event);
    } else {
      setSelectedSchedule(undefined);
    }
    setIsAllVisible(false);
  };

  if (!isOpen) return null;

  const sortedEvents = updatedEvent.sort(
    (a, b) => a.categoryNum - b.categoryNum
  );

  const groupedEvents = sortedEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, ScheduleEvent[]>);
  const ChatDate = moment(selectedDate).format("dddd");

  const handleClose = () => {
    onRequestClose;
    window.location.reload();
  };

  return (
    <div
      className="day-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
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
            setUpdatedEvent={setUpdatedEvent}
          />
        ) : (
          <AddSchedule
            setIsAllVisible={setIsAllVisible}
            selectedDate={selectedDate}
            setUpdatedEvent={setUpdatedEvent}
          ></AddSchedule>
        )}
      </div>
      <FloatingNess message={`${ChatDate} 일정을 확인해볼까요?`} />
    </div>
  );
};

export default DayModal;
