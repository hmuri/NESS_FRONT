import Nav from "@/components/common/Nav";
export default function Main() {
  return (
    <>
      <div className="p-[20px]">
        <div className="mt-[40px] flex w-full mb-[45px]">
          <div className="flex flex-7/10 pr-[20px] h-100px items-center">
            <div className="text-[24px] font-medium ">
              민주님, 방학에는 역시 개발공부죠!
            </div>
          </div>
          <div className="flex-3/10">
            <div className="w-[100px] h-[100px] bg-gray-500 "></div>
          </div>
        </div>
        <div className="text-[20px] font-[500] mb-[10px]">
          이런 활동은 어떠세요?
        </div>
        <div>
          <div className="bg-gray-500 w-[125px] h-[110px] rounded-[10px] opacity-40 relative p-y-[8px] p-x-[10px]">
            <div className="absolute text-white left-[0px] top-[0px] z-10 m-[10px]">
              리액트 네이티브 공부하기
            </div>
          </div>
        </div>
        <div className="text-[20px] font-[500] mb-[10px] mt-[40px]">
          오늘의 일정 리마인드
        </div>
        <div className="rounded-[10px] bg-[#ECECEC] w-[100%] h-[178px]"></div>
        <div className="text-[20px] font-[500] mb-[10px] mt-[40px]">
          네스 보고서
        </div>
        <div className="rounded-[10px] bg-[#F2F0FF] w-full min-h-[160px]">
          <div className="p-[20px]">
            <div className="text-[16px] font-[500] tracking-tighter">
              이번 달 들어서 클라이밍을 자주 하셨네요!
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
