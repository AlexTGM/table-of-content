import { fireEvent } from "@testing-library/react";
import { ListItem } from ".";
import { renderWithProviders } from "../../../../../shared";
import "jest-styled-components";

const node3 = { path: "3", children: [] };
const node2 = { path: "2", children: [node3] };
const node1 = { path: "1", children: [node2] };

const preloadedState = {
  treeState: {
    nodes: [node1, node2],
    rawData: {
      "1": {
        title: "Item #1",
        parentId: "ij",
        pages: ["2"],
        level: 0,
      },
      "2": {
        title: "Item #2",
        parentId: "1",
        pages: ["3"],
        level: 1,
      },
      "3": {
        title: "Item #1",
        parentId: "2",
        pages: [],
        level: 2,
      },
    },
  },
};

describe("List Item should", () => {
  it("render", () => {
    const { baseElement, getByTestId } = renderWithProviders(
      <ListItem itemPath="1" />,
      {
        preloadedState,
      }
    );

    expect(baseElement).toHaveTextContent("Item #1");

    fireEvent.click(getByTestId("list-item-1"));

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

    fireEvent.click(getByTestId("div-item-3"));

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
