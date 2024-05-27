import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Nav from "../../components/common/Nav";
import { useRouter } from "next/router";
import {
  Icon_bell,
  Icon_person,
  Icon_persona_ness,
  Icon_right_arrow,
  Icon_spoit,
} from "@/module/icons";
import urls from "@/module/urls";

export default function MyPage({ profile }: any) {
  const router = useRouter();
  return (
    <div className="flex w-full justify-center items-center">
      <div className="p-[25px] md:w-[600px]">
        <div className="mt-[76px] flex flex-col w-full items-center">
          <div>
            <img
              src={profile.pictureUrl}
              alt="Profile"
              className="w-[86px] h-[86px] bg-[#F2F0FF] rounded-[50%]"
            />
          </div>
          <div className="flex items-center pt-[36px]">
            <div className="text-[24px] font-medium w-[200px] text-center overflow-wrap-break-word mb-[20px]">
              {profile.nickname}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div
            className="cursor-pointer rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]"
            onClick={() => router.push(urls.mypage.edit)}
          >
            <div className="flex gap-[15px] items-center">
              <Icon_person />
              <div className="text-[16px] font-[500] flex flex-col items-start">
                <div>이메일 알림</div>
                <div className="text-[#454545]">
                  프로필 사진 및 닉네임을 수정합니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          <div
            className="cursor-pointer rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]"
            onClick={() => router.push(urls.mypage.alarm)}
          >
            <div className="flex gap-[15px] items-center ">
              <Icon_bell />
              <div className="text-[16px] font-[500] flex flex-col items-start">
                <div>알림</div>
                <div className="text-[#454545]">
                  이메일 알림 등을 설정합니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          <div
            className="cursor-pointer rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]"
            onClick={() => router.push(urls.mypage.persona)}
          >
            <div className="flex gap-[15px] items-center ">
              <Icon_persona_ness />
              <div className="text-[16px] font-[500] flex flex-col items-start">
                <div>페르소나</div>
                <div className="text-[#454545]">
                  일정 관리 비서의 페르소나를 결정합니다.
                </div>
              </div>
            </div>
            <Icon_right_arrow />
          </div>
          {/* <div className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]">
            <div className="flex gap-[15px] items-center">
              <Icon_spoit />
              <div className="text-[16px] font-[500] flex flex-col items-start">
                <div>기타 버튼</div>
                <div className="text-[#454545]">기타 버튼입니다.</div>
              </div>
            </div>
            <Icon_right_arrow />
          </div> */}
        </div>
      </div>
      <Nav />
    </div>
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/profile`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
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
