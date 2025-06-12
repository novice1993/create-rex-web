import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTopWhenPathChange = () => {
  const { pathname } = useLocation();

  useEffect(
    function setScrollToTopWhenPathChange() {
      window.scrollTo(0, 0);
    },
    [pathname]
  );
};
