import { createContext, useContext, ReactNode, useMemo } from "react";
import { useTheme } from "@mui/material/styles";

const SchemeColorContext = createContext<Record<string, string> | null>(null);

// Rex 색상 팔레트 정의 (기존 Mantine 색상들을 그대로 유지)
const rexColors = {
  rex_main: ["rgba(34,92,208,0.1)", "rgba(34,92,208,0.24)", "#90ade7", "rgba(34,92,208,0.5)", "#386cd4", "#225cd0", "#1b49a6", "#14377c", "#0d2453", "#061229"],
  rex_black: ["#dde1e5", "#b4c0d3", "#a4a7b2", "#9598a5", "#8491a7", "#777b8b", "#6b6d7f", "#323442", "#21232e", "#11121b"],
  rex_gray: ["#ffffff", "#f4f6fa", "#e9e9e9", "#d1d1d1", "#bababa", "#a3a3a3", "#8b8b8b", "#747474", "#5d5d5d", "#393939"],
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
  rex_graph_yellow: ["rgba(238,181,115,0.10)", "#f8e1c7", "#f4d2ab", "#f1c38f", "#eeb573", "#ec9c42", "#ea922d", "#bb7424", "#8c571b", "rgba(234,146,45,0.10)"]
};

// Provider 정의
export const SchemeColorProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const scheme = theme.palette.mode; // 'dark' 또는 'light'
  const colors = rexColors;

  // Memoize color values to avoid recalculating them on every render
  const memoizedColors = useMemo(() => {
    const commonColors = {
      systemWhite: colors.rex_gray[0],
      systemGrayDim: colors.rex_gray[9],
      systemGray10: colors.rex_gray[1],
      systemGray: colors.rex_gray[2],
      systemBlack80: colors.rex_black[1],
      systemBlack50: colors.rex_black[4],
      systemBlack30: colors.rex_black[6],
      systemBlack20: colors.rex_black[7],
      systemBlack10: colors.rex_black[8],
      systemBlack: colors.rex_black[9],
      systemBlue: colors.rex_main[5],
      systemOpacityBlue: colors.rex_main[0],
      systemSky: colors.rex_graph_sky[6],
      systemRed: colors.rex_system_red[5],
      systemGreen: colors.rex_system_green[5],
      systemYellow: colors.rex_system_yellow[5],
      systemLime: colors.rex_system_lime[6],
      systemInnerGreen: colors.rex_system_green[2],
      systemOuterGreen: colors.rex_system_green[9],
      systemInnerRed: colors.rex_system_red[4],
      systemOuterRed: colors.rex_system_red[2],
      graphLightBlue: colors.rex_graph_blue[4],
      graphLightSky: colors.rex_graph_sky[3],
      graphLightPurple: colors.rex_graph_purple[3],
      graphLightGreen: colors.rex_graph_green[4],
      graphLightYellow: colors.rex_graph_yellow[4],
      graphLightBlueTransparent: colors.rex_graph_blue[0],
      graphLightSkyTransparent: colors.rex_graph_sky[0],
      graphLightPurpleTransparent: colors.rex_graph_purple[0],
      graphLightGreenTransparent: colors.rex_graph_green[0],
      graphLightYellowTransparent: colors.rex_graph_yellow[0],
      graphDarkBlue: colors.rex_graph_blue[7],
      graphDarkSky: colors.rex_graph_sky[6],
      graphDarkPurple: colors.rex_graph_purple[6],
      graphDarkGreen: colors.rex_graph_green[6],
      graphDarkYellow: colors.rex_graph_yellow[6],
      graphDarkBlueTransparent: colors.rex_graph_blue[9],
      graphDarkSkyTransparent: colors.rex_graph_sky[9],
      graphDarkPurpleTransparent: colors.rex_graph_purple[9],
      graphDarkGreenTransparent: colors.rex_graph_green[9],
      graphDarkYellowTransparent: colors.rex_graph_yellow[9],
      sysyemOpacity50: colors.rex_opacity[4]
    };

    const diffColors = {
      light: {
        textHighContrast: colors.rex_black[9],
        textSemiHighContrast: colors.rex_black[7],
        textSubHighContrast: colors.rex_black[7],
        textMidHighContrast: colors.rex_black[6],
        textMediumContrast: colors.rex_black[6],
        textMidLowContrast: colors.rex_black[6],
        textLowContrast: colors.rex_opacity[4],
        textMuted: colors.rex_opacity[2],
        textMainAndWhite: colors.rex_main[5],
        borderNormal: colors.rex_gray[2],
        borderDarkOnly: "",
        borderLightOnly: colors.rex_gray[2],
        backgroundBase: colors.rex_gray[0],
        backgroundMid: colors.rex_gray[1],
        backgroundTop: colors.rex_gray[0],
        backgroundOpposite: colors.rex_black[9],
        backgroundModal: colors.rex_gray[0],
        backgroundLightButton: colors.rex_main[0],
        backgroundCard: colors.rex_opacity[0],
        backgroundSideCard: colors.rex_gray[1],
        backgroundLightOnly: colors.rex_gray[1],
        backgroundDummyVideo: colors.rex_gray[2],
        backgroundTableHeader: colors.rex_main[5],
        backgroundTableHover: colors.rex_gray[2],
        backgroundLoginPage: colors.rex_gray[1],
        highlightMenu: colors.rex_main[0],
        highlightVideoTag: colors.rex_opacity[7],
        highlightMono: colors.rex_gray[1],
        highlightSubMono: colors.rex_gray[2],
        highlightBlue: colors.rex_graph_sky[1],
        highlightRed: colors.rex_system_red[0],
        graphBlue: colors.rex_graph_blue[4],
        graphSky: colors.rex_graph_sky[3],
        graphPurple: colors.rex_graph_purple[3],
        graphGreen: colors.rex_graph_green[4],
        graphYellow: colors.rex_graph_yellow[4],
        graphRed: colors.rex_system_red[8],
        graphOrange: colors.rex_system_yellow[3],
        graphBrown: colors.rex_system_yellow[9],
        graphBlueTransparent: colors.rex_graph_blue[0],
        graphSkyTransparent: colors.rex_graph_sky[0],
        graphPurpleTransparent: colors.rex_graph_purple[0],
        graphGreenTransparent: colors.rex_graph_green[0],
        graphYellowTransparent: colors.rex_graph_yellow[0]
      },
      dark: {
        textHighContrast: colors.rex_gray[0],
        textSemiHighContrast: colors.rex_gray[0],
        textSubHighContrast: colors.rex_gray[2],
        textMidHighContrast: colors.rex_gray[0],
        textMediumContrast: colors.rex_gray[2],
        textMidLowContrast: colors.rex_black[6],
        textLowContrast: colors.rex_black[6],
        textMuted: colors.rex_opacity[5],
        textMainAndWhite: colors.rex_gray[0],
        borderNormal: colors.rex_opacity[6],
        borderDarkOnly: colors.rex_opacity[6],
        borderLightOnly: "",
        backgroundBase: colors.rex_black[9],
        backgroundMid: colors.rex_black[7],
        backgroundTop: colors.rex_black[7],
        backgroundOpposite: colors.rex_gray[0],
        backgroundModal: colors.rex_black[8],
        backgroundLightButton: colors.rex_black[7],
        backgroundCard: colors.rex_opacity[9],
        backgroundSideCard: colors.rex_black[8],
        backgroundLightOnly: "",
        backgroundDummyVideo: colors.rex_black[7],
        backgroundTableHeader: colors.rex_black[7],
        backgroundTableHover: colors.rex_black[8],
        backgroundLoginPage: colors.rex_black[9],
        highlightMenu: colors.rex_main[3],
        highlightVideoTag: colors.rex_opacity[7],
        highlightMono: colors.rex_black[8],
        highlightSubMono: colors.rex_opacity[2],
        highlightBlue: colors.rex_main[1],
        highlightRed: colors.rex_system_red[0],
        graphBlue: colors.rex_graph_blue[7],
        graphSky: colors.rex_graph_sky[6],
        graphPurple: colors.rex_graph_purple[6],
        graphGreen: colors.rex_graph_green[6],
        graphYellow: colors.rex_graph_yellow[6],
        graphRed: colors.rex_system_red[8],
        graphOrange: colors.rex_system_yellow[3],
        graphBrown: colors.rex_system_yellow[9],
        graphBlueTransparent: colors.rex_graph_blue[9],
        graphSkyTransparent: colors.rex_graph_sky[9],
        graphPurpleTransparent: colors.rex_graph_purple[9],
        graphGreenTransparent: colors.rex_graph_green[9],
        graphYellowTransparent: colors.rex_graph_yellow[9]
      },
      auto: {
        textHighContrast: colors.rex_black[9],
        textSemiHighContrast: colors.rex_black[7],
        textSubHighContrast: colors.rex_black[7],
        textMidHighContrast: colors.rex_black[6],
        textMediumContrast: colors.rex_black[6],
        textMidLowContrast: colors.rex_black[6],
        textLowContrast: colors.rex_opacity[4],
        textMuted: colors.rex_opacity[2],
        textMainAndWhite: colors.rex_main[5],
        borderNormal: colors.rex_gray[2],
        borderDarkOnly: "",
        borderLightOnly: colors.rex_gray[2],
        backgroundBase: colors.rex_gray[0],
        backgroundMid: colors.rex_gray[1],
        backgroundTop: colors.rex_gray[0],
        backgroundOpposite: colors.rex_black[9],
        backgroundModal: colors.rex_gray[0],
        backgroundLightButton: colors.rex_main[0],
        backgroundCard: colors.rex_opacity[0],
        backgroundSideCard: colors.rex_gray[1],
        backgroundLightOnly: colors.rex_gray[1],
        backgroundDummyVideo: colors.rex_gray[2],
        backgroundTableHeader: colors.rex_main[5],
        backgroundTableHover: colors.rex_gray[2],
        backgroundLoginPage: colors.rex_gray[1],
        highlightMenu: colors.rex_main[0],
        highlightVideoTag: colors.rex_opacity[7],
        highlightMono: colors.rex_gray[1],
        highlightSubMono: colors.rex_gray[1],
        highlightBlue: colors.rex_graph_sky[1],
        highlightRed: colors.rex_system_red[0],
        graphBlue: colors.rex_graph_blue[4],
        graphSky: colors.rex_graph_sky[3],
        graphPurple: colors.rex_graph_purple[3],
        graphGreen: colors.rex_graph_green[4],
        graphYellow: colors.rex_graph_yellow[4],
        graphBlueTransparent: colors.rex_graph_blue[0],
        graphSkyTransparent: colors.rex_graph_sky[0],
        graphPurpleTransparent: colors.rex_graph_purple[0],
        graphGreenTransparent: colors.rex_graph_green[0],
        graphYellowTransparent: colors.rex_graph_yellow[0]
      }
    };

    return { ...commonColors, ...diffColors[scheme] };
  }, [colors, scheme]);

  return <SchemeColorContext.Provider value={memoizedColors}>{children}</SchemeColorContext.Provider>;
};

// 전역적으로 제공된 색상 값에 접근하는 훅
export const useSharedSchemeColor = () => {
  const context = useContext(SchemeColorContext);

  if (!context) {
    throw new Error("useSharedSchemeColor must be used within a SchemeColorProvider");
  }

  return context;
};
