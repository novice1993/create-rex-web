import { useState } from "react";

enum LoginState {
  LOGIN = "login",
  LOGOUT = "logout"
}

const LOGIN_STATE_KEY = "DASHBOARD_LOGIN_STATE";

// 인증 상태 관리 전용 훅
export const useAuthState = () => {
  const [loginState, setLoginState] = useState<LoginState>(() => {
    // 저장한 값 존재 여부 확인 -> 설정
    const storedData = localStorage.getItem(LOGIN_STATE_KEY);

    if (storedData) {
      return storedData as LoginState;
    } else {
      return LoginState.LOGOUT;
    }
  });

  // 로그인 처리 + 로컬 스토리지에 로그인 상태 저장
  const setLogin = () => {
    setLoginState(LoginState.LOGIN);
    localStorage.setItem(LOGIN_STATE_KEY, LoginState.LOGIN);
  };

  // 로그아웃 상태 처리 + 로컬 스토리지에 존재하는 상태 값 제거
  const setLogoutState = () => {
    setLoginState(LoginState.LOGOUT);
    localStorage.removeItem(LOGIN_STATE_KEY);
  };

  // 로그인 여부 체크
  const checkIsLogin = () => {
    return loginState === LoginState.LOGIN;
  };

  return {
    loginState,
    setLogin,
    setLogoutState,
    checkIsLogin
  };
};

// 타입과 상수들도 export (다른 곳에서 사용할 수 있도록)
export { LoginState, LOGIN_STATE_KEY };
