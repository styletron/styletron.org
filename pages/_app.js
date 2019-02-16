import React from "react";
import App, { Container } from "next/app";
import { Provider as StyletronProvider, styled } from "styletron-react";
import Router from "next/router";
import { styletron } from "../helpers/styletron";
import { trackPageView } from "../helpers/ga";
import "../prism-coy.css";

const Content = styled("div", {
  maxWidth: "40em",
  margin: "0px auto",
  padding: "6em 1.5em 6em 1.5em",
  "@media screen and (max-width: 767px)": {
    padding: "2em 1.5em 2em 1.5em"
  }
});

export default class MyApp extends App {
  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url);
    };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <StyletronProvider value={styletron}>
          <Content>
            <Component {...pageProps} />
          </Content>
        </StyletronProvider>
      </Container>
    );
  }
}
