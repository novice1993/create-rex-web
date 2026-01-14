import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { useAuthContext } from "@/providers/AuthProvider";
import { useTokenPromise } from "./TokenPromise";
import { HttpClient } from "./HttpClient";
import { ServerUrlPath } from "@/constants/serverUrlPath";

// 서버 에러 응답 타입 정의
interface ServerErrorResponse {
  error: {
    message: string;
  };
}

const TOKEN_ERROR_MESSAGE = {
  ACCESS_TOKEN_EXPIRE: "Access token is expired",
  ACCESS_TOKEN_INVALID: "Access token is invalid",
  REFRESH_TOKEN_EXPIRE: "Refresh token is expired",
  REFRESH_TOKEN_INVALID: "Refresh token is invalid"
} as const;

const baseUrl = import.meta.env.VITE_SERVER_URL ?? "";

// 토큰 갱신 전용 Hook
export function useTokenRenew() {
  const systemHttpClient = new HttpClient(baseUrl); // 토큰 갱신 전용 HTTP 클라이언트 (axios interceptor 우회)
  const { setAccessToken, getRefreshToken, setRefreshToken, setLogout } = useAuthContext();
  const { initTokenRefreshPromise, setTokenRefreshPromise } = useTokenPromise();

  // 갱신된 토큰으로 원본 요청 재시도
  function retryOriginalRequest(error: AxiosError<ServerErrorResponse>, newToken: string, httpClient: HttpClient): Promise<AxiosResponse<unknown>> {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalConfig: AxiosRequestConfig = {
      ...error.config,
      headers: {
        ...error.config.headers,
        Authorization: `Bearer ${newToken}`
      }
    };

    return httpClient.request(originalConfig.method || "GET", originalConfig.url || "", originalConfig.data || originalConfig.params, originalConfig.signal as AbortSignal, originalConfig);
  }

  // 강제 로그아웃 처리
  function handleForceLogout(error: AxiosError<ServerErrorResponse>): Promise<never> {
    setLogout();
    return Promise.reject(error);
  }

  // 토큰 갱신 요청 (환경별 분기처리)
  async function requestTokenRenewal(): Promise<AxiosResponse<{ data: { accessToken: string; refreshToken?: string } }>> {
    if (import.meta.env.VITE_ENABLE_REFRESH_TOKEN === "true") {
      // refreshToken 포함하여 요청
      return systemHttpClient.postRequest<{ data: { accessToken: string; refreshToken: string } }>(ServerUrlPath.ACCESS_TOKEN_RENEW, { refreshToken: getRefreshToken() });
    } else {
      // refreshToken 없이 요청
      return systemHttpClient.postRequest<{ data: { accessToken: string } }>(ServerUrlPath.ACCESS_TOKEN_RENEW);
    }
  }

  // 응답에서 토큰 추출
  function extractTokens(response: AxiosResponse<{ data: { accessToken: string; refreshToken?: string } }>) {
    return {
      accessToken: response?.data?.data.accessToken,
      refreshToken: (response?.data?.data as { refreshToken?: string })?.refreshToken
    };
  }

  // 토큰 설정 (환경별 분기처리)
  function setTokens(tokens: { accessToken?: string; refreshToken?: string }) {
    if (tokens.accessToken) {
      setAccessToken(tokens.accessToken);

      // refreshToken 활성화 시에만 설정
      if (import.meta.env.VITE_ENABLE_REFRESH_TOKEN === "true" && tokens.refreshToken) {
        setRefreshToken(tokens.refreshToken);
      }
    }
  }

  /**
   * 토큰 갱신 에러 처리
   * @param renewError - 갱신 과정에서 발생한 에러
   * @param originalError - 원본 에러
   * @param httpClient - HTTP 클라이언트
   * @returns 처리된 응답 또는 rejected Promise
   */
  async function handleRenewalError(renewError: unknown, originalError: AxiosError<ServerErrorResponse>, httpClient: HttpClient): Promise<AxiosResponse<unknown> | never> {
    console.error("Error during token renewal:", renewError);

    // Refresh token expired 체크 후 중첩 처리
    const errorMessage = (renewError as AxiosError<ServerErrorResponse>)?.response?.data?.error?.message;

    if (errorMessage === TOKEN_ERROR_MESSAGE.REFRESH_TOKEN_EXPIRE) {
      return await handleRefreshTokenRenew(originalError, httpClient);
    }

    // 기타 에러는 로그아웃
    return handleForceLogout(originalError);
  }

  // Access Token 갱신 (메인 로직)
  async function handleTokenRenew(error: AxiosError<ServerErrorResponse>, httpClient: HttpClient): Promise<AxiosResponse<unknown>> {
    try {
      const response = await requestTokenRenewal();
      const tokens = extractTokens(response);

      setTokenRefreshPromise(Promise.resolve(response));

      if (tokens.accessToken) {
        setTokens(tokens);
        // 🔄 재시도는 원본 httpClient 사용 (인터셉터 적용)
        return retryOriginalRequest(error, tokens.accessToken, httpClient);
      }

      return handleForceLogout(error);
    } catch (renewError) {
      return handleRenewalError(renewError, error, httpClient);
    }
  }

  // Refresh Token 갱신 에러 처리
  async function handleRefreshTokenRenewError(renewError: unknown, originalError: AxiosError<ServerErrorResponse>): Promise<AxiosResponse<unknown> | never> {
    console.error("Error during refresh token renewal:", renewError);

    initTokenRefreshPromise();
    return handleForceLogout(originalError);
  }

  // Refresh Token 자체 갱신 (메인 로직)
  async function handleRefreshTokenRenew(error: AxiosError<ServerErrorResponse>, httpClient: HttpClient): Promise<AxiosResponse<unknown>> {
    try {
      const response = await requestTokenRenewal();
      const tokens = extractTokens(response);

      if (tokens.accessToken) {
        setTokens(tokens);
        return retryOriginalRequest(error, tokens.accessToken, httpClient);
      }

      return handleForceLogout(error);
    } catch (renewError) {
      return handleRefreshTokenRenewError(renewError, error);
    }
  }

  // 에러 타입별 처리 전략 매핑 (전략 패턴)
  function createErrorStrategies(retryHttpClient: HttpClient) {
    return {
      [TOKEN_ERROR_MESSAGE.ACCESS_TOKEN_EXPIRE]: (error: AxiosError<ServerErrorResponse>) => handleTokenRenew(error, retryHttpClient),
      [TOKEN_ERROR_MESSAGE.REFRESH_TOKEN_EXPIRE]: (error: AxiosError<ServerErrorResponse>) => handleRefreshTokenRenew(error, retryHttpClient),

      // Invalid Token 관련: 강제 로그아웃
      [TOKEN_ERROR_MESSAGE.ACCESS_TOKEN_INVALID]: handleForceLogout,
      [TOKEN_ERROR_MESSAGE.REFRESH_TOKEN_INVALID]: handleForceLogout
    } as const;
  }

  // 통합 응답 에러 핸들러 (전략 패턴 사용)
  function handleResponseError(error: AxiosError<ServerErrorResponse>, retryHttpClient: HttpClient): Promise<AxiosResponse<unknown> | never> {
    const serverErrorMessage = error.response?.data?.error?.message;
    const ERROR_STRATEGIES = createErrorStrategies(retryHttpClient);
    const strategy = ERROR_STRATEGIES[serverErrorMessage as keyof typeof ERROR_STRATEGIES];

    return strategy ? strategy(error) : Promise.reject(error);
  }

  return {
    handleResponseError
  };
}
