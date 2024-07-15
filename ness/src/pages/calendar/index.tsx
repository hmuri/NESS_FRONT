import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  DateCellWrapperProps,
  EventPropGetter,
  momentLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import axios from "axios";
import Header from "@/components/calendar/Header";
import Nav from "@/components/common/Nav";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from "universal-cookie";
import DayModal, { CategoryModal } from "@/components/calendar/DayModal";
import FloatingNess from "@/components/common/FloatingNess";
import axiosInstance from "@/module/axiosInstance";
import TrashBinImage from "../../../public/assets/trash-bin.png";
import Image from "next/image";
import { getCategoryList } from "@/module/apis/calendar";
import { Icon_bookmark } from "@/module/icons";

const localizer = momentLocalizer(moment);
const cookies = new Cookies();
const DnDCalendar = withDragAndDrop(BigCalendar);

interface IEditScheduleProps {
  event: ScheduleEvent | null;
}

interface Bookmark {
  id: number;
  contents: string;
  datetime: string;
  title: string;
  url: string;
}

interface BookmarkList {
  bookmarkList: Bookmark[];
}
export const EditSchedule = ({ event }: IEditScheduleProps) => {
  // 상태를 관리할 useState 훅 추가
  const [title, setTitle] = useState(event?.title);
  const [startTime, setStartTime] = useState(event?.start || "");
  const [endTime, setEndTime] = useState(event?.end || "");
  const [location, setLocation] = useState(event?.details.location || "");
  const [person, setPerson] = useState(event?.details.person || "");
  const [categoryList, setCategoryList] = useState<ICategoryList>();
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[] | undefined>();

  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >({
    categoryNum: 1,
    category: "🍀미분류",
    categoryColor: "#D9D9D9",
  });

  const getBookmark = async (
    id: number | undefined
  ): Promise<Bookmark[] | undefined> => {
    try {
      const response = await axiosInstance.get<BookmarkList>(
        `/bookmark?scheduleId=${id}`
      );
      return response.data.bookmarkList;
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

  function truncateHtmlText(htmlContent: string, maxLength: number): string {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent; // HTML 문자열을 DOM 요소로 변환
    let plainText = tempDiv.textContent || tempDiv.innerText || ""; // 텍스트 추출

    // 길이 제한
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "..."; // 지정된 길이까지 자르고 말줄임표 추가
    }
    return plainText;
  }

  useEffect(() => {
    const fetchBookmark = async () => {
      const data = await getBookmark(event?.id); // `event.id`가 정의되어 있다고 가정
      setBookmarks(data);
    };

    fetchBookmark();
  }, [event]);

  useEffect(() => {
    if (event)
      setSelectedCategory({
        categoryNum: event.categoryNum,
        category: event.category,
        categoryColor: event.categoryColor,
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategoryList();
      setCategoryList(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateSchedule = async () => {
      const payload = {
        id: event?.id,
        title: title,
        start: startTime,
        end: endTime || null,
        location: location,
        person: person,
        categoryNum: selectedCategory?.categoryNum,
        originalTime: event?.start.toISOString(),
      };

      try {
        const response = await axiosInstance.put(`/schedule`, payload);
        console.log("Update response:", response);
      } catch (error) {
        console.error("Failed to update schedule:", error);
      }
    };
    updateSchedule();
  }, [title, startTime, endTime, location, person, selectedCategory]);

  const deleteSchedule = async (id: number | undefined) => {
    try {
      if (!id) return;
      const response = await axiosInstance.delete(`/schedule?id=${id}`);
      window.location.reload();
      console.log("Update response:", response);
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };
  if (!event) return;

  return (
    <div className="w-full px-[7px] mt-[10px]">
      <div className="flex justify-between items-center cursor-pointer">
        <div className="w-[24px]"></div>
        <div
          className="rounded-[20px] w-[115px] h-[40px] py-[10px] px-[2px] text-[15px] font-semibold text-center"
          style={{
            backgroundColor: selectedCategory?.categoryColor,
          }}
          onClick={() => setCategoryModalOpen(true)}
        >
          {selectedCategory?.category}
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
        {Boolean(bookmarks?.length) && (
          <>
            <div className="flex items-center text-[20px] mt-[10px] text-[#000000] gap-[5px]">
              <Icon_bookmark width={30} height={30} color="#00C09E" /> 북마크
            </div>
            <div className="w-full bg-white shadow-lg rounded-lg p-4 mb-4">
              {bookmarks?.map((bookmark, index) => (
                <>
                  <div key={index} className="border-b mb-3">
                    <a
                      href={bookmark.url}
                      className="text-[15px] mb-2 text-[#7A64FF]"
                      dangerouslySetInnerHTML={{ __html: bookmark.title }}
                    />
                    <div className="flex justify-between items-center h-[24px]">
                      <p className="text-[12px] text-gray-500 mb-1">
                        {new Date(bookmark.datetime).toLocaleDateString()} -{" "}
                        {new URL(bookmark.url).hostname}
                      </p>
                    </div>
                    <div
                      className="text-gray-800 text-[13px] mb-2"
                      dangerouslySetInnerHTML={{
                        __html: truncateHtmlText(bookmark.contents, 50),
                      }}
                    />
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
      {categoryModalOpen && (
        <CategoryModal
          setSelectedCategory={setSelectedCategory}
          categoryList={categoryList}
          setCategoryModalOpen={setCategoryModalOpen}
        />
      )}
    </div>
  );
};

interface ScheduleEvent {
  id: number | undefined;
  title: string;
  start: Date;
  end?: Date;
  category: string;
  categoryColor: string;
  categoryNum: number;
  details: DetailList;
}

interface DetailList {
  id: number;
  location?: string | null;
  person: string | null;
}

interface ScheduleDetail {
  scheduleList: ScheduleEvent[];
}

const CalendarPage: React.FC<ScheduleDetail> = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null); // 로딩 에러 상태 추가
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [updatedEvent, setUpdatedEvent] = useState<ScheduleEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(
    null
  );

  const prevMonth = () => {
    setMonth(moment(month).subtract(1, "months").format("YYYY-MM"));
  };

  const eventStyleGetter = (
    event: any
  ): React.HTMLAttributes<HTMLDivElement> => {
    const customEvent = event as ScheduleEvent;
    return {
      style: {
        backgroundColor: customEvent.categoryColor,
        opacity: 0.8,
        borderRadius: "5px",
        color: "white",
      },
    };
  };

  const nextMonth = () => {
    setMonth(moment(month).add(1, "months").format("YYYY-MM"));
  };

  const handleSelectSlot = (date: Date) => {
    const eventsForSelectedDate = events.filter((event) => {
      const startOfDay = moment(event.start).startOf("day");
      const endOfDay = event.end
        ? moment(event.end).endOf("day")
        : moment(event.start).endOf("day");
      const eventDate = moment(date);
      return (
        eventDate.isSameOrAfter(startOfDay) &&
        eventDate.isSameOrBefore(endOfDay)
      );
    });

    setSelectedEvents(eventsForSelectedDate);
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const CustomDateCellWrapper: React.FC<DateCellWrapperProps> = ({
    children,
    value,
  }) => {
    // 해당 날짜의 이벤트 필터링
    const dateEvents = events.filter((event) => {
      return moment(event.start).isSame(value, "day");
    });

    // 3개를 초과하는 이벤트 수 계산
    const extraEventsCount = Math.max(0, dateEvents.length - 2);

    return (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {children}

        <div
          className="extra-events-info text-[8px] z-5 opacity-0"
          onClick={() => handleSelectSlot(value)}
        >
          {extraEventsCount} more
        </div>
      </div>
    );
  };

  const handleDragAndDrop = (args: any) => {
    const { event, start, end } = args;
    const updatedEvents = events.map((existingEvent) => {
      if (existingEvent.id === event.id) {
        const updated = { ...existingEvent, start, end };
        setUpdatedEvent(updated); // 변경된 이벤트 상태 업데이트
        return updated;
      }
      return existingEvent;
    });
    setEvents(updatedEvents);
  };

  const handleEventClick = (
    event: object,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => {
    // Cast the event object to your specific type (ScheduleEvent) inside the function
    const customEvent = event as ScheduleEvent;
    setEditModalIsOpen(true);
    setSelectedEvent(customEvent);

    console.log("Event clicked:", JSON.stringify(event));
  };

  const handleEditClose = () => {
    setEditModalIsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const updateEventDetails = async () => {
      console.log(JSON.stringify(updatedEvent));
      if (updatedEvent) {
        try {
          const payload = {
            id: updatedEvent.id,
            title: updatedEvent.title,
            start: updatedEvent.start.toISOString(),
            end: updatedEvent?.end?.toISOString(),
            location: updatedEvent.details.location,
            person: updatedEvent.details.person,
            categoryNum: updatedEvent.categoryNum,
            originalTime: updatedEvent.start.toISOString(),
          };
          const response = await axiosInstance.put(`/schedule`, payload);
          console.log("Update response:", response);
        } catch (error) {
          console.error("Failed to update event:", error);
        }
      }
    };

    updateEventDetails();
  }, [updatedEvent]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingError(null); // 요청 전 에러 상태 초기화
      try {
        const response = await axiosInstance.get(`/schedule?month=${month}`);
        const fetchedScheduleList = response.data.scheduleList;

        const mappedEvents = fetchedScheduleList?.map(
          (event: {
            id: number;
            start: string;
            end: string;
            category: string;
            details: DetailList;
          }) => ({
            ...event,
            id: event.id,
            start: new Date(event.start),
            end: event.end ? new Date(event.end) : new Date(event.start),
            category: event.category,
            details: event.details,
          })
        );
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Failed to fetch schedule", error);
        setLoadingError("Failed to load events. Please try again later."); // 에러 상태 업데이트
      }
    };

    fetchEvents();
  }, [month]);

  return (
    <>
      <div className="flex items-center">
        <div className="h-[550px] mt-[120px] mb-[100px] w-full">
          <DnDCalendar
            localizer={localizer}
            events={events}
            onEventDrop={handleDragAndDrop}
            onEventResize={handleDragAndDrop}
            startAccessor={(event: any) => new Date(event.start)}
            endAccessor={(event: any) => new Date(event.end || event.start)}
            style={{ height: "100%", width: "100%" }}
            selectable={true}
            onSelectSlot={(slotInfo: { start: Date }) =>
              handleSelectSlot(slotInfo.start)
            }
            date={month}
            components={{
              toolbar: (props) => (
                <Header
                  {...props}
                  onPrevMonth={prevMonth}
                  onNextMonth={nextMonth}
                />
              ),
              dateCellWrapper: CustomDateCellWrapper,
            }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventClick}
            onDrillDown={handleSelectSlot}
          />
          <Nav />
          {modalIsOpen && (
            <DayModal
              events={selectedEvents}
              isOpen={modalIsOpen}
              selectedDate={selectedDate}
              onRequestClose={() => setModalIsOpen(false)}
            />
          )}
          {editModalIsOpen && (
            <div
              className="day-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              onClick={handleEditClose}
            >
              <div
                className="bg-white w-[348px] h-[501px] px-[25px] rounded-[20px] pt-[9px] pb-[20px] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <EditSchedule event={selectedEvent} />
              </div>
            </div>
          )}
          {loadingError && <div className="alert-error">{loadingError}</div>}{" "}
          {/* 로딩 에러 메시지 표시 */}
        </div>
      </div>
      {!modalIsOpen && <FloatingNess message="오늘도 힘내세요!" />}
    </>
  );
};

export default CalendarPage;
