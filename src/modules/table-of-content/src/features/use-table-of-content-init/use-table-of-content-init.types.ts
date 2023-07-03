export type InputData = {
  entities: {
    pages: Record<
      string,
      {
        title: string;
        parentId: string;
        level: number;
        pages?: string[];
      }
    >;
  };
  topLevelIds: string[];
};

export interface TableOfContentProps {
  inputData: InputData;
  selectedPageId: string | null;
  onSelect: (selectedPageId: string) => void;
}
