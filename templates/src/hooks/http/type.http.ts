import { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

/** useApiRequest에서 반환하는 API 타입 */
export interface HttpApiType<T> {
  GET: (url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  POST: (url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  PUT: (url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  PATCH: (url: string, data?: object, signal?: AbortSignal, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  DELETE: (url: string, signal?: AbortSignal, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

/** 서버에서 받아온 Response Data 기본형 타입 */
export interface DefaultResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface DefaultErrorResponse {
  code?: string;
  statusCode: number;
  message: string;
  error: {
    code: string;
    message: string;
  };
}

export type ErrorResponseType = AxiosError<DefaultErrorResponse>;

export type ExcelFileType = Blob;

export const DefaultExcelConfig: AxiosRequestConfig = {
  responseType: "blob"
};
