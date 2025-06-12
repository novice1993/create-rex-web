import { startWorker } from "./browser";

// MSW 초기화 완료 이벤트 이름
const MSW_READY_EVENT = "msw:ready";

// 브라우저 환경에서만 MSW 시작
async function initMSW() {
  if (typeof window === "undefined") return;

  console.log("[MSW] 초기화 시작");

  try {
    await startWorker();
    console.log("[MSW] 모킹 서버가 시작되었습니다");

    // 전역 객체에 MSW 상태 설정 (디버깅용)
    window.__MSW_RUNNING = true;

    // MSW 초기화 완료 이벤트 발생
    window.dispatchEvent(new CustomEvent(MSW_READY_EVENT));
  } catch (error) {
    console.error("[MSW] 초기화 실패:", error);
  }
}

// MSW 준비 완료 여부 확인 함수 (컴포넌트에서 사용)
export function waitForMSW() {
  return new Promise<void>(resolve => {
    // 이미 초기화되었으면 즉시 해결
    if (window.__MSW_RUNNING) {
      resolve();
      return;
    }

    // 초기화 완료 이벤트 기다림
    const handleReady = () => {
      window.removeEventListener(MSW_READY_EVENT, handleReady);
      resolve();
    };

    window.addEventListener(MSW_READY_EVENT, handleReady);
  });
}

// 개발 환경에서만 MSW 시작
if (process.env.NODE_ENV === "development") {
  initMSW();
}

// 전역 타입 정의
declare global {
  interface Window {
    __MSW_RUNNING?: boolean;
  }
}
