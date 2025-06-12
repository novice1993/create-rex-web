import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// MSW는 개발 환경에서만 활성화합니다.
// VITE_ENABLE_MSW 환경 변수를 사용하여 제어할 수 있습니다.
if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === "true") {
  import("./mocks/utils/browser").then(({ worker }) => {
    worker.start({
      onUnhandledRequest: "bypass" // 처리되지 않은 요청은 무시하고 실제 네트워크로 전달
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
