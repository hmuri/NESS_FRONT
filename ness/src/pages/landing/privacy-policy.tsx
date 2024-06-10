import Image from "next/image";
import NESSImg from "../../../public/assets/ness_main_logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon_left_arrow } from "@/module/icons";
const Index = () => {
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = window.scrollY < 50; // 50px 아래로 스크롤되면 투명하게 처리
      setIsTop(isAtTop);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 클린업 함수
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className=" w-full flex justify-center">
      <div className="w-full md:w-[600px]">
        <div
          className={`fixed px-[23px] w-full md:w-[600px] top-0 ${
            isTop ? "bg-white" : "bg-[rgba(255,255,255,0.5)]"
          } h-[76px] flex items-center justify-between z-10 transition-all duration-300`}
        >
          <div className="flex items-center  gap-[10px] border-[1px] bg-white  border-[#D9D9D9] rounded-[12px] p-[10px]">
            <Image src={NESSImg} alt="" width={30} height={30} />
            <span className="font-bold text-[20px] ">NESS</span>
          </div>
          <div
            className="landing-grabox px-[15px] py-[10px] text-white rounded-[12px] text-[15px] font-bold cursor-pointer"
            onClick={() => router.replace("/login")}
          >
            회원가입 및 로그인
          </div>
        </div>
        <div className="px-[20px]">
          <div className="flex items-center justify-between mt-[76px] mb-[28px]">
            <Icon_left_arrow onClick={() => router.back()} />
            <div className="text-[20px] py-[11px]">개인정보처리방침</div>
            <div className="w-[32px]" />
          </div>
          <div className="text-[#454545] text-[16px] flex flex-col">
            <span className="text-[18px] text-black mb-[8px]">
              개인정보의 처리목적
            </span>
            <span>
              re:coding은(는) 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
              않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에
              따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </span>
            <span className="text-black mt-[5px]">[회원 가입 및 관리]</span>
            <span>
              회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별・인증,
              회원자격 유지・관리, 서비스 부정이용 방지, 만 14세 미만 아동의
              개인정보 처리 시 법정대리인의 동의 여부 확인, 각종 고지・통지,
              고충처리 목적으로 개인정보를 처리합니다.
            </span>
            <br />
          </div>
          <div className="text-[#454545] text-[16px] flex flex-col">
            <span className="text-[18px] text-black mb-[8px]">
              처리하는 개인정보 항목
            </span>
            <span>
              re:coding은(는) 서비스 제공을 위해 필요 최소한의 범위에서
              개인정보를 수집・이용합니다. 해당 개인 정보는 제 3자 서비스 업체
              또는 타인에게 공유되지 않습니다.
            </span>
            <span className="text-black mt-[5px]">
              [정보주체의 동의를 받아 처리하는 개인정보 항목]
            </span>
            <span>
              {
                "<개인정보처리자명>은(는) 다음의 개인정보 항목을 「개인정보 보호법」 제15조 제1항 제1호 및 제22조 제1항 제7호에 따라 정보주체의 동의를 받아 처리하고 있습니다. 해당 정보는 소셜 로그인(Google)을 통해서 수집됩니다."
              }
            </span>
            <span className="text-black ml-[10px]">1. 회원 서비스 운영 </span>
            <ul style={{ listStyleType: "disc", marginLeft: "30px" }}>
              <li>
                수집・이용 항목 : OAuth ID, 성명, 닉네임, 이메일 주소, 프로필
                사진
              </li>
            </ul>
            <span className="text-black mt-[5px]">
              [정보주체의 동의를 받지 않고 처리하는 개인정보 항목]
            </span>
            <span>
              {
                "<개인정보처리자명>은(는) 다음의 개인정보 항목을 정보주체의 동의없이 처리하고 있습니다."
              }
            </span>
            <span className="text-black ml-[10px]">1. 회원 서비스 운영 </span>
            <ul style={{ listStyleType: "disc", marginLeft: "30px" }}>
              <li>
                법적 근거 : 개인정보 보호법 제15조 제1항 제4호(‘계약 이행’)
              </li>
              <li>수집・이용 항목 : 이메일 주소, 비밀번호</li>
            </ul>
            <br />
          </div>
          <div className="text-[#454545] text-[16px] flex flex-col">
            <span className="text-[18px] text-black mb-[8px]">
              개인정보의 처리 및 보유기간
            </span>
            <span>
              re:coding 은(는) 법령에 따른 개인정보 보유・이용기간 또는
              정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보
              보유・이용기간 내에서 개인정보를 처리・보유합니다. 각각의 개인정보
              처리 및 보유 기간은 다음과 같습니다.
            </span>
            <span className="text-black mt-[5px]">
              [홈페이지 회원 가입 및 관리 : 사업자/단체 홈페이지 탈퇴 시까지]
            </span>
            <span>
              다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
            </span>

            <ul style={{ listStyleType: "disc", marginLeft: "30px" }}>
              <li>
                관계 법령 위반에 따른 수사・조사 등이 진행 중인 경우에는 해당
                수사・조사 종료 시까지
              </li>
              <li>
                홈페이지 이용에 따른 채권・채무관계 잔존 시에는 해당
                채권・채무관계 정산 시까지
              </li>
            </ul>
          </div>
          <br />
          <div className="text-[#454545] text-[16px] flex flex-col ">
            <span className="text-[18px] text-black mb-[8px]">
              개인정보의 파기 절차 및 방법
            </span>
            <span>
              re:coding 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
              개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
              파기합니다. 해당 개인 정보는 소셜 로그인(Google)로 받은 개인 정보
              및 서비스를 이용하며 생긴 모든 종류의 개인 정보를 포함합니다.
              개인정보 파기의 절차 및 방법은 다음과 같습니다.
            </span>
            <span className="text-black mt-[5px]">[파기절차]</span>
            <span>
              re:coding 은(는) 파기 사유가 발생한 개인정보를 선정하고,
              re:coding의 개인정보 보호책임자의 승인을 받아 개인정보를
              파기합니다.
            </span>
            <span className="text-black mt-[5px]">[파기방법]</span>
            <span>
              re:coding 은(는)전자적 파일 형태로 기록・저장된 개인정보는 기록을
              재생할 수 없도록 데이터베이스에서 삭제하며, 종이 문서에
              기록・저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
            </span>
            <br />
          </div>
          <div className="text-[#454545] text-[16px] flex flex-col">
            <span className="text-[18px] text-black mb-[8px]">
              개인정보의 안전성 확보조치
            </span>
            <span>
              re:coding 은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를
              취하고 있습니다.
            </span>

            <ul style={{ listStyleType: "disc", marginLeft: "30px" }}>
              <li>관리적 조치 : 내부관리계획 수립・시행, 전담조직 운영</li>
              <li>
                기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 개인정보의
                암호화
              </li>
            </ul>
          </div>
          <br />
          <div className="text-[#454545] text-[16px] flex flex-col">
            <span className="text-[18px] text-black mb-[8px]">
              개인정보 자동 수집 장치의 설치・운영 및 거부에 관한 사항
            </span>
            <span>
              re:coding 은(는) 사용자에게 개별적인 서비스와 편의를 제공하기 위해
              이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
              쿠키는 웹사이트 운영에 이용되는 서버(http)가 정보주체의 브라우저에
              보내는 소량의 정보이며 정보주체의 PC 또는 모바일에 저장됩니다.
              정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의
              설정을 할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스
              이용에 어려움이 발생할 수 있습니다. re:coding 은(는) 최적화된
              맞춤형 서비스 및 혜택에 필요한 최소한의 행태정보만을 수집하며,
              사상, 신념, 학력・병력 등 개인의 권리・이익이나 사생활을 침해할
              우려가 있는 민감한 행태정보를 수집하지 않습니다.
            </span>
          </div>
        </div>
        <div className="h-[157px] bg-[#F2F0FF] p-[20px] mt-[40px] leading-relaxed">
          <div className="text-[16px] font-bold mb-[10px]">NESS</div>
          <div
            className="text-[#7A64FF] font-medium cursor-pointer"
            onClick={() => router.push("/landing/privacy-policy")}
          >
            개인정보 처리 방침
          </div>
          <a
            className="text-[#7A64FF] font-medium"
            href="mailto:maxcse01@gmail.com"
          >
            이메일로 연락하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
