import { useQueryClient } from "@tanstack/react-query";

const REFRESH_TOKEN_KEY = "DEV_REFRESH_TOKEN";
const tokenKey = "ACCESS_TOKEN";

// 토큰 관리 전용 훅
export const useTokenManager = () => {
  const queryClient = useQueryClient();

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

  // 리프레시 토큰 값 반환 (환경변수로 제어)
  const getRefreshToken = (): string | null => {
    if (import.meta.env.VITE_ENABLE_REFRESH_TOKEN === "true") {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  };

  // 리프레시 토큰 값 설정 (환경변수로 제어)
  const setRefreshToken = (refreshToken?: string) => {
    if (refreshToken && import.meta.env.VITE_ENABLE_REFRESH_TOKEN === "true") {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  };

  // 리프레시 토큰 값 제거 (환경변수로 제어)
  const removeRefreshToken = () => {
    if (import.meta.env.VITE_ENABLE_REFRESH_TOKEN === "true") {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  };

  return {
    getAccessToken,
    setAccessToken,
    deleteAccessToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken
  };
};
