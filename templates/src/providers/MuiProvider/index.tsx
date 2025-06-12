import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, Inter, NotoSans, sans-serif"
  },
  palette: {
    mode: "dark", // 기본 다크 모드
    primary: {
      main: "#225cd0" // rex_main[5]
    },
    secondary: {
      main: "#49b2fa" // rex_graph_sky[6]
    },
    background: {
      default: "#11121b", // rex_black[9]
      paper: "#21232e" // rex_black[8]
    },
    text: {
      primary: "#ffffff", // rex_gray[0]
      secondary: "#e9e9e9" // rex_gray[2]
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#11121b",
          color: "#ffffff"
        }
      }
    }
  }
});

export const MuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
