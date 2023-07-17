import { filterData } from ".";
import { Pages } from "../../entities";

const node4 = { path: "4", children: [] };
const node3 = { path: "3", children: [] };
const node2 = { path: "2", children: [node4] };
const node1 = { path: "1", children: [node3] };

const rawData: Pages = {
  "1": {
    title: "Item #1",
  },
  "2": {
    title: "Item #2",
  },
  "3": {
    title: "Item #1",
  },
  "4": {
    title: "Subitem #4",
  },
} as unknown as Pages;

const rootNodes = [node1, node2];

describe("filter", () => {
  it("returns rootNodes when filterValue is empty", () => {
    const filterValue = "";
    const filteredNodes = filterData(filterValue, rootNodes, rawData);
    expect(filteredNodes).toEqual(rootNodes);
  });

  it("returns filtered nodes based on case-insensitive title matching", () => {
    const filterValue = "sub";
    const expectedFilteredNodes = [node2];
    const filteredNodes = filterData(filterValue, rootNodes, rawData);
    expect(filteredNodes).toEqual(expectedFilteredNodes);
  });

  it("returns empty array when no nodes match the filter value", () => {
    const filterValue = "non-existent";
    const filteredNodes = filterData(filterValue, rootNodes, rawData);
    expect(filteredNodes).toEqual([]);
  });
});
