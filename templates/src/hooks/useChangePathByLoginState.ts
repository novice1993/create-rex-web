import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/providers/AuthProvider";
import { useChangeClientPath } from "./useChangeClientPath";

import { clientPagePath } from "@/constants/clientPagePath";

export const useChangePathByLoginState = () => {
  const { pathname } = useLocation();
  const { checkIsLogin, loginState } = useAuthContext();
  const { moveToLoginPage, moveToMainPage } = useChangeClientPath();

  /**
   * 로그인 상태에 따라 페이지 경로가 변경되도록 설정
   */
  useEffect(
    function changePathByLoginState() {
      // 로그인 상태가 아닐 때 + 로그인 페이지가 아닐 경우
      if (!checkIsLogin() && pathname !== clientPagePath.LOGIN_PAGE) {
        moveToLoginPage();
        return;
      }

      // 로그인 상태일 때 + 로그인 페이지로 접근할 경우
      if (checkIsLogin() && pathname === clientPagePath.LOGIN_PAGE) {
        moveToMainPage();
        return;
      }
    },
    [pathname, loginState]
  );
};
