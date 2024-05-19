import axios from "axios";
import Cookies from "universal-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const cookies = new Cookies();

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = cookies.get("accessToken");

    // Optional: 액세스 토큰 만료 여부 확인 후 토큰 갱신 로직 구현
    // 여기서는 단순화를 위해 모든 요청에 대해 액세스 토큰을 설정합니다.
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
