import { css, Global } from "@emotion/core";
import lecCss from "@lansweeper/lecfrontcomponents/dist/index.css";
import antCss from "antd/dist/antd.min.css";
import { ThemeProvider } from "emotion-theming";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import normalizeCss from "normalize.css/normalize.css";
import React from "react";
import { AppHeader } from "../components";
import { theme } from "../theme";
import {
  AllAssetsProvider,
  MatchedProvider,
  NoMatchProvider,
  FiltersProvider,
} from "../components/providers";

const HIDDEN_NAVIGATION_ROUTES = ["/", "/exports", "/reports/[siteId]", "/404"];
const App = ({ Component, pageProps }: AppProps) => {
  const { route } = useRouter();
  const showNavigationMenu =
    !pageProps?.isErrorPage && !HIDDEN_NAVIGATION_ROUTES.includes(route);

  return (
    <>
      <Global
        styles={css`
          ${normalizeCss}
          ${antCss}
          ${lecCss}

          @font-face {
            font-family: "lec-font";
            src: url("/assets/icons/lec-font.eot?3kywez");
            src: url("/assets/icons/lec-font.eot?3kywez#iefix")
                format("embedded-opentype"),
              url("/assets/icons/lec-font.ttf?3kywez") format("truetype"),
              url("/assets/icons/lec-font.woff?3kywez") format("woff"),
              url("/assets/icons/lec-font.svg?3kywez#lec-font") format("svg");
            font-weight: normal;
            font-style: normal;
            font-display: block;
          }

          html,
          body {
            height: 100%;
            width: 100%;
            /* For some reason when the page renders only on the server
            (as in the case of sites) antd overwrites the global styles
            and changes the background color and font */
            font-family: "Quicksand", sans-serif !important;
            color: rgba(57, 62, 70, 0.8);
          }
          #__next {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          * {
            box-sizing: border-box;
          }
          :root {
            --black: #000000;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <FiltersProvider>
          <AllAssetsProvider>
            <MatchedProvider>
              <NoMatchProvider>
                {showNavigationMenu && (
                  <AppHeader appInfo={pageProps?.appInfo} />
                )}
                <Component {...pageProps} />
              </NoMatchProvider>
            </MatchedProvider>
          </AllAssetsProvider>
        </FiltersProvider>
      </ThemeProvider>
    </>
  );
};

App.getInitialProps = async ({
  context,
  Component,
}: {
  context: NextPageContext;
  Component: NextComponentType;
}) => {
  let pageProps;
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(context ?? {});
  }
  return { pageProps };
};

export default App;
