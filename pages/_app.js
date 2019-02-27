import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { Provider as StyletronProvider, styled } from "styletron-react";
import Router from "next/router";
import { styletron } from "../helpers/styletron";
import { trackPageView } from "../helpers/ga";
import { MOBILE_BREAKPOINT } from "../const";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import "../main.css";

const Content = styled("div", {
  display: "flex",
  justifyContent: "center",
  padding: "6em 1.5em",
  [MOBILE_BREAKPOINT]: {
    padding: "1.5em 0.75em"
  }
});

export default class MyApp extends App {
  static async getInitialProps({ ctx }) {
    return { path: ctx.asPath };
  }
  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url);
    };
  }
  render() {
    const { Component, pageProps, path } = this.props;
    return (
      <Container>
        <Head>
          <title>Styletron</title>
        </Head>
        <StyletronProvider value={styletron}>
          <Content>
            <Component {...pageProps} path={path} />
          </Content>
        </StyletronProvider>
      </Container>
    );
  }
}
