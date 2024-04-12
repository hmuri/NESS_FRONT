import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  DateCellWrapperProps,
  SlotInfo,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import Header from "@/components/calendar/Header";
import Nav from "@/components/common/Nav";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from "universal-cookie";
import DayModal from "@/components/calendar/DayModal";

const localizer = momentLocalizer(moment);
const cookies = new Cookies();

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
  person: string | null;
}

interface ScheduleDetail {
  scheduleList: ScheduleEvent[];
}

const CalendarPage: React.FC<ScheduleDetail> = () => {
  const CustomDateCellWrapper: React.FC<DateCellWrapperProps> = ({
    children,
    value,
  }) => {
    const handleMoreClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation(); // 이벤트 버블링 방지
      setModalIsOpen(true); // 모달 열기
    };

    return <div onClick={handleMoreClick}>{children}</div>;
  };

  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null); // 로딩 에러 상태 추가
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    try {
      const eventsForSelectedDate = events.filter((event) => {
        const startOfDay = moment(event.start).startOf("day");
        const endOfDay = moment(event.end).endOf("day");
        const eventStart = moment(slotInfo.start);
        return (
          eventStart.isSameOrAfter(startOfDay) &&
          eventStart.isSameOrBefore(endOfDay)
        );
      });

      setSelectedEvents(eventsForSelectedDate);
      setSelectedDate(slotInfo.start);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error handling slot selection", error);
      // 여기에 사용자에게 에러가 발생했다는 것을 알리는 로직을 추가할 수 있습니다.
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const accessToken = cookies.get("accessToken");
      setLoadingError(null); // 요청 전 에러 상태 초기화
      try {
        const response = await axios.get(
          `http://13.125.106.110:8080/schedule?month=${month}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        const fetchedScheduleList = response.data.scheduleList;

        const mappedEvents = fetchedScheduleList?.map(
          (event: {
            start: string;
            end: string;
            category: string;
            details: DetailList;
          }) => ({
            ...event,
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
    <div className="h-[800px] fixed bottom-[90px] w-full">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        components={{
          toolbar: Header as React.ComponentType<any>,
          dateCellWrapper:
            CustomDateCellWrapper as React.ComponentType<DateCellWrapperProps>,
        }}
      />
      {modalIsOpen && (
        <DayModal
          events={selectedEvents}
          isOpen={modalIsOpen}
          selectedDate={selectedDate}
          onRequestClose={() => setModalIsOpen(false)}
        />
      )}
      {loadingError && <div className="alert-error">{loadingError}</div>}{" "}
      {/* 로딩 에러 메시지 표시 */}
      <Nav />
    </div>
  );
};

export default CalendarPage;
