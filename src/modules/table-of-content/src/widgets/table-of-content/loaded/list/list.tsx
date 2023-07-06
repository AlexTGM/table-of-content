import { useFilterItems } from "../../../../features";
import { TableOfContentNode, VirtualList } from "../../../../shared";
import { ListItem, useListItems } from "../list-item";

export const TableOfContentsList = () => {
  const rootNodes = useFilterItems();
  const listItems = useListItems(rootNodes);

  return listItems.length === 0 ? (
    <TableOfContentNode>Please adjust filters</TableOfContentNode>
  ) : (
    <VirtualList itemsCount={listItems.length}>
      {({ itemIndex }) => <ListItem itemPath={listItems[itemIndex]} />}
    </VirtualList>
  );
};
