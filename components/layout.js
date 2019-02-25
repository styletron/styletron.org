import * as React from "react";
import Burger from "@animated-burgers/burger-squeeze";
import { MDXProvider } from "@mdx-js/tag";
import Link from "next/link";
import { styled } from "styletron-react";
import { MOBILE_BREAKPOINT, ROUTES } from "../const";
import Navigation, { getATarget } from "./navigation";

import MarkdownElements from "./markdown-elements";

const Content = styled("div", {
  marginTop: "-1.25em",
  maxWidth: "37em",
  [MOBILE_BREAKPOINT]: {
    marginTop: "-5em"
  }
});
const BurgerWrap = styled("div", {
  backgroundColor: "#fff",
  borderRadius: "5em",
  padding: "0.75em",
  marginRight: "-0.5em",
  marginTop: "-1em",
  cursor: "pointer",
  boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px"
});

const SidebarButtonWrap = styled("div", {
  display: "none",
  width: "100%",
  justifyContent: "flex-end",
  marginBottom: "1em",
  textAlign: "right",
  [MOBILE_BREAKPOINT]: {
    display: "flex"
  }
});

const SidebarButton = styled("button", {
  display: "none",
  padding: "0.5em 2em",
  fontSize: "1em",
  font: "inherit",
  color: "#fff",
  cursor: "pointer",
  backgroundColor: "#276EF1",
  borderRadius: "6px",
  [MOBILE_BREAKPOINT]: {
    display: "block"
  }
});

const Sidebar = styled("div", {
  position: "sticky",
  top: "2em",
  marginLeft: "3em",
  marginTop: "4.75em",
  flexShrink: 0,
  [MOBILE_BREAKPOINT]: {
    margin: 0,
    top: "2.5em",
    right: "2em"
  }
});

const TwoColumnLayout = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  [MOBILE_BREAKPOINT]: {
    flexDirection: "column-reverse",
    alignItems: "flex-end"
  }
});

const PrevNextLinks = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "3em"
});

class Layout extends React.Component {
  state = {
    sidebarVisible: false
  };
  render() {
    const pathIndex = ROUTES.findIndex(
      route =>
        route.path.replace(/\//g, "") === this.props.path.replace(/\//g, "")
    );
    const prevRoute = pathIndex > 0 ? pathIndex - 1 : -1;
    const nextRoute =
      pathIndex > -1 && pathIndex < ROUTES.length - 1 ? pathIndex + 1 : -1;
    return (
      <React.Fragment>
        <TwoColumnLayout>
          <Content>
            <MDXProvider components={MarkdownElements}>
              {this.props.children}
            </MDXProvider>
            <PrevNextLinks>
              {prevRoute > -1 ? (
                <Link href={ROUTES[prevRoute].path} prefetch>
                  <a target={getATarget(ROUTES[prevRoute].path)}>
                    ← {ROUTES[prevRoute].text}
                  </a>
                </Link>
              ) : (
                <div />
              )}
              {nextRoute > -1 ? (
                <Link href={ROUTES[nextRoute].path} prefetch>
                  <a target={getATarget(ROUTES[nextRoute].path)}>
                    {ROUTES[nextRoute].text} →
                  </a>
                </Link>
              ) : (
                <div />
              )}
            </PrevNextLinks>
          </Content>
          <Sidebar>
            <SidebarButtonWrap>
              <BurgerWrap>
                <Burger
                  isOpen={this.state.sidebarVisible}
                  onClick={() =>
                    this.setState(prevState => ({
                      sidebarVisible: !prevState.sidebarVisible
                    }))
                  }
                />
              </BurgerWrap>
            </SidebarButtonWrap>
            <Navigation
              isVisible={this.state.sidebarVisible}
              pathIndex={pathIndex}
            />
          </Sidebar>
        </TwoColumnLayout>
      </React.Fragment>
    );
  }
}
export default Layout;
