import moment from "moment";

interface DayModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedDate: Date | null;
}

const DayModal = ({ isOpen, onRequestClose, selectedDate }: DayModalProps) => {
  if (!isOpen) return null;
  console.log(isOpen);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onRequestClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">Selected Date</h2>
        <p className="mt-2">
          {selectedDate
            ? moment(selectedDate).format("YYYY-MM-DD")
            : "No date selected"}
        </p>
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
