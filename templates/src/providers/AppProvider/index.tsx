import { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "../AuthProvider";
import { MantineProvider } from "../MantineProvider";
import { TokenPromiseProvider } from "@/hooks/http/TokenPromise";
import { SchemeColorProvider } from "../SchemeColorProvider";

/**
 * tasntack-query 기본 옵션 셋팅
 *  - 기본 재시도 회수 : 3번
 *  - 기본 재시도 간격 : 1초
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

/**
 * Query Client Provider : tanstack-query 인스턴스 설정 및 공유 Provider
 * Auth Provider : 로그인 상태, 토큰 관리 Provider
 * Mantine Provider : Mantine Theme 설정 Provider
 * Scheme Color Provider : Theme 에 설정한 Color 공유 Provider
 */
export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TokenPromiseProvider>
          <MantineProvider>
            <SchemeColorProvider>{children}</SchemeColorProvider>
          </MantineProvider>
        </TokenPromiseProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
