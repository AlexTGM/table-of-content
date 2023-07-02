import { fireEvent } from "@testing-library/react";

import { TableOfContentWidget } from ".";
import { renderWithProviders } from "../../shared";

describe("Table Of Content should", () => {
  it("render", () => {
    const { getByTestId } = renderWithProviders(<TableOfContentWidget />);

    expect(getByTestId("value")).toHaveTextContent("1");
    expect(getByTestId("increase")).toHaveTextContent("+");
    expect(getByTestId("decrease")).toHaveTextContent("-");
  });

  it("increase value", () => {
    const { getByTestId } = renderWithProviders(<TableOfContentWidget />);

    fireEvent.click(getByTestId("increase"));

    expect(getByTestId("value")).toHaveTextContent("2");
  });

  it("decrease value", () => {
    const { getByTestId } = renderWithProviders(<TableOfContentWidget />);

    fireEvent.click(getByTestId("decrease"));

    expect(getByTestId("value")).toHaveTextContent("0");
  });

  it("load state", () => {
    const { getByTestId } = renderWithProviders(<TableOfContentWidget />, {
      preloadedState: { tableOfContent: { value: 100 } },
    });

    expect(getByTestId("value")).toHaveTextContent("100");
  });
});
