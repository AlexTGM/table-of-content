import {
  getPathNodes,
  getFirstNodeId,
  getParentNodeId,
  getNodeId,
  joinPath,
  concatPath,
} from ".";

describe("Path Utils should", () => {
  test.each([
    ["path1//path2//path3", ["path1", "path2", "path3"]],
    ["path1//path2", ["path1", "path2"]],
    ["path1", ["path1"]],
  ])("getPathNodes(%s) returns %p", (path, expected) => {
    expect(getPathNodes(path)).toEqual(expected);
  });

  test.each([
    ["path1//path2//path3", "path1"],
    ["path1//path2", "path1"],
    ["path1", "path1"],
  ])("getFirstNodeId(%s) returns %s", (path, expected) => {
    expect(getFirstNodeId(path)).toEqual(expected);
  });

  test.each([
    ["path1//path2//path3", "path2"],
    ["path1//path2", "path1"],
  ])("getParentNodeId(%s) returns %s", (path, expected) => {
    expect(getParentNodeId(path)).toEqual(expected);
  });

  test.each([
    ["path1//path2//path3", "path3"],
    ["path1//path2", "path2"],
    ["path1", "path1"],
  ])("getNodeId(%s) returns %s", (path, expected) => {
    expect(getNodeId(path)).toEqual(expected);
  });

  test.each([
    [["path1", "path2", "path3"], "path1//path2//path3"],
    [["path1", "path2"], "path1//path2"],
    [["path1"], "path1"],
  ])("joinPath(%p) returns %s", (nodes, expected) => {
    expect(joinPath(nodes)).toEqual(expected);
  });

  test.each([
    ["path1", "path2", "path1//path2"],
    ["path1//path2", "path3", "path1//path2//path3"],
  ])("concatPath(%s, %s) returns %s", (path1, path2, expected) => {
    expect(concatPath(path1, path2)).toEqual(expected);
  });
});
