import moment from "moment";
import { ToolbarProps, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";
import { useEffect, useState } from "react";

moment.locale("ko");
const Header: React.FC<ToolbarProps> = ({ label }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    console.log("label" + label);
    console.log("formattedDate" + formattedDate);
    setFormattedDate(moment(label).format("YYYY년 M월"));
  }, [label]);
  return (
    <div className="mt-[72px] flex items-center justify-center w-full mb-[21.5px]">
      <div className="h-[41px] w-[142px] flex ">
        <div className="w-[48px] px-[12px] pb-[6px] pt-[4px] rounded-l-md bg-gradient-to-b from-[#7A64FF] to-[#7A64FF33]"></div>
        <div className="w-[94px] px-[12px]border border-t border-r border-b border-gray-200 rounded-r-md"></div>
      </div>
    </div>
  );
};

export default Header;
