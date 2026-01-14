import { AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useTokenPromise } from "./TokenPromise";
import { useTokenHeader } from "./useTokenHeader";
import { useTokenRenew } from "./useTokenRenew";
import { HttpClient } from "./HttpClient";
import { DefaultErrorResponse } from "./type.http";

const baseUrl = import.meta.env.VITE_SERVER_URL ?? "";

export function useApiRequest() {
  const httpClient = new HttpClient(baseUrl);
  const { getRequest, postRequest, putRequest, patchRequest, deleteRequest } = httpClient;

  const { waitForTokenRefresh } = useTokenPromise();
  const { addTokenToHeaders } = useTokenHeader();
  const { handleResponseError } = useTokenRenew();

  // 토큰 관련 request interceptor 설정
  httpClient.addRequestInterceptor(async (config: InternalAxiosRequestConfig) => {
    await waitForTokenRefresh();
    const configWithToken = addTokenToHeaders(config);
    return configWithToken as InternalAxiosRequestConfig;
  });

  // 401 에러 처리를 위한 Response Interceptor 설정
  httpClient.addResponseInterceptor(
    response => response, // 정상 응답은 그대로 통과
    error => handleResponseError(error as AxiosError<DefaultErrorResponse>, httpClient)
  );

  const apiGet = <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => getRequest<T>(url, data, signal, config);
  const apiPost = <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => postRequest<T>(url, data, signal, config);
  const apiPut = <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => putRequest<T>(url, data, signal, config);
  const apiPatch = <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => patchRequest<T>(url, data, signal, config);
  const apiDelete = <T>(url: string, signal?: AbortSignal, config?: AxiosRequestConfig) => deleteRequest<T>(url, signal, config);

  return {
    apiGet,
    apiPost,
    apiPut,
    apiPatch,
    apiDelete
  };
}
