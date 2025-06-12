import { useApiRequest } from "./http/useApiRequest";
import { useAuthContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";

import { serverUrlPath } from "@/constants/serverUrlPath";

export const useInitalizeLoginState = () => {
  const [isInitialize, setInitialize] = useState(false);

  const { apiPost } = useApiRequest();
  const { setAccessToken, setLogin, setLogout } = useAuthContext();

  /**
   * 로그인 관련 초기 값 셋팅이 된 이후에 하위 컴포넌트가 렌더링 될 수 있도록 설정하는 장치
   */
  useEffect(function setInitializeLoginState() {
    setInitialize(true);
  }, []);

  /**
   * 리로드 시 서버에 로그인 여부 확인 후 Access Token 재발급 요청
   */
  useEffect(() => {
    const verifyLoginStateInServer = async () => {
      try {
        const result = (await apiPost<{ data: { accessToken: string } }>(serverUrlPath.TOKEN_INIT_WHEN_RELOAD)).data;

        if (result) {
          const accessToken = result.data.accessToken;

          setAccessToken(accessToken);
          setLogin();
        }
      } catch (error) {
        console.error(error);
        setLogout();
      }
    };

    verifyLoginStateInServer();
  }, []);

  return { isInitialize };
};
