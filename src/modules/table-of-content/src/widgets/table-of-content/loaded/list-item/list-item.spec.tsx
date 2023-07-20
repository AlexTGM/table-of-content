import { act, fireEvent } from "@testing-library/react";
import { ListItem } from ".";
import "jest-styled-components";
import { preloadedState } from "../../../../shared/tests/state-mock";
import { renderWithProviders } from "../../../../shared/tests";

describe("List Item should", () => {
  const updateCurrentItemIndex = jest.fn();

  it("render", () => {
    const { baseElement, getByTestId } = renderWithProviders(
      <ListItem index={1} itemPath="1" innerRef={null} updateCurrentItemIndex={updateCurrentItemIndex}/>,
      {
        preloadedState,
      }
    );

    expect(baseElement).toHaveTextContent("Item #1");

    act(() => fireEvent.click(getByTestId("div-item-1")));

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
      <ListItem index={1} itemPath={itemPath} innerRef={null} updateCurrentItemIndex={updateCurrentItemIndex}/>,
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
    const { getByTestId } = renderWithProviders(
      <ListItem index={3} itemPath="3" innerRef={null}  updateCurrentItemIndex={updateCurrentItemIndex}/>,
      {
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
        <ListItem index={1} itemPath={itemPath} innerRef={null} updateCurrentItemIndex={updateCurrentItemIndex} />,
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
