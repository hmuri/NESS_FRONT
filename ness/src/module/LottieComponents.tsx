import Lottie from "react-lottie";
import loadingAnimation from "../assets/loading.json";

export const LoadingLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // 애니메이션의 가로 세로 비를 유지
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={99} width={41} />
    </div>
  );
};
