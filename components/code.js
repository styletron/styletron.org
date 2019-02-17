import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { styled } from "styletron-react";

const Editable = styled("div", {
  position: "relative",
  color: "darkred",
  fontSize: "10px",
  top: "40px",
  right: "10px",
  textTransform: "uppercase",
  fontWeight: "bold",
  textAlign: "right",
  "@media screen and (max-width: 600px)": {
    visibility: "hidden"
  }
});

const FILTERED = [
  'import { styled } from "styletron-react";',
  "export",
  "default"
];

const transformCode = code =>
  FILTERED.reduce((acc, token) => acc.replace(token, ""), code);

const Code = ({ code }) => (
  <LiveProvider
    code={code}
    mountStylesheet={false}
    transformCode={transformCode}
    scope={{
      styled
    }}
  >
    <Editable>editable</Editable>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
);

export default Code;
