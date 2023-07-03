import { TableOfContentLoading } from "..";
import { renderWithProviders } from "../../../shared";

describe("Table Of Content Loading should", () => {
  it("render exact 8 elements", () => {
    const { queryAllByTestId } = renderWithProviders(<TableOfContentLoading />);

    const matchingElements = queryAllByTestId((value) =>
      value.startsWith("skeleton")
    );

    expect(matchingElements.length).toBe(8);
  });
});
