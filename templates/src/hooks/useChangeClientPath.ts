import { useNavigate } from "react-router-dom";
import { clientPagePath } from "@/constants/clientPagePath";

/**
 * 클라이언트 url 경로를 변경하는 API를 반환하는 커스텀 훅
 */
export const useChangeClientPath = () => {
  const router = useNavigate();

  const moveToLoginPage = () => {
    router(clientPagePath.LOGIN_PAGE);
  };

  const moveToMainPage = () => {
    router(clientPagePath.MAIN_PAGE);
  };

  return { moveToLoginPage, moveToMainPage };
};
