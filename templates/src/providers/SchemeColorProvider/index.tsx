import { createContext, useContext, ReactNode, useMemo } from "react";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Global } from "@emotion/react";

const SchemeColorContext = createContext<Record<string, string> | null>(null);

// Provider 정의
export const SchemeColorProvider = ({ children }: { children: ReactNode }) => {
  const scheme = useMantineColorScheme().colorScheme;
  const colors = useMantineTheme().colors;

  // Memoize color values to avoid recalculating them on every render
  const memoizedColors = useMemo(() => {
    const commonColors = {
      systemWhite: colors.rex_gray[0],
      systemWhite10: colors.rex_gray[1],
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
      gunsanGreen: colors.rex_gunsan[3],
      gunsanRed: colors.rex_gunsan[4],
      gunsanGreenOpacity: "rgba(34, 227, 157, 0.2)",
      gunsanRedOpacity: "rgba(240, 68, 82, 0.2)",
      gunsanRedOpacity80: "rgba(240, 68, 82, 0.8)",
      gunsanTrash: colors.rex_gunsan[5],
      gunsanBlack20: colors.rex_gunsan_black[5],
      gunsanBlackOpacity: colors.rex_gunsan_opacity[0],
      gunsanMarkerDefault: colors.rex_gunsan_marker[3],
      gunsanMarkerSelected: colors.rex_gunsan_marker[4],
      gunsanMarkerError: colors.rex_gunsan_marker[5],
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
      graphDarkYellowTransparent: colors.rex_graph_yellow[9]
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

  const cssVariables = useMemo(
    () =>
      Object.entries(memoizedColors).reduce(
        (acc, [key, value]) => {
          acc[`--${key}`] = value;
          return acc;
        },
        {} as Record<string, string>
      ),
    [memoizedColors]
  );

  return (
    <SchemeColorContext.Provider value={memoizedColors}>
      <Global
        styles={{
          ":root": cssVariables
        }}
      />
      {children}
    </SchemeColorContext.Provider>
  );
};

// 전역적으로 제공된 색상 값에 접근하는 훅
export const useSharedSchemeColor = () => {
  const context = useContext(SchemeColorContext);

  if (!context) {
    throw new Error("useSharedSchemeColor must be used within a SchemeColorProvider");
  }

  return context;
};
