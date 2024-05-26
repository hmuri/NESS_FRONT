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
    const response = await axiosInstance.put(`/profile`, { payload });
    return response.status === 200;
  } catch (error) {
    console.error("Failed to update persona:", error);
  }
};
