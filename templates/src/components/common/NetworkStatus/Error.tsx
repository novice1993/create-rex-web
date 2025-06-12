import { CSSProperties, ReactNode } from "react";
import styles from "./network.module.css";

const DefaultIcon = () => {
  return (
    <svg width="34" height="29" viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3388_19587)">
        <path d="M32.8167 17.856L25.9353 11.6705H8.06402L1.18257 17.856L0.233398 16.8021L7.51861 10.2559H26.4807L33.7659 16.8021L32.8167 17.856Z" fill="white" />
        <path
          d="M31.875 29.0001H2.125C0.952708 29.0001 0 28.0488 0 26.8782V16.6221H11.3333V17.3294C11.3333 19.0835 12.7642 20.5123 14.5208 20.5123H19.4792C21.2358 20.5123 22.6667 19.0835 22.6667 17.3294V16.6221H34V26.8782C34 28.0488 33.0473 29.0001 31.875 29.0001ZM1.41667 18.0367V26.8782C1.41667 27.2672 1.73542 27.5855 2.125 27.5855H31.875C32.2646 27.5855 32.5833 27.2672 32.5833 26.8782V18.0367H24.0302C23.6902 20.2365 21.7777 21.9269 19.4792 21.9269H14.5208C12.2223 21.9269 10.3133 20.2365 9.96979 18.0367H1.41667Z"
          fill="white"
        />
        <path d="M10.1581 0.679996L8.96289 1.43945L11.4423 5.33022L12.6375 4.57077L10.1581 0.679996Z" fill="white" />
        <path d="M24.1952 0.680519L21.7158 4.57129L22.911 5.33075L25.3904 1.43998L24.1952 0.680519Z" fill="white" />
        <path d="M17.7087 0H16.292V4.59756H17.7087V0Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_3388_19587">
          <rect width="34" height="29" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const defaultErrorMessage = "해당 정보를 불러올 수 없습니다";

interface ErrorProps {
  Icon?: ReactNode;
  errorMessage?: string;
  style?: CSSProperties;
}

export const Error = (props: ErrorProps) => {
  const { Icon = <DefaultIcon />, errorMessage, style } = props;

  return (
    <div className={styles.errorContainer} style={style}>
      {Icon}

      <span style={{ color: "white" }}>{errorMessage ?? defaultErrorMessage}</span>
    </div>
  );
};
