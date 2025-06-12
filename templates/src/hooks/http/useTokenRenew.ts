import { useRef } from "react";
import { AxiosInstance } from "axios";
import { useAuthContext } from "@/providers/AuthProvider";
import { processRequestQueue } from "./requestQueue";

import { serverUrlPath } from "@/constants/serverUrlPath";

// 서버에서 반환하는 statusText
enum TokenErrorStatusText {
  ACCESS_TOKEN_EXPIRE = "Access token is expired",
  ACCESS_TOKEN_NO_PROVIDED = "No access token provided",
  REFRESH_TOKEN_EXPIRE = "Refresh token is expired"
}

export const useTokenRenew = (axiosClient: AxiosInstance) => {
  const { setAccessToken, setLogout } = useAuthContext();
  const isTokenRefreshing = useRef<boolean>(false);

  const setTokenRefreshingState = (state: boolean) => {
    isTokenRefreshing.current = state;
  };

  // 액세스 토큰 갱신 함수
  const renewAccessToken = async () => {
    const response = await axiosClient.post(serverUrlPath.ACCESS_TOKEN_RENEW);
    const newToken = response?.data?.accessToken;

    if (newToken) {
      setAccessToken(newToken);
      setTokenRefreshingState(false);
      await processRequestQueue(newToken);
    }
  };

  // 리프레시 토큰 갱신 함수
  const renewRefreshToken = async () => {
    try {
      const response = await axiosClient.post(serverUrlPath.REFRESH_TOKEN_RENEW);
      const newToken = response?.data?.accessToken;

      if (newToken) {
        setAccessToken(newToken);
        setTokenRefreshingState(false);
        await processRequestQueue(newToken);
      }
    } catch (error) {
      console.error(error);
      return setLogout();
    }
  };

  // 최종 반환 함수 : statusText에 따라 어떤 토큰 갱신이 필요한지 구분하여 처리
  const renewToken = async (errorText: string) => {
    setTokenRefreshingState(true); // 토큰 갱신 중으로 변경

    if (errorText === TokenErrorStatusText.ACCESS_TOKEN_EXPIRE) {
      return await renewAccessToken();
    }

    if (errorText === TokenErrorStatusText.REFRESH_TOKEN_EXPIRE) {
      return await renewRefreshToken();
    }

    console.error("An error about token occurred during HTTP network. Please log in again.");
    return setLogout();
  };

  return { renewToken, isTokenRefreshing: isTokenRefreshing.current };
};
