import axiosInstance from "@/module/axiosInstance";

export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await axiosInstance.get(`/profile`);
    console.log("Data:", response.data);
    return response.data as Profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // 에러가 발생했을 때 기본값 반환 또는 예외 처리
    throw error; // 예외를 다시 던지거나, 기본값 반환 등
  }
};

export const testEmail = async () => {
  try {
    const response = await axiosInstance.post(`/email/test`);
    console.log("Status Code:", response.status);
    return response.status === 200;
  } catch (error) {
    console.error("Failed to test email:", error);
    return false;
  }
};

export const patchActivateEmail = async (isActive: boolean) => {
  try {
    const response = await axiosInstance.patch(`/email?isActive=${isActive}`);
    console.log("Status Code:", response.status);
    return response.status === 200;
  } catch (error) {
    console.error("Failed to test email:", error);
    return false;
  }
};

export const updatePersona = async (persona: string) => {
  try {
    const response = await axiosInstance.patch(`/profile/nickname`, {
      persona,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Failed to update persona:", error);
  }
};
