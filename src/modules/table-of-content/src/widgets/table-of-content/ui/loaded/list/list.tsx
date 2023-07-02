import { useFilterItems } from "../../../../../features";
import { List, TableOfContentNode } from "../../../../../shared";
import { ListItem, useListItems } from "../list-item";

export const TableOfContentsList = () => {
  const rootNodes = useFilterItems();
  const listItems = useListItems(rootNodes);

  return (
    <List>
      {rootNodes.length === 0 ? (
        <TableOfContentNode>Please adjust filters</TableOfContentNode>
      ) : (
        listItems.map((listItem) => (
          <ListItem itemPath={listItem} key={listItem} />
        ))
      )}
    </List>
  );
};
