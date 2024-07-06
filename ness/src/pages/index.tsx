import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/main");
  }, [router]); // router 객체가 변경될 때마다 실행

  return <></>;
}
