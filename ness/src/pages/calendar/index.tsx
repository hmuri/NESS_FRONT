import React, { useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
  NavigateAction,
  ToolbarProps,
} from "react-big-calendar";
import moment from "moment";
import Header from "@/components/calendar/Header";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const myEventsList: Event[] = [
  {
    title: "Long Event",
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
  },
];

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const handleNavigate = (
    newDate: Date,
    view: View,
    action: NavigateAction
  ) => {
    switch (action) {
      case "NEXT":
        setDate(moment(newDate).add(1, "month").toDate());
        break;
      case "PREV":
        setDate(moment(newDate).subtract(1, "month").toDate());
        break;
      case "TODAY":
        setDate(new Date());
        break;
    }
  };

  return (
    <div className="h-[800px] fixed bottom-[90px] w-full">
      <BigCalendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        date={date}
        components={{
          toolbar: Header as React.ComponentType<ToolbarProps>, // 타입스크립트 타입 캐스팅
        }}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default Calendar;
