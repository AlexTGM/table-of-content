export interface Page {
  id: string;
  title: string;
  url: string;
  level: number;
  parentId: string;
  pages?: string[];
  tabIndex: number; // ignored
}

export type PageResponse = {
  entities: {
    pages: Record<string, Page>;
  };
  topLevelIds: string[];
};
