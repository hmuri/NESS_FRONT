import moment from "moment";

interface ScheduleEvent {
  title: string;
  start: Date;
  end?: Date;
}

interface DayModalProps {
  events: ScheduleEvent[];
  isOpen: boolean;
  onRequestClose: () => void;
}

const DayModal = ({ events, isOpen, onRequestClose }: DayModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={onRequestClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">Selected Date</h2>
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
