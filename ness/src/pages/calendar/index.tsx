import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  DateCellWrapperProps,
  momentLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import axios from "axios";
import Header from "@/components/calendar/Header";
import Nav from "@/components/common/Nav";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from "universal-cookie";
import DayModal from "@/components/calendar/DayModal";
import FloatingNess from "@/components/common/FloatingNess";

const localizer = momentLocalizer(moment);
const cookies = new Cookies();
const DnDCalendar = withDragAndDrop(BigCalendar);

interface ScheduleEvent {
  id: number;
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
  const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null); // 로딩 에러 상태 추가
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const prevMonth = () => {
    setMonth(moment(month).subtract(1, "months").format("YYYY-MM"));
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
        {extraEventsCount > 0 && (
          <div
            className="extra-events-info text-[8px] z-5"
            onClick={() => handleSelectSlot(value)}
          >
            {extraEventsCount} more
          </div>
        )}
      </div>
    );
  };

  const handleDragAndDrop = (args: any) => {
    const { event, start, end } = args;
    const updatedEvents = events.map((existingEvent) => {
      if (existingEvent.id === event.id) {
        return { ...existingEvent, start, end };
      }
      return existingEvent;
    });
    setEvents(updatedEvents);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("currentMonth", month);
      const accessToken = cookies.get("accessToken");
      console.log("here" + process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL);
      setLoadingError(null); // 요청 전 에러 상태 초기화
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/schedule?month=${month}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
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
            }}
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
          {loadingError && <div className="alert-error">{loadingError}</div>}{" "}
          {/* 로딩 에러 메시지 표시 */}
        </div>
      </div>
      {!modalIsOpen && <FloatingNess message="4월엔 일정이 많으시네요!" />}
    </>
  );
};

export default CalendarPage;
