import "@/styles/globals.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/calendar/style.css";
import "@/styles/FloatingNess.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { ChatProvider } from "@/module/provider/ChatContext";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const cookies = new Cookies();
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  useEffect(() => {
    setScreenSize();
    window.addEventListener("resize", setScreenSize);
    return () => {
      window.removeEventListener("resize", setScreenSize);
    };
  }, []);

  useEffect(() => {
    const allowedPaths = ["/landing", "/login"];
    const accessToken = cookies.get("accessToken");

    if (!accessToken && !allowedPaths.includes(router.pathname)) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered: ", registration);
          })
          .catch((registrationError) => {
            console.log(
              "Service Worker registration failed: ",
              registrationError
            );
          });
      });
    }
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" href="assets/ness_chat.png" type="image/png"></link>
        <link
          rel="preload"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </QueryClientProvider>
    </>
  );
}
