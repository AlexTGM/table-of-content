import { render } from "@testing-library/react";
import { App } from "./app";

it("render", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toHaveTextContent('Hello world!');
});
