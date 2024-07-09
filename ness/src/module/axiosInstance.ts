import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./cookies";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // accessToken을 가져옵니다.
    const accessToken = getAccessToken();
    // accessToken이 존재하고 만료되지 않은 경우 헤더에 추가합니다.
    console.log("accessToken" + accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const MAX_RETRY_COUNT = 3;
let retryCount = 0;

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 에러 페이지로 넘어가야 함!");
    }

    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    console.log("에러입니다", status);

    if (status === 401) {
      if (retryCount < MAX_RETRY_COUNT) {
        retryCount++;
        const originalRequest = config;
        const refreshTokenValue = getRefreshToken(); // 쿠키에서 refresh_token을 얻어옴

        if (refreshTokenValue) {
          const payload = {
            jwtRefreshToken: refreshTokenValue,
          };
          try {
            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/auth/reIssuance`,
              payload,
              {
                headers: {
                  Authorization: refreshTokenValue, // Authorization 헤더에 Bearer 토큰 형태로 추가
                },
              }
            );
            console.log("새로운 accessToken 발급", data);

            const { jwtAccessToken, jwtRefreshToken } = data;
            console.log("herejwt" + jwtAccessToken + jwtRefreshToken);
            setAccessToken(jwtAccessToken); // 새로운 access token을 쿠키에 저장
            setRefreshToken(jwtRefreshToken);

            // 요청을 보낼 때 헤더에 새로운 access token을 추가
            originalRequest.headers.authorization = `${jwtAccessToken}`;

            retryCount = 0; // 재시도 횟수 초기화
            return axiosInstance(originalRequest); // 원래 요청을 재시도하고 응답 반환
          } catch (e) {
            console.log("리프레시 토큰 갱신 실패");
            console.log(e);

            // 리프레시 토큰이 만료된 경우
            removeAccessToken();
            removeRefreshToken();
            alert("로그인 정보가 만료되었습니다. 다시 로그인 해주세요.");
          }
        } else {
          alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
          console.log("리프레시 토큰이 쿠키에 없음");
        }
      } else {
        console.log("재시도 횟수 초과");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
