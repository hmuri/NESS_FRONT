// components/FloatingNess.js
import Image from "next/image";
import NESS_MAIN_LOGO from "../../assets/ness_main_logo.png";
import { useRouter } from "next/router";

const FloatingNess = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        src={NESS_MAIN_LOGO}
        alt="Ness Main Logo"
        className="floatingImage absolute bottom-[80px] w-h-[50px] right-[20px]"
        onClick={() => router.push("/chatting")}
      />
    </div>
  );
};

export default FloatingNess;
