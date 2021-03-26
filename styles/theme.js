import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      main: "#b2db5b",
      light: "#c1e27b",
      dark: "#7c993f",
    },
    secondary: {
      main: "#ff8532",
      light: "#ff9d5b",
      dark: "#b25d23",
    },
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
});

export default theme;
