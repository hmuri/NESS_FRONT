import axiosInstance from "@/module/axiosInstance";

export const getReportTags = async (): Promise<ReportTagList> => {
  try {
    const response = await axiosInstance.get(`/report/tag`);
    console.log("Data:", response.data);
    return response.data as ReportTagList;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // 에러가 발생했을 때 기본값 반환 또는 예외 처리
    throw error; // 예외를 다시 던지거나, 기본값 반환 등
  }
};

export const getReportMemories = async (): Promise<ReportMemoryList> => {
  try {
    const response = await axiosInstance.get(`/report/memory`);
    console.log("Data:", response.data);
    return response.data as ReportMemoryList;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // 에러가 발생했을 때 기본값 반환 또는 예외 처리
    throw error; // 예외를 다시 던지거나, 기본값 반환 등
  }
};
