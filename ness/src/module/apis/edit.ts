import axios from "axios";
import axiosInstance from "../axiosInstance";

export const getPreSignedUrl = async (filename: string) => {
  try {
    const response = await axiosInstance.get(
      `/s3/posturl?filename=${filename}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update persona:", error);
  }
};

export const uploadFileToS3 = async (preSignedUrl: string, file: File) => {
  try {
    const response = await axios.put(preSignedUrl, file, {
      headers: {
        "Content-Type": "image/png",
        "Content-Length": file.size,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Failed to update persona:", error);
    return false;
  }
};

export const updateProfile = async (imageUrl: string, nickname: string) => {
  const payload = { nickname, imageUrl };
  try {
    const response = await axiosInstance.put(`/profile`, payload);
    return response.status === 200;
  } catch (error) {
    console.error("Failed to update persona:", error);
  }
};

export const addCategory = async (category: string, categoryColor: string) => {
  const payload = { category, categoryColor };
  try {
    const response = await axiosInstance.post(`/category`, payload);
    if (response.status !== 200) {
      throw new Error(response.data.message || "Unknown error occurred");
    }
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios 에러인지 확인
      const message = error.response?.data.message || "Failed to add category";
      console.error("Failed to add category:", message);
      throw new Error(message);
    } else if (error instanceof Error) {
      // 일반적인 에러
      console.error("Error:", error.message);
      throw error;
    } else {
      // 알 수 없는 타입의 에러
      console.error("An unexpected error occurred");
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateCategory = async (
  category: string,
  categoryColor: string,
  id: number | undefined
) => {
  const payload = { category, categoryColor, id };
  try {
    const response = await axiosInstance.put(`/category`, payload);
    return response;
  } catch (error) {
    console.error("Failed to update persona:", error);
  }
};

export const deleteCategory = async (id: number | undefined) => {
  try {
    const response = await axiosInstance.delete(`/category?categoryId=${id}`);
    return response;
  } catch (error) {
    console.error("Failed to update persona:", error);
  }
};
