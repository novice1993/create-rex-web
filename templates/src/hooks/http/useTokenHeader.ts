import { AxiosRequestConfig } from "axios";
import { useAuthContext } from "@/providers/AuthProvider";

/**
 * 토큰 헤더 관리 전용 Hook
 * - HTTP 요청 시 헤더에 토큰을 첨부하는 기능만 담당
 * - 요청 전처리 단계에서 사용
 */
export function useTokenHeader() {
  const { getAccessToken } = useAuthContext();

  /**
   * HTTP 요청 헤더에 액세스 토큰을 추가하는 함수
   * @param config - 기존 Axios 요청 설정
   * @returns 토큰이 추가된 새로운 설정 객체
   */
  function addTokenToHeaders(config?: AxiosRequestConfig): AxiosRequestConfig {
    const token = getAccessToken();

    return {
      ...config,
      headers: {
        ...config?.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };
  }

  return {
    addTokenToHeaders
  };
}
