import Lottie from "react-lottie";
import loadingAnimation from "..../../../public/assets/loading.json";

export const LoadingLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMinYMin meet", // 또는 'none'
    },
  };

  return (
    <div className="w-[100px] ml-[-10px]">
      <Lottie options={defaultOptions} height={41} width={99} />
    </div>
  );
};
