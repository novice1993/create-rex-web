import { createContext, useContext, useRef, PropsWithChildren } from "react";

interface TokenPromiseContextType {
  initTokenRefreshPromise: () => void;
  setTokenRefreshPromise: <T = unknown>(promise: Promise<T>) => void;
  waitForTokenRefresh: () => Promise<void>;
}

const TokenPromiseContext = createContext<TokenPromiseContextType | null>(null);

export const TokenPromiseProvider = ({ children }: PropsWithChildren) => {
  const tokenRefreshPromiseRef = useRef<Promise<unknown> | null>(null);

  function initTokenRefreshPromise() {
    tokenRefreshPromiseRef.current = null;
  }

  function setTokenRefreshPromise<T = unknown>(promise: Promise<T>) {
    tokenRefreshPromiseRef.current = promise;
  }

  async function waitForTokenRefresh(): Promise<void> {
    // 1. 토큰 갱신 중이 아닐 때
    if (!tokenRefreshPromiseRef.current) {
      return;
    }

    // 2. 토큰 갱신 중일 때
    if (tokenRefreshPromiseRef.current) {
      await tokenRefreshPromiseRef.current;
      initTokenRefreshPromise();
    }
  }

  return <TokenPromiseContext.Provider value={{ initTokenRefreshPromise, setTokenRefreshPromise, waitForTokenRefresh }}>{children}</TokenPromiseContext.Provider>;
};

// TokenPromise Hook
export const useTokenPromise = (): TokenPromiseContextType => {
  const context = useContext(TokenPromiseContext);

  if (!context) {
    throw new Error("useTokenPromise must be used within TokenPromiseProvider");
  }

  return context;
};
