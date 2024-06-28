import Nav from "@/components/common/Nav";
import { getCategoryList } from "@/module/apis/calendar";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "@/module/apis/edit";
import {
  Icon_add_category,
  Icon_information,
  Icon_left_arrow,
} from "@/module/icons";
import { SetStateAction, useEffect, useState } from "react";
import LeftArrowImage from "../../../public/assets/left_arrow.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";

interface IAddViewProps {
  selectedCategory: ICategory | undefined;
  isModify: boolean;
  setIsAddView: any;
}

const AddView = ({
  selectedCategory,
  isModify,
  setIsAddView,
}: IAddViewProps) => {
  const [category, setCategory] = useState<string>(
    selectedCategory?.category || ""
  );
  const [isColorView, setIsColorView] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<IColorOption>({
    code: selectedCategory?.categoryColor
      ? selectedCategory?.categoryColor
      : "#D9D9D9",
    label: "Gray",
  });

  interface IColorOption {
    code: string;
    label: string;
  }

  const colorOptions: IColorOption[] = [
    { code: "#D9D9D9", label: "Gray" },
    { code: "#759CFF", label: "Blue" },
    { code: "#FFB775", label: "Orange" },
    { code: "#FF75C8", label: "Pink" },
    { code: "#454545", label: "Black" },
    { code: "#7A64FF", label: "Purple" },
    { code: "#00C09E", label: "Green" },
    { code: "#FF6464", label: "Red" },
  ];

  const handleSubmit = async () => {
    try {
      let response;
      if (isModify) {
        response = await updateCategory(
          category,
          selectedColor.code,
          selectedCategory?.categoryNum
        );
        if (response?.status === 200) {
          alert("정상적으로 수정되었습니다!");
        } else {
          throw new Error(response?.data.message || "Update failed");
        }
      } else {
        response = await addCategory(category, selectedColor.code);
        if (response.status === 200) {
          alert("정상적으로 추가되었습니다!");
        } else {
          throw new Error(response.data.message || "Addition failed");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생하였습니다.");
      }
    } finally {
      setIsAddView(false);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCategory(selectedCategory?.categoryNum);
      if (response?.status == 200) {
        alert("정상적으로 삭제되었습니다!");
      } else {
        throw new Error(response?.data.message || "Addition failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생하였습니다.");
      }
    } finally {
      setIsAddView(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Icon_left_arrow onClick={() => setIsAddView(false)} />
        <div className="text-[20px]">
          {isModify ? "카테고리 수정" : "카테고리 추가"}
        </div>
        <button
          className="h-[30px] text-[14px] rounded-[5px] bg-[#7A64FF] px-[14px] text-white"
          onClick={handleSubmit}
        >
          완료
        </button>
      </div>
      <div className="mt-[20px] py-[18px]">
        <div className="text-[16px] mb-[13px]">카테고리 이름</div>
        <div className="w-full border border-gray-300 rounded-[5px] px-[10px] py-[5px]">
          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
            className="text-[14px] w-full overflow-wrap-break-word "
            placeholder="입력하기"
          />
        </div>
      </div>
      <div className="mt-[20px] py-[18px]">
        <div className="flex justify-between items-center text-[16px] mb-[13px]">
          <div>카테고리 색상</div>
          <div
            className="flex items-center gap-[5px]"
            onClick={() => setIsColorView(!isColorView)}
          >
            <div
              className={"w-[35px] h-[35px] rounded-full focus:outline-none"}
              style={{ backgroundColor: selectedColor.code }}
              aria-label={selectedColor.label}
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
            >
              <path
                d="M1.75077 1.67765H9.25077C9.3267 1.67789 9.40113 1.69883 9.46605 1.73822C9.53097 1.77762 9.58391 1.83397 9.61918 1.90121C9.65446 1.96846 9.67072 2.04405 9.66623 2.11985C9.66173 2.19565 9.63665 2.26879 9.59368 2.3314L5.84368 7.74807C5.68827 7.97265 5.3141 7.97265 5.15827 7.74807L1.40827 2.3314C1.36486 2.26892 1.33941 2.19575 1.33467 2.11982C1.32993 2.04389 1.34609 1.96812 1.3814 1.90073C1.4167 1.83334 1.4698 1.77692 1.53492 1.73759C1.60004 1.69826 1.67469 1.67753 1.75077 1.67765Z"
                fill="#CCCCCC"
              />
            </svg>
          </div>
        </div>
        {isColorView && (
          <div className="fixed w-full flex items-center justify-center left-0 bottom-0 z-20">
            <div className="box-shadow w-full h-[50vh] max-h-[400px] rounded-t-[20px] bg-white p-[40px] md:w-[650px] md:rounded-t-[20px]">
              <div className="flex justify-between mb-[20px]">
                <div className="text-[#454545] text-[20px] font-semibold">
                  카테고리 색상
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    onClick={() => {
                      setIsColorView(false);
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
              <div className="grid grid-cols-4 gap-10 p-4">
                {colorOptions.map((color, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`w-[40px] h-[40px] rounded-[10px] focus:outline-none ${
                      selectedColor.code === color.code
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.label}
                  >
                    {selectedColor.code === color.code ? "✓" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {isModify && (
          <div
            className="w-full h-[40px] rounded-[5px] bg-[#454545] mt-[40px] flex justify-center items-center text-[#D85B62]"
            onClick={handleDelete}
          >
            삭제하기
          </div>
        )}
      </div>
    </div>
  );
};

const Category = () => {
  const [categoryList, setCategoryList] = useState<ICategoryList>();
  const [isAddView, setIsAddView] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const [isModify, setIsModify] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategoryList();
      setCategoryList(result);
      console.log("categoryList" + JSON.stringify(categoryList));
    };

    fetchData();
  }, [isAddView]);

  const clickCategory = (category: ICategory) => {
    if (category.category == "🍀미분류") {
      alert("미분류 태그는 수정 및 삭제가 불가능합니다.");
    } else {
      setSelectedCategory(category);
      setIsAddView(true);
      setIsModify(true);
    }
  };

  const images = ["/assets/category_des.png"];

  const steps = [
    {
      title: "카테고리 관리하기",
      subtitle:
        "캘린더의 상단 버튼을 눌러 일정의 카테고리를 수정하고 추가해요.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    beforeChange: (current: any, next: SetStateAction<number>) =>
      setActiveIndex(next),
    arrows: false, // 화살표 버튼 숨기기
    customPaging: function (i: number) {
      return (
        <div
          style={{
            width: i === activeIndex ? "12px" : "6px",
            height: "6px",
            borderRadius: "5px",
            backgroundColor: i === activeIndex ? "#272B55" : "#d1d5db",
          }}
        ></div>
      );
    },
    dotsClass: "slick-dots landing-dots", // 커스텀 dots CSS 클래스
  };

  return (
    <div className="p-[30px] mt-[30px] flex justify-center">
      <div className="md:max-w-[600px] w-full">
        {!isAddView ? (
          <>
            <div className="flex justify-between mb-[40px] items-center">
              <Icon_left_arrow onClick={() => router.replace("/calendar")} />
              <div className="text-[20px] ">카테고리 관리</div>
              <div className="flex gap-[4px]">
                <Icon_add_category
                  onClick={() => {
                    setIsAddView(true);
                    setIsModify(false);
                  }}
                />
                <Icon_information
                  className="cursor-pointer"
                  onClick={() => setIsModal(true)}
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-[30px]">
              {categoryList?.categoryList.map((category) => (
                <div
                  key={category.categoryNum}
                  className="w-[115px] py-[10px] text-center rounded-[20px]"
                  style={{
                    backgroundColor: category.categoryColor,
                  }}
                  onClick={() => {
                    clickCategory(category);
                  }}
                >
                  {category.category}
                </div>
              ))}
            </div>
          </>
        ) : (
          <AddView
            selectedCategory={selectedCategory}
            isModify={isModify}
            setIsAddView={setIsAddView}
          />
        )}
      </div>
      {isModal && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div
            className="fixed top-[30px] right-[50px] text-[25px] text-white cursor-pointer"
            onClick={() => setIsModal(false)}
          >
            X
          </div>
          <div
            className="relative flex flex-col justify-center w-full h-[100vh] md:max-w-[600px] pb-[20px] overflow-auto "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center jusitfy-center mt-[30px] mb-[20px]">
              <div className="text-center w-full text-[27px] font-bold text-[#7A64FF]">
                {steps[activeIndex].title}
              </div>
              <div className="text-center text-[15px] text-white w-[210px]">
                {steps[activeIndex].subtitle}
              </div>
            </div>
            <Slider {...settings}>
              {images.map((img, index) => (
                <div
                  key={index}
                  className=" flex justify-center pb-0 w-full items-center"
                >
                  <img src={img} alt="" className="max-h-[65vh] mx-auto" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <Nav />
    </div>
  );
};

export default Category;
