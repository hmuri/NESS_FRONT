import "@/styles/globals.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/calendar/style.css";
import "@/styles/FloatingNess.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
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
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
