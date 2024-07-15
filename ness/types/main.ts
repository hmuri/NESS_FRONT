interface IMainData {
  activityList: IActivity[];
  scheduleList: ScheduleItem[];
  recommend: string;
}

interface IActivity {
  activity: string;
  imageTag: string;
}

interface ScheduleDetails {
  id?: number;
  location?: string | null;
  person: string | null;
}

interface ScheduleItem {
  id: number;
  title: string;
  start: string;
  end: string;
  category: string;
  categoryNum: number;
  categoryColor: string;
  details: ScheduleDetails;
  nessComment: string;
}

interface ScheduleListProps {
  schedules: ScheduleItem[];
}
