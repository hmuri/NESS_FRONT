import moment from "moment";

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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={onRequestClose}
    >
      <div
        className="bg-white w-[348px] h-[501px] px-[25px] rounded-[20px] pt-[9px] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center my-[33px]">
          <div className="rounded-[20px] w-[115px] h-[40px] bg-[#F2F0FF]  py-[10px] px-[2px] text-[15px] font-semibold text-center">
            {moment(selectedDate).format("DD일 dddd")}
          </div>
        </div>
        {events.map((event, index) => (
          <div key={index}>
            <h3>{event.title}</h3>
            <p>Start: {event.start.toString()}</p>
            <p>End: {event.end ? event.end.toString() : "Not specified"}</p>
          </div>
        ))}
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DayModal;
