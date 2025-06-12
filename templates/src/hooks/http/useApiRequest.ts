import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthContext } from "@/providers/AuthProvider";
import { useTokenRenew } from "./useTokenRenew";
import { determineRequestAction, saveRequestInQueue } from "./requestQueue";

const baseUrl = import.meta.env.VITE_SERVER_URL ?? "";
const defaultTimeout = 1000 * 60 * 5;

export const useApiRequest = (timeout?: number) => {
  const axiosClient = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    timeout: timeout || defaultTimeout // 대기시간
  });

  const { getAccessToken } = useAuthContext();
  const { renewToken, isTokenRefreshing } = useTokenRenew(axiosClient);

  // HTTP header에 token setting 하는 API
  const setAccessTokenInHeader = (config: AxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken && config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
  };

  // HTTP 요청 시, 토큰 갱신 상태에 따라 request queue에 보관할지 그냥 처리할지 판별 (Error 발생 시 log 출력 후 Error throw)
  axiosClient.interceptors.request.use(
    config => {
      setAccessTokenInHeader(config);
      return determineRequestAction(isTokenRefreshing, config);
    },
    error => {
      console.error("[Request Error]:", error.message);
      return Promise.reject(error);
    }
  );

  // 토큰 만료 시 (401 에러) 갱신 함수 호출 + 에러 관련 log 출력 후 Error throw
  axiosClient.interceptors.response.use(
    response => response,
    async error => {
      if (!error.response) {
        console.error("[Response Fail]:", `Error: ${error}`);
        return Promise.reject(error);
      }

      console.error("[Response Error]:", `Status: ${error.response.status}, Message: ${error.response.statusText}`);
      if (error.response?.status === 401) {
        await saveRequestInQueue(error.config); // 기존 요청을 request queue에 저장
        await renewToken(error.response.statusText); // 토큰 갱신 처리
      } else {
        return Promise.reject(error);
      }
    }
  );

  const apiRequest = async <T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    requestBody?: object,
    signal?: AbortSignal,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return await axiosClient.request<T>({
      method,
      url,
      ...(method === "GET" ? { params: requestBody } : { data: requestBody }),
      signal,
      ...config
    });
  };

  return {
    apiGet: <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => apiRequest<T>("GET", url, data, signal, config),
    apiPost: <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => apiRequest<T>("POST", url, data, signal, config),
    apiPut: <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => apiRequest<T>("PUT", url, data, signal, config),
    apiDelete: <T>(url: string, signal?: AbortSignal, config?: AxiosRequestConfig) => apiRequest<T>("DELETE", url, undefined, signal, config)
  };
};
