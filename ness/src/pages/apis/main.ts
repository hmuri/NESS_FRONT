import axiosInstance from "@/module/axiosInstance";

export const fetchRecommendMessage = async (): Promise<
  IMainData | undefined
> => {
  try {
    const response = await axiosInstance.get("/main");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch chat messages", error);
  }
};
