import { useState, useEffect } from "react";
import { waitForMSW } from "../utils";

/**
 * MSW 초기화 상태를 관리하는 훅
 * 개발 환경에서만 MSW를 초기화하고, 프로덕션에서는 항상 준비 완료 상태 반환
 */
export function useMswInit() {
  const [isReady, setIsReady] = useState(
    // 프로덕션 환경이거나 이미 초기화된 경우 true로 시작
    process.env.NODE_ENV !== "development" || (typeof window !== "undefined" && window.__MSW_RUNNING === true)
  );

  useEffect(() => {
    // 개발 환경에서만 실행
    if (process.env.NODE_ENV === "development" && !isReady) {
      // MSW 초기화 완료 대기
      waitForMSW()
        .then(() => {
          console.log("[MSW] 초기화 완료, 앱에서 사용 가능합니다.");
          setIsReady(true);
        })
        .catch(err => {
          console.error("[MSW] 초기화 실패:", err);
          // 실패해도 앱은 계속 진행
          setIsReady(true);
        });
    }
  }, [isReady]);

  return { isReady };
}

// 전역 타입 정의 (index.ts에서 가져옴)
declare global {
  interface Window {
    __MSW_RUNNING?: boolean;
  }
}
