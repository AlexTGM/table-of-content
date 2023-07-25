import { fireEvent } from "@testing-library/react";
import { TableOfContentLoaded } from ".";
import { renderWithProviders } from "../../../shared/tests";

describe("Table Of Content Loaded should", () => {
  const inputData = {
    entities: {
      pages: {
        "1": {
          parentId: "ij",
          level: 0,
          title: "Item #1",
          pages: [],
        },
        "2": {
          parentId: "ij",
          level: 0,
          title: "Item #3",
          pages: ["4"],
        },
        "3": {
          parentId: "ij",
          level: 0,
          title: "Item #4",
          pages: [],
        },
        "4": {
          parentId: "2",
          level: 0,
          title: "Item #2",
          pages: [],
        },
      },
    },
    topLevelIds: ["1", "2", "3"],
  };

  it("render all elements", () => {
    const { baseElement } = renderWithProviders(
      <TableOfContentLoaded
        inputData={inputData}
        selectedPageId={null}
        onSelect={console.log}
      />
    );

    expect(baseElement).toHaveTextContent("Item #1");
    expect(baseElement).toHaveTextContent("Item #3");
    expect(baseElement).toHaveTextContent("Item #4");

    expect(baseElement).not.toHaveTextContent("Item #2");
  });

  it("render more items on expand", () => {
    const { baseElement, getByText } = renderWithProviders(
      <TableOfContentLoaded
        inputData={inputData}
        selectedPageId={null}
        onSelect={console.log}
      />
    );

    expect(baseElement).not.toHaveTextContent("Item #2");

    const expandableItem = getByText("Item #3");

    fireEvent.click(expandableItem);

    expect(baseElement).toHaveTextContent("Item #1");
    expect(baseElement).toHaveTextContent("Item #2");
    expect(baseElement).toHaveTextContent("Item #3");
    expect(baseElement).toHaveTextContent("Item #4");
  });

  it("render no data on incorrect filter", () => {
    const { baseElement, getByTestId } = renderWithProviders(
      <TableOfContentLoaded
        inputData={inputData}
        selectedPageId={null}
        onSelect={console.log}
      />
    );

    const filterInput = getByTestId("table-of-content-input");

    fireEvent.change(filterInput, { target: { value: "not-existing-string" } });

    expect(baseElement).toHaveTextContent("Please adjust filters");

    expect(baseElement).not.toHaveTextContent("Item #1");
    expect(baseElement).not.toHaveTextContent("Item #2");
    expect(baseElement).not.toHaveTextContent("Item #3");
    expect(baseElement).not.toHaveTextContent("Item #4");
  });

  it("render items except filtered out", () => {
    const { baseElement, getByTestId } = renderWithProviders(
      <TableOfContentLoaded
        inputData={inputData}
        selectedPageId={null}
        onSelect={console.log}
      />
    );

    const filterInput = getByTestId("table-of-content-input");

    fireEvent.change(filterInput, { target: { value: "Item #2" } });

    expect(baseElement).not.toHaveTextContent("Item #1");
    expect(baseElement).not.toHaveTextContent("Item #2");
    expect(baseElement).toHaveTextContent("Item #3");
    expect(baseElement).not.toHaveTextContent("Item #4");
  });

  it("render list expanded to selected item", () => {
    const { baseElement } = renderWithProviders(
      <TableOfContentLoaded
        inputData={inputData}
        selectedPageId={"4"}
        onSelect={console.log}
      />
    );

    expect(baseElement).toHaveTextContent("Item #1");
    expect(baseElement).toHaveTextContent("Item #2");
    expect(baseElement).toHaveTextContent("Item #3");
    expect(baseElement).toHaveTextContent("Item #4");
  });
});
