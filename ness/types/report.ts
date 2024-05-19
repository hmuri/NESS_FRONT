interface ReportTag {
  id: number;
  createdAt: string;
  title: string;
  info: string;
}

interface ReportTagList {
  reportTagList: ReportTag[];
}

interface ReportMemory {
  id: number;
  memory: string;
  createdDate: string;
}

interface ReportMemoryList {
  reportMemoryList: ReportMemory[];
}
