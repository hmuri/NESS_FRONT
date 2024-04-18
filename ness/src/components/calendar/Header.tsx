import moment from "moment";
import { ToolbarProps, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

moment.locale("ko");
const Header: React.FC<ToolbarProps> = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [weekday, setWeekday] = useState("");

  useEffect(() => {
    const currentDate = moment(); // 현재 날짜 및 시간을 가져옵니다.
    setYear(currentDate.format("YYYY"));
    setMonth(currentDate.format("M월"));
    setDay(currentDate.format("D일"));
    setWeekday(currentDate.format("dddd")); // 요일
  }, []);

  return (
    <div className="z-3 fixed top-[50px] flex items-center justify-center w-full mb-[21.5px]">
      <div className="h-[41px] w-[145px] flex bg-white">
        <div className="text-white w-[48px] px-[12px] pb-[6px] pt-[4px] rounded-l-md calendar-header">
          <div className="text-[10px] text-center">{year}</div>
          <div className="text-[16px] leading-[110%] text-center">{month}</div>
        </div>
        <div className="flex items-center w-[97px] px-[8px] border border-t border-r border-b border-gray-200 rounded-r-md">
          <div className="text-[15px] text-center tracking-[0.3px]">
            {day} {weekday}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
