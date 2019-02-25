import * as React from "react";
import Link from "next/link";
import { styled } from "styletron-react";
import { MOBILE_BREAKPOINT, ROUTES } from "../const";

const SidebarItem = styled("li", {
  padding: "0.75em 2em 0.75em 2em",
  fontSize: "1em"
});

const StyledLink = styled("a", ({ $active }) => ({
  fontWeight: $active ? "bold" : "normal",
  letterSpacing: $active ? "0px" : "0.52px",
  cursor: "pointer",
  boxShadow: $active ? "none" : "0 1px 0 0 currentColor"
}));

const SidebarList = styled("ul", ({ $isVisible }) => ({
  backgroundColor: "#fff",
  listStyleType: "none",
  margin: 0,
  padding: 0,
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

export const getATarget = route =>
  route === "https://github.com/styletron/styletron" ? "_blank" : undefined;

const Navigation = ({ isVisible, pathIndex }) => (
  <SidebarList $isVisible={isVisible}>
    {ROUTES.map((route, index) => (
      <SidebarItem key={route.path}>
        <Link href={route.path} prefetch>
          <StyledLink
            target={getATarget(route.path)}
            $active={pathIndex === index}
          >
            {route.text}
          </StyledLink>
        </Link>
      </SidebarItem>
    ))}
  </SidebarList>
);

export default Navigation;
