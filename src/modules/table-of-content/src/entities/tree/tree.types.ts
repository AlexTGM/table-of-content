export type TreeNode = {
  path: string;
  children: TreeNode[];
};

export type TreeSliceState = {
  nodes: TreeNode[];
  rawData: Pages;
};

export type Pages = Record<
  string,
  {
    title: string;
    parentId: string;
    level: number;
    pages?: string[];
  }
>;

export type BuildTreeProps = {
  topLevelIds: string[];
  getChildren: (elementId: string) => string[] | undefined;
};

export type BuildTree = (props: BuildTreeProps) => TreeNode[];
