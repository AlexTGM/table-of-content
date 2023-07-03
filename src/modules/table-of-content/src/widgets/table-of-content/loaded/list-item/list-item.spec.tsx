import { act, fireEvent } from "@testing-library/react";
import { ListItem } from ".";
import "jest-styled-components";
import { renderWithProviders } from "../../../../shared";
import { preloadedState } from "../../../../shared/tests/state-mock";

describe("List Item should", () => {
  it("render", () => {
    const { baseElement, getByTestId } = renderWithProviders(
      <ListItem itemPath="1" />,
      {
        preloadedState,
      }
    );

    expect(baseElement).toHaveTextContent("Item #1");

    act(() => fireEvent.click(getByTestId("list-item-1")));

    expect(getByTestId("div-item-1")).not.toHaveStyleRule(
      "background-color",
      "#307FFF"
    );
  });

  test.each([
    ["1", "8px 0 8px 16px"],
    ["2", "8px 0 8px 32px"],
    ["3", "8px 0 8px 48px"],
  ])("have indentation - itemPath: %s", (itemPath, expectedPadding) => {
    const { getByTestId } = renderWithProviders(
      <ListItem itemPath={itemPath} />,
      {
        preloadedState,
      }
    );

    expect(getByTestId(`div-item-${itemPath}`)).toHaveStyleRule(
      "padding",
      expectedPadding
    );
  });

  it("highlight on selection", () => {
    const { getByTestId } = renderWithProviders(<ListItem itemPath="3" />, {
      preloadedState,
    });

    act(() => fireEvent.click(getByTestId("div-item-3")));

    expect(getByTestId("div-item-3")).toHaveStyleRule(
      "background-color",
      "#307FFF"
    );
  });

  it.each([
    ["1", "#F9F9F9", "1//2"],
    ["2", "#F4F4F4", "1//2//3"],
    ["1", "#F9F9F9", "1//2//3"],
  ])(
    "highlight path - itemPath: %s",
    (itemPath, expectedBackgroundColor, path) => {
      const { getByTestId } = renderWithProviders(
        <ListItem itemPath={itemPath} />,
        {
          preloadedState: { ...preloadedState, selectedState: { path } },
        }
      );

      expect(getByTestId(`div-item-${itemPath}`)).toHaveStyleRule(
        "background-color",
        expectedBackgroundColor
      );
    }
  );
});