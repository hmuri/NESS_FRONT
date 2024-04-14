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
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null); // 로딩 에러 상태 추가
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    const extraEventsCount = Math.max(0, dateEvents.length - 3);

    return (
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        {children}
        {extraEventsCount > 0 && (
          <div
            className="extra-events-info"
            onClick={() => handleSelectSlot(value)}
          >
            +{extraEventsCount} more
          </div>
        )}
      </div>
    );
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
        onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo.start)}
        components={{
          toolbar: Header as React.ComponentType<any>,
          dateCellWrapper: CustomDateCellWrapper,
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
