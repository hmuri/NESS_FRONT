// pages/google.js
import axios from "axios";
import { serialize } from "cookie";
import { GetServerSidePropsContext } from "next";

export default function Google() {
  return <div>Redirecting...</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query, res } = context;
  const { code } = query;

  if (code) {
    try {
      // 서버에 authorizationCode 전송하여 JWT 토큰 받아옴
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/login/oauth/google?code=${code}`
      );

      const { access_token, refresh_token } = response.data; // 응답에서 accessToken과 refreshToken을 추출

      // 쿠키에 access 토큰과 refresh 토큰 저장
      const cookieOptions = {
        httpOnly: false,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7, // 1주일
        path: "/",
      };

      res.setHeader("Set-Cookie", [
        serialize("accessToken", access_token, cookieOptions),
        serialize("refreshToken", refresh_token, cookieOptions),
      ]);

      // /main 페이지로 리디렉션 설정
      res.writeHead(302, { Location: "/main" });
      console.log("go to the main page");
      res.end();
    } catch (error) {
      console.error("Error fetching JWT token", error);
      // 에러 처리
      return {
        redirect: {
          destination: "/error", // 에러 페이지나 로그인 페이지 등으로 리디렉션할 수 있음
          permanent: false,
        },
      };
    }
  } else {
    // 코드가 없는 경우, 로그인 페이지나 홈으로 리디렉션
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 이 부분은 실행되지 않지만, Next.js 함수의 형식을 유지하기 위해 필요
  return { props: {} };
}
