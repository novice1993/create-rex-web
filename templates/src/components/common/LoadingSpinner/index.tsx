import { LoadingOverlay } from "@mantine/core";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";

type PxString = `${number}px`;
type SpinnerSizeType = "xs" | "xl" | "sm" | "md" | "lg" | PxString;

export interface LoadingSpinnerProps {
  size?: SpinnerSizeType;
  color?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { systemBlue } = useSharedSchemeColor();
  const { size = "xl", color = systemBlue } = props;

  return (
    <LoadingOverlay
      visible={true}
      zIndex={1000}
      overlayProps={{ blur: 2 }}
      loaderProps={{ color: color, size: size }}
    />
  );
};

export default LoadingSpinner;
