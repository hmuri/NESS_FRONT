interface IMainData {
  recommendId: number;
  recommend: string;
  scheduleId?: number;
  title?: string;
  start?: string;
  end?: string | null;
  category?: string;
  categoryNum?: number;
  details?: ScheduleDetails;
}

interface ScheduleDetails {
  location: string;
  person: string;
}
