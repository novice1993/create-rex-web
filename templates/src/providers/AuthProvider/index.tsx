import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";

enum LoginState {
  LOGIN = "login",
  LOGOUT = "logout"
}

const loginStateKey = "DASHBOARD_LOGIN_STATE";

interface AuthContextValueType {
  getAccessToken: () => string | undefined;
  setAccessToken: (newTokenValue: string) => void;
  deleteAccessToken: () => void;

  loginState: LoginState;
  setLogin: () => void;
  setLogout: () => void;
  checkIsLogin: () => boolean;
}

const tokenKey = "ACCESS_TOKEN";
const authContext = createContext<AuthContextValueType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  /** 추후 삭제 예정 -> 현재 새로고침 해도 localstorage에 저장한 state 활용해서 로그인 지속 */
  const [loginState, setLoginState] = useState<LoginState>(() => {
    // 저장한 값 존재 여부 확인 -> 설정
    const storedData = localStorage.getItem(loginStateKey);

    if (storedData) {
      return storedData as LoginState;
    } else {
      return LoginState.LOGOUT;
    }
  });

  /** 추후 프로그램 구현 완료 시 적용 예정 -> 새로고침 시 로그아웃 처리*/
  // const [loginState, setLoginState] = useState<LoginState>(LoginState.LOGOUT);

  // 현재 액세스 토큰 값 반환
  const getAccessToken = (): string | undefined => {
    return queryClient.getQueryData([tokenKey]);
  };

  // 액세스 토큰 값 설정
  const setAccessToken = (newTokenValue: string) => {
    return queryClient.setQueryData([tokenKey], newTokenValue);
  };

  // 액세스 토큰 값 제거
  const deleteAccessToken = () => {
    return queryClient.removeQueries({ queryKey: [tokenKey] });
  };

  // 로그인 처리 + 로컬 스토리지에 로그인 상태 저장
  const setLogin = () => {
    setLoginState(LoginState.LOGIN);
    localStorage.setItem(loginStateKey, LoginState.LOGIN);
  };

  // 로그아웃 처리 + 로컬 스토리지에 존재하는 상태 값 제거
  const setLogout = () => {
    setLoginState(LoginState.LOGOUT);
    localStorage.removeItem(loginStateKey);
  };

  // 로그인 여부 체크
  const checkIsLogin = () => {
    return loginState === LoginState.LOGIN;
  };

  return <authContext.Provider value={{ getAccessToken, setAccessToken, deleteAccessToken, setLogin, setLogout, checkIsLogin, loginState }}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
