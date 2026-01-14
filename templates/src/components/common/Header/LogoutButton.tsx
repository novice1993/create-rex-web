import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import { useApiRequest } from "@/hooks/http/useApiRequest";
import { useTranslation } from "react-i18next";
import { Button, Text, Tooltip } from "@mantine/core";
import { BiLogOut } from "react-icons/bi";
import { serverUrlPath } from "@/constants/serverUrlPath";
import styles from "./Header.module.css";

const getCurrentTime = () => {
  return new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false // 24시간 형식
  });
};

const LogoutButton = () => {
  const { setLogout } = useAuthContext();
  const { apiPost } = useApiRequest();
  const { t } = useTranslation();
  const [currentTime, setTime] = useState(() => getCurrentTime());

  const handleClickLogoutButton = async () => {
    try {
      const result = await apiPost(serverUrlPath.LOGOUT);
      console.log(result.statusText);
    } catch (error) {
      console.error("[Error]", error);
    } finally {
      setLogout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime()); // 1초마다 현재 시간을 업데이트
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <div style={{ width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center", color: "whtie" }}>
      <div style={{ width: "172px", textAlign: "left" }}>
        <Text c="white">{currentTime}</Text>
      </div>

      <Text c="white">|</Text>
      <Tooltip label={t("logout")}>
        <Button variant="subtle" style={{ color: "white", padding: "0", paddingLeft: "5px" }} onClick={handleClickLogoutButton}>
          <BiLogOut className={styles["logout-button"]} size={22} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default LogoutButton;
