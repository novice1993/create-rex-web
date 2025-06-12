import { AxiosError } from "axios";
import { DefaultResponse, DefaultErrorResponse, ExcelFileType } from "@/hooks/http/type.http";

const TIMEOUT_ERROR_MESSAGE = "타임아웃 오류가 발생했습니다.\n검색 조건을 조절하여 다시 시도해주세요.";

export const useApiResponse = () => {
  const checkTimeout = (statusCode: string) => {
    if (statusCode === AxiosError.ETIMEDOUT || statusCode === AxiosError.ECONNABORTED) {
      return true;
    }
    return false;
  };

  const checkExcelBlobType = (response: ExcelFileType) => {
    if (response instanceof Blob) {
      if (response.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return true;
    }
    return false;
  };

  const openFileResponse = <T>(response: ExcelFileType): Promise<T> => {
    //Blob 데이터를 읽어서 파싱하는 작업
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        try {
          const text = event.target?.result as string;
          const jsonData = JSON.parse(text);
          resolve(jsonData as T);
        } catch (error) {
          reject(error as T);
        }
      };
      reader.readAsText(response);
    });
  };

  const response204ForModal = async <T>(response: T) => {
    const target = response as unknown as DefaultResponse<T>;
    let targetValue = target.data;
    if (!targetValue && !checkExcelBlobType(response as ExcelFileType)) {
      //엑셀의 경우, 204인 응답으로 파일 다운로드를 진행할 경우 손상된 파일로 다운로드 됨
      //강제 에러를 만들어서 파일 다운로드를 막고, 에러 메시지를 표출해야 함
      const excelResult = await openFileResponse<DefaultResponse<T>>(response as ExcelFileType);
      targetValue = excelResult?.data;
    }

    const error = targetValue as unknown as DefaultErrorResponse;
    if (error?.statusCode === 204) {
      responseErrorForModal(error);
      return true;
    }

    return false;
  };

  const responseErrorForModal = async (response: DefaultErrorResponse) => {
    const errorExists = response?.statusCode !== 200;
    const errorMessage = response?.message;
    const errorTimeout = checkTimeout(response?.code as string);

    if (errorTimeout === true) {
      // axios 타임아웃 오류일 때
      console.error(TIMEOUT_ERROR_MESSAGE);
    } else if (errorExists && errorMessage) {
      // 200이 아닐 때
      console.error(errorMessage);
    } else if (errorExists && !errorMessage) {
      // 200이 아닌 응답이 Blob 형태일 때
      const excelResponse = response as unknown as ExcelFileType;
      const excelResult = await openFileResponse<DefaultErrorResponse>(excelResponse);
      console.error(excelResult.message);
    }
  };

  return {
    response204ForModal,
    responseErrorForModal
  };
};
