/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from "react";
import Burger from "@animated-burgers/burger-squeeze";
import { MDXProvider } from "@mdx-js/tag";
import Link from "next/link";
import { styled } from "styletron-react";
import { MOBILE_BREAKPOINT } from "../conts";

import MarkdownElements from "./markdown-elements";

const Content = styled("div", {
  marginTop: "-1.25em",
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

const SidebarList = styled("ul", ({ $isVisible }) => ({
  backgroundColor: "#fff",
  listStyleType: "none",
  margin: 0,
  padding: "1em 0em 0em 1em",
  borderLeft: "5px solid #FFC043",
  [MOBILE_BREAKPOINT]: {
    display: $isVisible ? "block" : "none",
    position: "absolute",
    width: "15em",
    right: "-6px",
    borderLeft: "none",
    borderRadius: "6px",
    boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px"
  }
}));

const SidebarItem = styled("li", {
  padding: "0em 1em 1em 1em",
  fontSize: "1em"
});

const TwoColumnLayout = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  [MOBILE_BREAKPOINT]: {
    flexDirection: "column-reverse",
    alignItems: "flex-end"
  }
});

class Layout extends React.Component {
  state = {
    sidebarVisible: false
  };
  render() {
    return (
      <React.Fragment>
        <TwoColumnLayout>
          <Content>
            <MDXProvider components={MarkdownElements}>
              {this.props.children}
            </MDXProvider>
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
            <SidebarList $isVisible={this.state.sidebarVisible}>
              <SidebarItem>
                <Link href="/" prefetch>
                  <a>Home</a>
                </Link>
              </SidebarItem>
              <SidebarItem>
                <Link href="/getting-started" prefetch>
                  <a>Getting Started</a>
                </Link>
              </SidebarItem>
              <SidebarItem>
                <Link href="/react" prefetch>
                  <a>Use with React</a>
                </Link>
              </SidebarItem>
              <SidebarItem>
                <Link href="/concepts" prefetch>
                  <a>Concepts</a>
                </Link>
              </SidebarItem>
              <SidebarItem>
                <Link href="/api" prefetch>
                  <a>API Docs</a>
                </Link>
              </SidebarItem>
            </SidebarList>
          </Sidebar>
        </TwoColumnLayout>
      </React.Fragment>
    );
  }
}
export default Layout;
