import { createContext, ReactNode, useContext } from "react";
import { useTokenManager } from "./useTokenManager";
import { useAuthState, LoginState } from "./useAuthState";

interface AuthContextValueType {
  getAccessToken: () => string | undefined;
  setAccessToken: (newTokenValue: string) => void;
  deleteAccessToken: () => void;

  getRefreshToken: () => string | null;
  setRefreshToken: (refreshToken?: string) => void;
  removeRefreshToken: () => void;

  loginState: LoginState;
  setLogin: () => void;
  setLogout: () => void;
  checkIsLogin: () => boolean;
}

const authContext = createContext<AuthContextValueType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const tokenManager = useTokenManager();
  const authState = useAuthState();

  // 통합된 로그아웃 처리 (두 관심사를 연결하는 지점)
  const setLogout = () => {
    authState.setLogoutState();
    // 개발 환경일 시, 로컬 스토리지에 저장한 Refresh Token 제거
    tokenManager.removeRefreshToken();
  };

  // 기존 인터페이스 완전 유지
  const contextValue: AuthContextValueType = {
    ...tokenManager,
    ...authState,
    setLogout // 통합된 로그아웃 로직 사용
  };

  return <authContext.Provider value={contextValue}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
