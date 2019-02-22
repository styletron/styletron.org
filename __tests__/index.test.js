import React from "react";
import renderer from "react-test-renderer";
import Button from "../components/snaptest";
import { Provider as StyletronProvider } from "styletron-react";
import { Server } from "styletron-engine-atomic";

test("Button", () => {
  const styletron = new Server();
  const component = renderer.create(
    <StyletronProvider value={styletron}>
      <Button>Text</Button>
    </StyletronProvider>
  );
  const tree = component.toJSON();
  expect(styletron.getCss()).toMatchSnapshot("CSS");
  expect(tree).toMatchSnapshot("HTML");
});
