import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
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
    mainBackground: "#eeeeee",
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
});

export default theme;
