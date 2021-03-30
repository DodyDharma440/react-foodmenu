import Router from "next/router";
import NProgress from "nprogress";
import "styles/nprogress.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import theme from "../styles/theme";
import fonts from "../styles/font-face";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Global styles={fonts} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
