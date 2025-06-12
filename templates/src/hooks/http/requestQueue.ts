import axios, { InternalAxiosRequestConfig } from "axios";
import { serverUrlPath } from "@/constants/serverUrlPath";

const requestQueue = new Map<string, InternalAxiosRequestConfig>();

// Request Queue에 요청 저장
export const saveRequestInQueue = (config: InternalAxiosRequestConfig) => {
  return new Promise<InternalAxiosRequestConfig>(resolve => {
    if (config.url && !requestQueue.has(config.url)) {
      requestQueue.set(config.url, config);
      resolve(config);
    }
  });
};

// 토큰 갱신 상태에 따라 Request Queue에 보관 여부 판별
export const determineRequestAction = (isTokenRefreshing: boolean, config: InternalAxiosRequestConfig) => {
  const isTokenRenewRequest = config.url === serverUrlPath.REFRESH_TOKEN_RENEW;

  // 토큰 갱신 중일 때, Request 가 토큰 갱신과 관련된 것이 아니면 -> Queue에 보관
  if (isTokenRefreshing && !isTokenRenewRequest) {
    return saveRequestInQueue(config);
  }

  return config;
};

// Queue에 보관한 요청 token 갱신 후 API 처리
export const processRequestQueue = async (newToken: string) => {
  for (const [key, requestConfig] of requestQueue) {
    requestConfig.headers.Authorization = `Bearer ${newToken}`;

    console.log("requestQueue url : ", key);
    await axios.request(requestConfig);
  }

  return requestQueue.clear();
};
