import { getCategoryList } from "@/module/apis/calendar";
import { useEffect, useState } from "react";

interface ICategoryModal {
  setSelectedCategory: any;
  setCategoryModalOpen: any;
  selectedCategory: ICategory | undefined;
}

const CategoryModal = ({
  setSelectedCategory,
  setCategoryModalOpen,
  selectedCategory,
}: ICategoryModal) => {
  const [categoryList, setCategoryList] = useState<ICategoryList>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategoryList();
      setCategoryList(result);
    };
    fetchData();
  }, []);
  return (
    <div className="box-shadow w-full h-[50vh] max-h-[400px] rounded-t-[20px] bg-white fixed left-0 bottom-0 z-40 p-[40px]">
      <div className="flex justify-between mb-[20px]">
        <div className="text-[#454545] text-[20px] font-semibold">카테고리</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            onClick={() => {
              setCategoryModalOpen(false);
            }}
          >
            <path
              d="M8.99999 16.3164L5.70668 13.0231C5.47282 12.7892 5.15563 12.6578 4.8249 12.6578C4.49417 12.6578 4.17699 12.7892 3.94312 13.0231C3.70926 13.2569 3.57788 13.5741 3.57788 13.9048C3.57788 14.0686 3.61014 14.2308 3.6728 14.382C3.73547 14.5333 3.82733 14.6708 3.94312 14.7866L8.12313 18.9666C8.61076 19.4542 9.39905 19.4542 9.88668 18.9666L20.4667 8.38661C20.7005 8.15275 20.8319 7.83556 20.8319 7.50483C20.8319 7.1741 20.7005 6.85692 20.4667 6.62306C20.2328 6.38919 19.9156 6.25781 19.5849 6.25781C19.2542 6.25781 18.937 6.3892 18.7031 6.62306L8.99999 16.3164Z"
              fill="#A7A7A7"
              stroke="#A7A7A7"
              stroke-width="0.5"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-[10px]">
        {categoryList?.categoryList.map((category) => (
          <div
            key={category.categoryNum}
            className="w-[130px] py-[10px] text-center rounded-[10px]"
            style={{
              backgroundColor: category.categoryColor,
            }}
            onClick={() => {
              setSelectedCategory(category);
              console.log("here" + categoryList);
            }}
          >
            {category.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryModal;
