import { createTheme, MantineProvider as Provider } from "@mantine/core";
import { ReactNode } from "react";

const theme = createTheme({
  fontFamily: "Pretendard, Inter, NotoSans, sans-serif",
  primaryColor: "cyan", // 새로 지정 필요
  autoContrast: true,
  luminanceThreshold: 0.3,
  // 사용에 관해서는 figma 참고 https://www.figma.com/design/yL0QpZzEJdUD0jprygb3GX/%5B%E1%84%8B%E1%85%A5%E1%86%AF%E1%84%80%E1%85%AE%E1%86%AF%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A9%5D-%E1%84%80%E1%85%AD%E1%84%8E%E1%85%A1%E1%84%85%E1%85%A9-%E1%84%83%E1%85%A2%E1%84%89%E1%85%B5%E1%84%87%E1%85%A9%E1%84%83%E1%85%B3-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B3%B5%EC%9C%A0%EB%B3%B8?node-id=1-39&t=QD4nGeh2fPw89CYx-4
  colors: {
    rex_main: ["rgba(34,92,208,0.1)", "rgba(34,92,208,0.24)", "#90ade7", "rgba(34,92,208,0.5)", "#386cd4", "#225cd0", "#1b49a6", "#14377c", "#0d2453", "#061229"],
    rex_black: ["#dde1e5", "#b4c0d3", "#a4a7b2", "#9598a5", "#8491a7", "#777b8b", "#6b6d7f", "#323442", "#21232e", "#11121b"],
    rex_gray: ["#ffffff", "#A1A1AA", "#e9e9e9", "#d1d1d1", "#bababa", "#a3a3a3", "#8b8b8b", "#747474", "#5d5d5d", "#393939"],
    rex_opacity: [
      "rgba(255,255,255,0.86)",
      "#ffffff",
      "rgba(107,109,127,0.40)",
      "#ffffff",
      "rgba(17,18,27,0.70)",
      "rgba(255,255,255,0.30)",
      "rgba(255,255,255,0.16)",
      "rgba(17,18,27,0.80)",
      "rgba(0,0,0,0.80)",
      "rgba(17,18,27,0.86)"
    ],
    rex_system_red: ["rgba(240,68,82,0.10)", "#fac6cb", "rgba(240,68,82,0.50)", "#f47c85", "rgba(240,68,82,0.80)", "#f04452", "#d83d49", "#a82f39", "#782229", "#481418"],
    rex_system_green: ["#e8f8f3", "#baebdb", "rgba(20,230,179,0.46)", "#5ed2ab", "#2fc593", "#19bf88", "#16ab7a", "#11855f", "#0c5f44", "rgba(1,83,63,0.50)"],
    rex_system_yellow: ["#fef7e8", "#fce7bc", "#fad790", "#f8c764", "#f6b738", "#f6af22", "#dd9d1e", "#ac7a17", "#7b5711", "#49340a"],
    rex_system_lime: ["#f2ffe3", "#e6ffcd", "#ccff9b", "#b2ff64", "#9cff38", "#8dff1c", "#85ff09", "#71e300", "#62c900", "#50ae00"],
    rex_graph_blue: ["rgba(145,161,251,0.10)", "#d3d9fd", "#bdc6fc", "#a7b3fb", "#91a1fb", "#8290e1", "#6766e2", "#5756df", "#4544b2", "rgba(87,86,223,0.10)"],
    rex_graph_sky: ["rgba(161,219,252,0.10)", "rgba(161,219,252,0.20)", "#bde5fc", "#a1dbfc", "#91d0fc", "#6dc1fb", "#49b2fa", "#3a8ec8", "#2b6a96", "rgba(73,178,250,0.10)"],
    rex_graph_purple: ["rgba(208,168,239,0.10)", "#ecdcf8", "#dec2f3", "#d0a8ef", "#cf9bf7", "#bf7af4", "#af59f2", "#8c47c1", "#693591", "rgba(175,89,242,0.10)"],
    rex_graph_green: ["rgba(116,231,189,0.10)", "#c7f5e4", "#abf0d7", "#8febca", "#74e7bd", "#50cbae", "#25bf9a", "#1d987b", "#16725c", "rgba(37,191,154,0.10)"],
    rex_graph_yellow: ["rgba(238,181,115,0.10)", "#f8e1c7", "#f4d2ab", "#f1c38f", "#eeb573", "#ec9c42", "#ea922d", "#bb7424", "#8c571b", "rgba(234,146,45,0.10)"],
    rex_gunsan: ["rgba(34,227,157,0.10)", "rgba(240,68,82,0.10)", "rgba(255,170,0,0.10)", "#22E39D", "#F04452", "rgba(255,170,0,1)", "#22E39D", "#F04452", "rgba(255,170,0,1)", "#F04452"],
    rex_gunsan_black: [
      "rgba(50,52,66,0.1)",
      "rgba(50,52,66,0.2)",
      "rgba(50,52,66,0.3)",
      "rgba(50,52,66,0.4)",
      "rgba(50,52,66,0.6)",
      "rgba(50,52,66,1)",
      "rgba(40,42,53,1)",
      "rgba(30,32,40,1)",
      "rgba(20,22,27,1)",
      "rgba(10,11,13,1)"
    ],
    rex_gunsan_opacity: [
      "rgba(17,18,27,0.85)",
      "rgba(17,18,27,0.9)",
      "rgba(17,18,27,0.95)",
      "rgba(17,18,27,1)",
      "rgba(17,18,27,1)",
      "rgba(17,18,27,1)",
      "rgba(17,18,27,1)",
      "rgba(17,18,27,1)",
      "rgba(17,18,27,1)",
      "rgba(17,18,27,1)"
    ],
    rex_gunsan_marker: [
      "rgba(4,106,69,0.1)",
      "rgba(4,106,69,0.2)",
      "rgba(4,106,69,0.3)",
      "rgba(4,106,69,1)",
      "rgba(34,227,157,1)",
      "rgba(146,4,15,1)",
      "rgba(4,106,69,1)",
      "rgba(34,227,157,1)",
      "rgba(146,4,15,1)",
      "rgba(4,106,69,1)"
    ]
  }
});

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider theme={theme} forceColorScheme="dark">
      {children}
    </Provider>
  );
};
