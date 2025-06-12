import { Backdrop, CircularProgress } from "@mui/material";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";

type PxString = `${number}px`;
type SpinnerSizeType = "xs" | "xl" | "sm" | "md" | "lg" | PxString;

export interface LoadingSpinnerProps {
  size?: SpinnerSizeType;
  color?: string;
}

const sizeMap = {
  xs: 20,
  sm: 30,
  md: 40,
  lg: 50,
  xl: 60
};

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { systemBlue } = useSharedSchemeColor();
  const { size = "xl", color = systemBlue } = props;

  const spinnerSize = typeof size === "string" && size in sizeMap ? sizeMap[size as keyof typeof sizeMap] : typeof size === "string" && size.endsWith("px") ? parseInt(size) : 60;

  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
    >
      <CircularProgress size={spinnerSize} sx={{ color }} />
    </Backdrop>
  );
};

export default LoadingSpinner;
