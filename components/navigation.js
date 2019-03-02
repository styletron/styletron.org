import * as React from "react";
import Link from "next/link";
import { styled } from "styletron-react";
import { DESKTOP_BREAKPOINT, ROUTES } from "../const";
import { cleanAnchor } from "./markdown-elements";

const SidebarItem = styled("li", ({ $anchor, $active }) => ({
  padding: $anchor
    ? "0rem 2rem 0.75rem 3rem"
    : `0.75rem 2rem ${$active ? "0.5rem" : "0.75rem"} 2rem`,
  fontSize: $anchor ? "14px" : "16px",
  width: "8em"
}));

const StyledLink = styled("a", ({ $active }) => ({
  fontWeight: $active ? "bold" : "normal",
  letterSpacing: $active ? "0px" : "0.52px",
  cursor: "pointer",
  boxShadow: $active ? "none" : "0 1px 0 0 currentColor"
}));

const SidebarList = styled("ul", ({ $isVisible }) => ({
  display: $isVisible ? "block" : "none",
  backgroundColor: "#fff",
  listStyleType: "none",
  margin: 0,
  padding: "0.5em 0em",
  borderLeft: "none",
  position: "absolute",
  width: "15em",
  right: "-6px",
  borderRadius: "6px",
  boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px",
  [DESKTOP_BREAKPOINT]: {
    position: "static",
    width: "auto",
    right: 0,
    boxShadow: "none",
    borderRadius: 0,
    display: "block",
    padding: 0,
    borderLeft: "5px solid #FFC043"
  }
}));

export const getATarget = route =>
  route === "https://github.com/styletron/styletron" ? "_blank" : undefined;

const Navigation = ({ isVisible, pathIndex, activeAnchor }) => (
  <SidebarList $isVisible={isVisible}>
    {ROUTES.map((route, index) => (
      <React.Fragment key={route.path}>
        <SidebarItem $active={pathIndex === index}>
          <Link href={route.path} prefetch={!route.path.includes("http")}>
            <StyledLink
              target={getATarget(route.path)}
              $active={pathIndex === index}
              href={route.path}
            >
              {route.text}
            </StyledLink>
          </Link>
        </SidebarItem>
        {pathIndex === index &&
          ROUTES[pathIndex].anchors.map(anchor => (
            <SidebarItem key={anchor} $anchor>
              <StyledLink
                href={`#${cleanAnchor(anchor)}`}
                $active={activeAnchor === anchor}
              >
                {anchor}
              </StyledLink>
            </SidebarItem>
          ))}
      </React.Fragment>
    ))}
  </SidebarList>
);

export default Navigation;
