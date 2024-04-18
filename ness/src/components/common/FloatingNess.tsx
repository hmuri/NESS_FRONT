// components/FloatingNess.js
import Image from "next/image";
import NESS_MAIN_LOGO from "../../assets/ness_main_logo.png";
import { useRouter } from "next/router";
import nessChatImg from "../../assets/nessChatImg.png";

interface FloatingNessProps {
  message?: string;
}

const FloatingNess = ({ message }: FloatingNessProps) => {
  const router = useRouter();
  return (
    <div>
      <Image
        src={NESS_MAIN_LOGO}
        alt="Ness Main Logo"
        className="floatingImage fixed bottom-[80px] w-h-[50px] right-[20px] z-100"
        onClick={() => router.push("/chatting")}
      />
      {message && (
        <div
          className={
            "fixed text-[13px] bottom-[93px] right-[100px] max-w-[70%] px-[12px] py-[10px] rounded-[16px] bg-[#ECECEC] text-black shadow-lg"
          }
        >
          <Image src={nessChatImg} className={"fixed right-[90px]"} alt="" />
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default FloatingNess;
