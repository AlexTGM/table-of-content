import { fireEvent } from "@testing-library/react";
import { TableOfContentsList } from ".";
import { renderWithProviders } from "../../../../../shared";
import { preloadedState } from "../../../../../shared/tests/state-mock";

describe("List should", () => {
  it("render all items when filters are empty", () => {
    const { getByTestId } = renderWithProviders(<TableOfContentsList />, {
      preloadedState,
    });

    fireEvent.click(getByTestId("list-item-1"));
    fireEvent.click(getByTestId("list-item-2"));

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

    fireEvent.click(getByTestId("list-item-1"));
    fireEvent.click(getByTestId("list-item-2"));

    expect(queryByTestId("list-item-3")).toBeNull();
  });
});
