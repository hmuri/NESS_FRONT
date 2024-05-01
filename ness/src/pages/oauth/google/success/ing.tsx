// pages/google.js
import { serialize } from "cookie";
import { GetServerSidePropsContext } from "next";

export default function Google() {
  return <div>Redirecting...</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query, res } = context;
  const jwtAccessToken = Array.isArray(query.jwtAccessToken)
    ? query.jwtAccessToken[0]
    : query.jwtAccessToken;
  const jwtRefreshToken = Array.isArray(query.jwtRefreshToken)
    ? query.jwtRefreshToken[0]
    : query.jwtRefreshToken;

  if (jwtAccessToken && jwtRefreshToken) {
    // 쿠키에 access 토큰과 refresh 토큰 저장
    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1주일
      path: "/",
    };

    res.setHeader("Set-Cookie", [
      serialize("accessToken", jwtAccessToken, cookieOptions),
      serialize("refreshToken", jwtRefreshToken, cookieOptions),
    ]);

    // /main 페이지로 리디렉션 설정
    res.writeHead(302, { Location: "/main" });
    console.log("go to the main page");
    res.end();
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
