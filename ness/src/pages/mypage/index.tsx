import axios from "axios";
import { GetServerSidePropsContext } from "next";

export default function MyPage({ profile }: any) {
  return (
    <>
      <div className="p-[20px]">
        <div className="mt-[81px] flex flex-col w-full items-center">
          <div>
            <img
              src={profile.pictureUrl}
              alt="Profile"
              className="w-[86px] h-[86px] bg-[#F2F0FF] rounded-[50%]"
            ></img>
          </div>
          <div className="flex items-center pt-[36px]">
            <div className="text-[24px] font-medium w-[200px] text-center overflow-wrap-break-word mb-[36px]">
              {profile.nickname}
            </div>
          </div>
        </div>

        <div className="flex gap-[10px] flex-col">
          <div className="rounded-[10px] w-full h-[43px] flex items-center justify-center border-[#ECECEC]">
            <div className="text-[16px] font-[500] text-center">
              개인 정보 수정
            </div>
          </div>
          <div className="rounded-[10px] w-full h-[48px] flex items-center justify-center border-[#ECECEC]">
            <div className="text-[16px] font-[500] text-center">
              기타 필요한 버튼
            </div>
          </div>
        </div>
      </div>
      <nav className="w-full fixed h-[90px] border-t border-gray-[#454545] bg-white bottom-0 left-0">
        <div className="p-[20px] flex space-between ">
          <div className="flex-grow text-center">일정</div>
          <div className="flex-grow text-center">홈</div>
          <div className="flex-grow text-center">계정</div>
        </div>
      </nav>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie;

  let accessToken = "";

  // 쿠키 문자열을 파싱하여 accessToken 추출
  if (cookies) {
    const cookieObj = Object.fromEntries(
      cookies.split(";").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key.trim(), decodeURIComponent(value)];
      })
    );

    accessToken = cookieObj.accessToken || "";
  }

  try {
    const response = await axios.get("http://13.125.106.110:8080/profile", {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const profile = response.data;

    // 페이지 컴포넌트로 프로필 정보 전달
    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    console.error("Failed to fetch profile", error);
    // 에러 처리: 프로필 정보 없이 페이지 렌더링
    return {
      props: {
        profile: {},
      },
    };
  }
}
