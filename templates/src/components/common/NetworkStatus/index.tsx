import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { Error } from "./Error";
import { Loading } from "./Loading";

interface NetworkStatusProps {
  resetKeys?: unknown[];
}

export const NetworkStatus = (props: PropsWithChildren<NetworkStatusProps>) => {
  const { children, resetKeys } = props;
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        const errorMessage = error?.response?.data?.message ?? error?.message;
        return <Error errorMessage={errorMessage} />;
      }}
      resetKeys={resetKeys}
    >
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
