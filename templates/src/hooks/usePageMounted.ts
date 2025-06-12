import { useState, useEffect, CSSProperties } from "react";

export const usePageMounted = () => {
  const [isPageMounted, setIsPageMounted] = useState(false);

  useEffect(function changeIsMountStateWhenPageMoutned() {
    setTimeout(() => setIsPageMounted(true), 10);
  }, []);

  const pageSwitchEffect: CSSProperties = { opacity: `${isPageMounted ? 1 : 0}`, transition: "opacity ease-in-out 0.3s" };

  return { isPageMounted, pageSwitchEffect };
};
