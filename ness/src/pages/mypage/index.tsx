export default function MyPage() {
  return (
    <>
      <div className="p-[20px]">
        <div className="mt-[81px] flex flex-col w-full items-center">
          <div>
            <div className="w-[86px] h-[86px] bg-[#F2F0FF] rounded-[50%]"></div>
          </div>
          <div className="flex items-center pt-[36px]">
            <div className="text-[24px] font-medium w-[200px] text-center overflow-wrap-break-word mb-[36px]">
              민주
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
