import { setupWorker } from "msw/browser";

// 브라우저 Service Worker 설정 (명시적 설정 추가)
export const worker = setupWorker();

// 서비스 워커 설정 노출
export const startWorker = async () => {
  return worker.start({
    // 디버깅을 위해 모든 요청 로깅
    onUnhandledRequest: "warn",

    // 서비스 워커 설정
    serviceWorker: {
      url: "/mockServiceWorker.js",
      options: {
        scope: "/"
      }
    }
  });
};
