import { ListItem, useListItems } from "../list-item";
import { TreeNode } from "../../../../entities";
import { VirtualList } from "../../../../../../ui-kit";
import { useKeyboard } from "./use-keyboard";

interface TableOfContentsListProps {
  rootNodes: TreeNode[];
}

export const TableOfContentsList = ({
  rootNodes,
}: TableOfContentsListProps) => {
  const listItems = useListItems(rootNodes);

  const configuration = useKeyboard(listItems);

  return (
    <VirtualList itemsCount={listItems.length} configuration={configuration}>
      {({ itemIndex, innerRef, updateCurrentItemIndex }) => (
        <ListItem
          index={itemIndex}
          innerRef={innerRef}
          itemPath={listItems[itemIndex]}
          updateCurrentItemIndex={updateCurrentItemIndex}
        />
      )}
    </VirtualList>
  );
};
