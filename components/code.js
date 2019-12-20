import {useState} from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useHover } from "./hooks";
import {
  styled,
  withStyle,
  withTransform,
  createStyled,
  useStyletron
} from "styletron-react";
import { driver, getInitialStyle } from "styletron-standard";
import { DESKTOP_BREAKPOINT } from "../const";

const Editable = styled("div", {
  position: "relative",
  color: "darkred",
  fontSize: "10px",
  top: "40px",
  right: "10px",
  textTransform: "uppercase",
  fontWeight: "bold",
  textAlign: "right",
  visibility: "hidden",
  [DESKTOP_BREAKPOINT]: {
    visibility: "visible"
  }
});

const FILTERED = [/^import.*/gim, "export", "default"];

const transformCode = code =>
  FILTERED.reduce((acc, token) => acc.replace(token, ""), code);

const Code = ({ code }) => (
  <LiveProvider
    code={code}
    mountStylesheet={false}
    transformCode={transformCode}
    scope={{
      styled,
      withStyle,
      withTransform,
      useHover,
      useState,
      createStyled,
      driver,
      getInitialStyle,
      useStyletron
    }}
  >
    <Editable>editable</Editable>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
);

export default Code;
