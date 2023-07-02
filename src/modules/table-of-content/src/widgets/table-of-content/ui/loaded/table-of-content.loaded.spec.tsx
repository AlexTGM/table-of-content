import { TableOfContentLoaded } from ".";
import { renderWithProviders } from "../../../../shared";

describe("Table Of Content Loaded should", () => {
  it("render all elements", () => {
    const inputData = {
      entities: { pages: {
        "1": {
          parentId: 'ij',
          level: 0,
          title: 'Item #1',
          pages: [],
        },
        "2": {
          parentId: 'ij',
          level: 0,
          title: 'Item #3',
          pages: [],
        },
        "3": {
          parentId: 'ij',
          level: 0,
          title: 'Item #4',
          pages: [],
        }
      } },
      topLevelIds: ["1", "2", "3"],
    };

    const { baseElement } = renderWithProviders(
      <TableOfContentLoaded inputData={inputData} />
    );

    expect(baseElement).toHaveTextContent('123');
  });
});
