import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Header from "@/components/calendar/Header";
import Nav from "@/components/common/Nav";
import "react-big-calendar/lib/css/react-big-calendar.css"; // BigCalendar 스타일

const localizer = momentLocalizer(moment);

interface ScheduleEvent {
  title: string;
  start: Date;
  end?: Date;
}

interface ScheduleDetail {
  scheduleList: ScheduleEvent[];
}

const CalendarPage: React.FC<ScheduleDetail> = ({ scheduleList }) => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    // 서버로부터 받은 스케줄 리스트를 이용해 이벤트 목록을 설정
    const mappedEvents = scheduleList.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : new Date(event.start),
    }));
    setEvents(mappedEvents);
  }, [scheduleList]);

  return (
    <div className="h-[800px] fixed bottom-[90px] w-full">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
        components={{
          toolbar: Header as React.ComponentType<any>, // 타입스크립트 타입 캐스팅
        }}
      />
      <Nav />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, query } = context;
  const cookies = req.headers.cookie;
  let accessToken = "";

  // 쿠키 문자열을 파싱하여 accessToken 추출
  if (cookies) {
    const cookieObj = Object.fromEntries(
      cookies.split(";").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key.trim(), decodeURIComponent(value)];
      })
    );
    accessToken = cookieObj.accessToken || "";
  }
  const month = query.month || moment().format("YYYY-MM"); // 현재 월을 기본값으로 사용

  try {
    const response = await axios.get(
      `http://13.125.106.110:8080/schedule/dev?month=${month}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    const scheduleList = response.data.scheduleList;

    return {
      props: {
        scheduleList,
      },
    };
  } catch (error) {
    console.error("Failed to fetch schedule", error);
    return {
      props: {
        scheduleList: [],
      },
    };
  }
};

export default CalendarPage;
