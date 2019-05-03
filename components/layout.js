import * as React from "react";
import Burger from "@animated-burgers/burger-squeeze";
import { MDXProvider } from "@mdx-js/tag";
import Link from "next/link";
import { styled } from "styletron-react";
import { DESKTOP_BREAKPOINT, ROUTES } from "../const";
import Navigation, { getATarget } from "./navigation";
import { cleanAnchor } from "./markdown-elements";
import schd from "../helpers/schd";

import MarkdownElements from "./markdown-elements";

const Content = styled("div", {
  marginTop: "-5em",
  maxWidth: "37em",
  [DESKTOP_BREAKPOINT]: {
    marginTop: "-1.25em"
  }
});
const BurgerWrap = styled("div", {
  backgroundColor: "#fff",
  borderRadius: "5em",
  padding: "0.75em",
  marginRight: "-0.75em",
  marginTop: "-1.25em",
  cursor: "pointer",
  boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px"
});

const SidebarButtonWrap = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  marginBottom: "1em",
  textAlign: "right",
  [DESKTOP_BREAKPOINT]: {
    display: "none"
  }
});

const SidebarButton = styled("button", {
  display: "block",
  padding: "0.5em 2em",
  fontSize: "1em",
  font: "inherit",
  color: "#fff",
  cursor: "pointer",
  backgroundColor: "#276EF1",
  borderRadius: "6px",
  [DESKTOP_BREAKPOINT]: {
    display: "none"
  }
});

const Sidebar = styled("div", {
  position: "sticky",
  top: "2.5em",
  right: "2em",
  margin: 0,
  flexShrink: 0,
  [DESKTOP_BREAKPOINT]: {
    marginLeft: "3em",
    marginTop: "4.75em",
    top: "2em"
  }
});

const TwoColumnLayout = styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "flex-end",
  [DESKTOP_BREAKPOINT]: {
    flexDirection: "row",
    alignItems: "flex-start"
  }
});

const PrevNextLinks = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "3em"
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedOnScroll = schd(this.onScroll);
  }

  state = {
    sidebarVisible: false,
    activeAnchor:
      ROUTES[this.getPathIndex()] &&
      Array.isArray(ROUTES[this.getPathIndex()].anchors)
        ? ROUTES[this.getPathIndex()].anchors[0]
        : null
  };
  componentDidMount() {
    if (Array.isArray(ROUTES[this.getPathIndex()].anchors)) {
      document.addEventListener("scroll", this.debouncedOnScroll);
      this.onScroll();
    }
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.debouncedOnScroll);
  }
  onScroll = () => {
    const pathIndex = this.getPathIndex();
    const anchors = ROUTES[pathIndex].anchors;
    let activeAnchor = anchors[0];
    anchors.forEach(anchor => {
      console.log(cleanAnchor(anchor));
      const el = document.getElementById(cleanAnchor(anchor));
      if (el.getBoundingClientRect().top - 26 < 0) {
        activeAnchor = anchor;
      }
    });
    this.setState({ activeAnchor });
  };
  getPathIndex() {
    return ROUTES.findIndex(
      route =>
        route.path.replace(/\//g, "") === this.props.path.replace(/\//g, "")
    );
  }
  render() {
    const pathIndex = this.getPathIndex();
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
            <div style={{ height: "600px" }} />
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
              activeAnchor={this.state.activeAnchor}
            />
          </Sidebar>
        </TwoColumnLayout>
      </React.Fragment>
    );
  }
}
export default Layout;
