import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

type RequestInterceptorFulfilled = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
type RequestInterceptorRejected = (error: any) => any;
type ResponseInterceptorFulfilled = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
type ResponseInterceptorRejected = (error: AxiosError) => any;

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, timeout?: number) {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      timeout: timeout || 1000 * 60 * 5,
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) => (Array.isArray(value) ? value.map(v => `${key}=${encodeURIComponent(v)}`).join("&") : `${key}=${encodeURIComponent(value)}`))
          .join("&");
      }
    });
  }

  // Controlled Exposure: 인터셉터 관리
  addRequestInterceptor(onFulfilled: RequestInterceptorFulfilled, onRejected?: RequestInterceptorRejected): number {
    return this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);
  }

  addResponseInterceptor(onFulfilled: ResponseInterceptorFulfilled, onRejected?: ResponseInterceptorRejected): number {
    return this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
  }

  removeRequestInterceptor(interceptorId: number): void {
    this.axiosInstance.interceptors.request.eject(interceptorId);
  }

  removeResponseInterceptor(interceptorId: number): void {
    this.axiosInstance.interceptors.response.eject(interceptorId);
  }

  // HTTP 메서드들
  async request<T>(method: string, url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.request<T>({
      method,
      url,
      ...(method === "GET" ? { params: data } : { data }),
      signal,
      ...config
    });
  }

  getRequest = <T>(url: string, params?: object, signal?: AbortSignal, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>("GET", url, params, signal, config);
  };

  postRequest = <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>("POST", url, data, signal, config);
  };

  putRequest = <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>("PUT", url, data, signal, config);
  };

  patchRequest = <T>(url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>("PATCH", url, data, signal, config);
  };

  deleteRequest = <T>(url: string, signal?: AbortSignal, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>("DELETE", url, undefined, signal, config);
  };
}
