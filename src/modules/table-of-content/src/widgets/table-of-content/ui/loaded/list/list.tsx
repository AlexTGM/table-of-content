import { selectRootNodes } from "../../../../../entities";
import { List, useAppSelector } from "../../../../../shared";
import { ListItem, useListItems } from "../list-item";

export const TableOfContentsList = () => {
  const rootNodes = useAppSelector(selectRootNodes);

  const listItems = useListItems(rootNodes);

  return (
    <List>
      {listItems.map((listItem) => (
        <ListItem itemPath={listItem} key={listItem} />
      ))}
    </List>
  );
};
