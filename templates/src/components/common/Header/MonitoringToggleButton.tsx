import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const iconSize = 26;

const toggleIcons = (
  <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3623_17414)">
      <path
        d="M31.2997 13.709H29.4997C28.433 8.0378 24.0997 3.76769 18.3663 2.70016C17.5663 2.56672 16.7663 2.5 15.9663 2.5C15.9663 2.5 15.8997 2.5 15.833 2.5C15.833 2.5 15.833 2.56672 15.833 2.63344V4.16801C15.833 4.16801 15.8997 4.30145 15.9663 4.30145C16.633 4.30145 17.3663 4.30145 18.033 4.50161C22.833 5.36898 26.4997 8.97189 27.5663 13.6423H25.8997C25.8997 13.6423 25.7663 13.6423 25.7663 13.709C25.7663 13.709 25.7663 13.8425 25.7663 13.9092L28.433 18.5796C28.433 18.5796 28.4997 18.6464 28.5663 18.6464C28.633 18.6464 28.6997 18.6464 28.6997 18.5796L31.3663 13.9092C31.3663 13.9092 31.3663 13.7758 31.3663 13.709C31.3663 13.709 31.2997 13.6423 31.233 13.6423L31.2997 13.709Z"
        fill="white"
      />
      <path
        d="M13.9 27.9872C9.1 27.1198 5.43333 23.5836 4.36667 18.8465H6.03333C6.03333 18.8465 6.16667 18.8465 6.16667 18.7798C6.16667 18.7798 6.16667 18.6463 6.16667 18.5796L3.5 13.9092C3.5 13.9092 3.3 13.8424 3.23333 13.9092L0.5 18.6463C0.5 18.6463 0.5 18.7798 0.5 18.8465C0.5 18.8465 0.566667 18.9132 0.633333 18.9132H2.43333C3.5 24.5844 7.83333 28.9213 13.5667 29.9221C14.4333 30.0555 15.2333 30.1222 15.9667 30.1222C15.9667 30.1222 16.0333 30.1222 16.1 30.1222C16.1 30.1222 16.1 30.0555 16.1 29.9888V28.4542C16.1 28.4542 16.0333 28.2541 15.9667 28.2541C15.3 28.2541 14.5667 28.2541 13.9 28.0539V27.9872Z"
        fill="white"
      />
      <path
        d="M23.3665 13.5089H15.0998C14.0998 13.5089 13.2998 14.3096 13.2998 15.3104V23.5837C13.2998 24.5845 14.0998 25.3852 15.0998 25.3852H23.3665C24.3665 25.3852 25.1665 24.5845 25.1665 23.5837V15.3104C25.1665 14.3096 24.3665 13.5089 23.3665 13.5089ZM23.2331 23.4503H15.2331V15.4438H23.2331V23.4503Z"
        fill="white"
      />
      <path
        d="M9.43379 19.8474H11.9671C11.9671 19.8474 12.1005 19.7806 12.1005 19.7139V18.1126C12.1005 18.1126 12.0338 17.9792 11.9671 17.9792H9.56712V9.97274H17.5671V12.3747C17.5671 12.3747 17.6338 12.5081 17.7005 12.5081H19.3005C19.3005 12.5081 19.5005 12.4414 19.5005 12.3747V9.83929C19.5005 8.83849 18.7005 8.03784 17.7005 8.03784H9.43379C8.43379 8.03784 7.63379 8.83849 7.63379 9.83929V18.1126C7.63379 19.1134 8.43379 19.9141 9.43379 19.9141V19.8474Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_3623_17414">
        <rect width="31" height="27.5556" fill="white" transform="translate(0.5 2.5)" />
      </clipPath>
    </defs>
  </svg>
);

const MonitoringToggleButton = () => {
  const router = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isMonitoringPageWhenRendered = () => {
    if (location.pathname === "/monitoring") return true;
    else return false;
  };

  const [isMonitorinPage, setIsMonitoringPage] = useState(isMonitoringPageWhenRendered);

  const handleClickMonitoringToggleButton = () => {
    router(isMonitorinPage ? "/" : "/monitoring"); // 라우터 경로 변경
    setIsMonitoringPage(prevState => !prevState); // 모니터링 모드 여부 변경
  };

  return (
    <div style={{ width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center", color: "whtie" }}>
      <Typography variant="body1" color="white">
        |
      </Typography>

      <Tooltip title={isMonitorinPage ? t("vehicleInquiryPage") : t("monitoringPage")}>
        <Button id="monitoringToggleButton" style={{ backgroundColor: "transparent", color: "white", padding: "0", paddingLeft: "5px" }} onClick={handleClickMonitoringToggleButton}>
          {toggleIcons}
        </Button>
      </Tooltip>
    </div>
  );
};

export default MonitoringToggleButton;
