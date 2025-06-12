import { PropsWithChildren, Suspense } from "react";
import LoadingSpinner from "./indext";
import { LoadingSpinnerProps } from "./indext";

const LoadingSpinnerSuspense = (props: PropsWithChildren<LoadingSpinnerProps>) => {
  const { size, color, children } = props;

  return <Suspense fallback={<LoadingSpinner size={size} color={color} />}>{children}</Suspense>;
};

export default LoadingSpinnerSuspense;
