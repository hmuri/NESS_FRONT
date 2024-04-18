import moment from "moment";
import FloatingNess from "../common/FloatingNess";

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

interface DayModalProps {
  events: ScheduleEvent[];
  isOpen: boolean;
  selectedDate: Date | null;
  onRequestClose: () => void;
}

interface CategoryStyle {
  [key: number]: { name: string; color: string };
}

const categoryStyles: CategoryStyle = {
  1: { name: "인턴", color: "#7A64FF" },
  2: { name: "공부", color: "#00C09E" },
  3: { name: "기타", color: "#454545" },
  5: { name: "개발", color: "#ffc0cb" },
};

const DayModal = ({
  events,
  isOpen,
  selectedDate,
  onRequestClose,
}: DayModalProps) => {
  if (!isOpen) return null;

  const sortedEvents = events.sort((a, b) => a.categoryNum - b.categoryNum);

  const groupedEvents = sortedEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, ScheduleEvent[]>);
  const ChatDate = moment(selectedDate).format("dddd");

  return (
    <div
      className="day-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onRequestClose}
    >
      <div
        className="bg-white w-[348px] h-[501px] px-[25px] rounded-[20px] pt-[9px] pb-[20px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mt-[10px] mb-[21px]">
          <div className="rounded-[20px] w-[115px] h-[40px] bg-[#F2F0FF]  py-[10px] px-[2px] text-[15px] font-semibold text-center">
            {moment(selectedDate).format("DD일 dddd")}
          </div>
        </div>
        {Object.entries(groupedEvents).map(([category, events], index) => (
          <div key={index} className="mb-[33px]">
            <div>
              <div
                className="px-[12px] py-[6px] text-[15px] text-white inline-flex rounded-[8px] mb-[21px]"
                style={{
                  backgroundColor: categoryStyles[events[0].categoryNum].color,
                }}
              >
                {category}
              </div>
            </div>
            {events.map((event, idx) => (
              <div key={idx} className="flex items-center mb-[16px]">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor: categoryStyles[event.categoryNum].color,
                  }}
                ></span>
                <p>{event.title}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <FloatingNess message={`${ChatDate} 일정을 확인해볼까요?`} />
    </div>
  );
};

export default DayModal;
