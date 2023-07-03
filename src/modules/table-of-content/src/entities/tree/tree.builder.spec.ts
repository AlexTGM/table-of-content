import { buildTree } from "./tree.builder";

describe("Build Tree should", () => {
  const getChildren = (): string[] | undefined => undefined;

  test("returns an empty array when topLevelIds is empty", () => {
    const topLevelIds: string[] = [];
    const result = buildTree({ topLevelIds, getChildren });

    expect(result).toEqual([]);
  });

  test("returns an array of TreeNodes with correct paths", () => {
    const topLevelIds = ["1", "2", "3"];

    const getChildren = (elementId: string): string[] | undefined => {
      if (elementId === "1") return ["1.1", "1.2"];
      if (elementId === "2") return ["2.1"];
      if (elementId === "3") return undefined;

      return undefined;
    };

    const result = buildTree({ topLevelIds, getChildren });

    expect(result).toHaveLength(3);
    expect(result[0].path).toEqual("1");
    expect(result[0].children).toHaveLength(2);
    expect(result[0].children[0].path).toEqual("1//1.1");
    expect(result[0].children[1].path).toEqual("1//1.2");
    expect(result[1].path).toEqual("2");
    expect(result[1].children).toHaveLength(1);
    expect(result[1].children[0].path).toEqual("2//2.1");
    expect(result[2].path).toEqual("3");
    expect(result[2].children).toHaveLength(0);
  });

  test('returns an array of TreeNodes with nested children', () => {
    const topLevelIds = ['1', '2'];
    const getChildren = (elementId: string): string[] | undefined => {
      if (elementId === '1') return ['1.1', '1.2'];
      if (elementId === '1.1') return ['1.1.1'];
      if (elementId === '1.1.1') return ['1.1.1.1'];
      return undefined;
    };

    const result = buildTree({ topLevelIds, getChildren });

    expect(result).toHaveLength(2);
    expect(result[0].path).toEqual('1');
    expect(result[0].children).toHaveLength(2);
    expect(result[0].children[0].path).toEqual('1//1.1');
    expect(result[0].children[0].children).toHaveLength(1);
    expect(result[0].children[0].children[0].path).toEqual('1//1.1//1.1.1');
    expect(result[0].children[0].children[0].children).toHaveLength(1);
    expect(result[0].children[0].children[0].children[0].path).toEqual('1//1.1//1.1.1//1.1.1.1');
    expect(result[0].children[1].path).toEqual('1//1.2');
    expect(result[0].children[1].children).toHaveLength(0);
    expect(result[1].path).toEqual('2');
    expect(result[1].children).toHaveLength(0);
  });
});
