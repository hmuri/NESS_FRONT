import moment from "moment";
import { ToolbarProps, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";
import { useEffect, useState } from "react";
import LeftArrow from "../../../public/assets/left_arrow.png";
import RightArrow from "../../../public/assets/right_arrow.png";
import Image from "next/image";

const localizer = momentLocalizer(moment);

moment.locale("ko");
const Header: React.FC<
  ToolbarProps & { onPrevMonth: () => void; onNextMonth: () => void }
> = ({ onPrevMonth, onNextMonth, date }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [weekday, setWeekday] = useState("");

  useEffect(() => {
    const currentDate = moment(date); // 캘린더의 현재 보고 있는 날짜
    setYear(currentDate.format("YYYY"));
    setMonth(currentDate.format("M월"));
    setDay(currentDate.format("D일"));
    setWeekday(currentDate.format("dddd")); // 요일
  }, [date]);

  return (
    <div className="z-3 fixed top-[50px] flex items-center justify-between w-full mb-[21.5px] px-[30px]">
      <button onClick={onPrevMonth}>
        <Image src={LeftArrow} alt="" />
      </button>
      <div className="h-[41px] flex bg-white">
        <div className="text-white font-semibold w-[100px] px-[12px] pb-[6px] pt-[4px] rounded-md calendar-header">
          <div className="text-[10px] text-center">{year}</div>
          <div className="text-[16px] leading-[110%] text-center">{month}</div>
        </div>
      </div>
      <button onClick={onNextMonth}>
        <Image src={RightArrow} alt="" />
      </button>
    </div>
  );
};

export default Header;
