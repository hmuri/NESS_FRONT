import moment from "moment";

const events = [
  {
    id: 3,
    title: "랩실에서 인공지능 모델 돌리기",
    start: new Date("2024-04-19T00:00:00Z"),
    end: null,
    category: "\uD83D\uDCB0 인턴",
    categoryNum: 1,
    details: {
      id: 1,
      location: "연구실",
      person: "혜승",
    },
  },
  {
    id: 8,
    title: "기타 연습하기",
    start: new Date("2024-04-19T00:00:00Z"),
    end: null,
    category: "\uD83C\uDFB8 기타",
    categoryNum: 3,
    details: {
      id: 5,
      location: null,
      person: null,
    },
  },

  {
    id: 4,
    title: "NEST.JS 공부하기",
    start: new Date("2024-04-19T00:00:00Z"),
    end: null,
    category: "\uD83D\uDCB0 인턴",
    categoryNum: 1,
    details: {
      id: 2,
      location: null,
      person: "민주",
    },
  },
  {
    id: 7,
    title: "토익 기출문제 풀기",
    start: new Date("2024-04-19T00:00:00Z"),
    end: new Date("2024-04-19T00:00:00Z"),
    category: "\uD83D\uDCD6 공부",
    categoryNum: 2,
    details: {
      id: 6,
      location: "학원",
      person: null,
    },
  },
  {
    id: 5,
    title: "정확도 계산하기",
    start: new Date("2024-04-19T00:00:00Z"),
    end: null,
    category: "\uD83D\uDCB0 인턴",
    categoryNum: 1,
    details: {
      id: 3,
      location: null,
      person: "채원",
    },
  },

  {
    id: 6,
    title: "백엔드 공부하기",
    start: new Date("2024-04-19T00:00:00Z"),
    end: null,
    category: "\uD83D\uDCD6 공부",
    categoryNum: 2,
    details: {
      id: 4,
      location: "학교",
      person: null,
    },
  },
];

interface ScheduleEvent {
  id: number;
  title: string;
  start: Date | null;
  end?: Date | null;
  category: string;
  categoryNum: number;
  details: DetailList;
}

interface DetailList {
  id: number;
  location?: string | null;
  person: string | null;
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
const TodayTodo = () => {
  return (
    <div className="rounded-[10px] remind-box bg-white w-[253px] h-[178px] px-[15px] overflow-auto py-[20px]">
      <div>
        {events.map((event, idx) => (
          <div key={idx} className="mb-2">
            <div className="flex items-center">
              <span className="h-1 w-1 rounded-full bg-black mr-2"></span>
              <p className="text-[13px] font-semibold">{event.title}</p>
            </div>
            {event.category && (
              <div
                className="inline-block text-[10px] py-[2px] px-[6px] mr-2 ml-2 bg-[#D9D9D9] rounded-[4px]"
                style={{
                  color: categoryStyles[event.categoryNum].color,
                }}
              >
                <span>{event.category}</span>
              </div>
            )}
            {event.details.person ? (
              <div className="inline-block text-[10px] py-[2px] px-[9px] mr-2 bg-[#D9D9D9] rounded-[4px]">
                <span>{event.details.person}</span>
              </div>
            ) : (
              <div className="inline-block text-[10px] py-[2px] px-[9px] mr-2 bg-[#FFDCC9] rounded-[4px]">
                <span>사람</span>
              </div>
            )}
            {event.details.location ? (
              <div className="inline-block text-[10px] py-[2px] px-[9px] mr-2 bg-[#D9D9D9] rounded-[4px]">
                <span>{event.details.location}</span>
              </div>
            ) : (
              <div className="inline-block text-[10px] py-[2px] px-[9px] mr-2 bg-[#FFDCC9] rounded-[4px]">
                <span>위치</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTodo;
