interface Props {
  dataInfo: string; // `data.info` 값을 props로 받아옵니다.
}

const DaumSearchLink: React.FC<Props> = ({ dataInfo }) => {
  // 인코딩된 검색어를 포함하는 URL 생성
  const encodedQuery = encodeURIComponent(dataInfo);
  const daumSearchUrl = `https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&q=${encodedQuery}`;

  return (
    <div className="mt-4 w-full flex">
      <a
        href={daumSearchUrl}
        className="text-center word-break bg-gray-400 flex justify-center hover:bg-gray-500 w-full text-white font-semibold py-2 px-4 rounded"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* &apos;{dataInfo}&apos; */}
        {/* <br /> */}
        검색결과 더보기
      </a>
    </div>
  );
};

export default DaumSearchLink;
