import axiosInstance from "../axiosInstance";

export const getCategoryList = async () => {
  try {
    const response = await axiosInstance.get("category");
    return response.data;
  } catch (error) {
    console.error("Failed to update persona:", error);
  }
};
