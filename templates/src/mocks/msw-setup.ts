/**
 * MSW 모킹 서버 설정 유틸리티
 *
 * 개발 환경에서만 MSW 모킹 서버를 초기화합니다.
 * 이 파일은 앱의 진입점(main.tsx)에서 한 번만 임포트하면 됩니다.
 *
 * MSW를 제거할 때는 이 파일의 임포트만 제거하면 됩니다.
 */

// 개발 환경에서만 MSW 초기화
async function initializeMockServer() {
  // 프로덕션 환경에서는 실행하지 않음
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  try {
    console.log("[MSW] 모킹 서버 초기화 중...");

    // MSW 모듈 동적 임포트
    await import("./utils");

    console.log("[MSW] 모킹 서버 초기화 완료");
  } catch (error) {
    console.error("[MSW] 모킹 서버 초기화 실패:", error);
  }
}

// 앱 시작 시 MSW 초기화 실행
initializeMockServer();

// MSW 제거 방법:
// 1. main.tsx에서 이 파일의 임포트 제거
// 2. mocks 디렉토리 제거
// 3. public/mockServiceWorker.js 파일 제거
// 4. useMswInit.ts 훅 제거
