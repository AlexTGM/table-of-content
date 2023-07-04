import { act, fireEvent } from "@testing-library/react";
import { TableOfContentsList } from ".";
import { preloadedState } from "../../../../shared/tests/state-mock";
import { renderWithProviders } from "../../../../shared/tests";

describe("List should", () => {
  it("render all items when filters are empty", () => {
    const { getByTestId } = renderWithProviders(<TableOfContentsList />, {
      preloadedState,
    });

    act(() => fireEvent.click(getByTestId("list-item-1")));
    act(() => fireEvent.click(getByTestId("list-item-2")));

    expect(getByTestId("list-item-3")).toBeVisible();
  });

  it("render items except filtered out", () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <TableOfContentsList />,
      {
        preloadedState: {
          ...preloadedState,
          filterState: { filterValue: "Subitem" },
        },
      }
    );

    act(() => fireEvent.click(getByTestId("list-item-1")));
    act(() => fireEvent.click(getByTestId("list-item-2")));

    expect(queryByTestId("list-item-3")).toBeNull();
  });

  it('render no items text when list is empty', () => {
    const { queryAllByTestId } = renderWithProviders(
      <TableOfContentsList />,
      {
        preloadedState: {
          ...preloadedState,
          filterState: { filterValue: "non-existing" },
        },
      }
    );

    const matchingElements = queryAllByTestId((value) =>
      value.startsWith("list-item")
    );

    expect(matchingElements.length).toBe(0);
  })
});
