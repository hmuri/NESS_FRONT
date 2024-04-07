import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  SlotInfo,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import Header from "@/components/calendar/Header";
import Nav from "@/components/common/Nav";
import "react-big-calendar/lib/css/react-big-calendar.css"; // BigCalendar 스타일
import Cookies from "js-cookie";
import DayModal from "@/components/calendar/DayModal";

const localizer = momentLocalizer(moment);

interface ScheduleEvent {
  title: string;
  start: Date;
  end?: Date;
}

interface ScheduleDetail {
  scheduleList: ScheduleEvent[];
}

const CalendarPage: React.FC<ScheduleDetail> = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [month, setMonth] = useState(moment().format("YYYY-MM")); // 현재 월을 기본값으로 사용
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    console.log("here");
    setSelectedDate(slotInfo.start);
    setModalIsOpen(true); // 날짜/시간 슬롯을 클릭했을 때 모달 열기
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const accessToken = Cookies.get("accessToken");
      console.log("accessToken" + accessToken);
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
        console.log(JSON.stringify(fetchedScheduleList));

        // 서버로부터 받은 스케줄 리스트를 이용해 이벤트 목록을 설정
        const mappedEvents = fetchedScheduleList.map(
          (event: { start: string; end: string }) => ({
            ...event,
            start: new Date(event.start),
            end: event.end ? new Date(event.end) : new Date(event.start),
          })
        );
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Failed to fetch schedule", error);
      }
    };

    fetchEvents();
  }, [month]);

  return (
    <div className="h-[800px] fixed bottom-[90px] w-full">
      <BigCalendar
        onSelectSlot={handleSelectSlot}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
        selectable={true}
        components={{
          toolbar: Header as React.ComponentType<any>, // 타입스크립트 타입 캐스팅
        }}
      />
      {modalIsOpen && (
        <DayModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          selectedDate={selectedDate}
        />
      )}
      <Nav />
    </div>
  );
};

export default CalendarPage;
