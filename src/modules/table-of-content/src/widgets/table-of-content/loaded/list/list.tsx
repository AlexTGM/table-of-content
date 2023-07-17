import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExpandableItemsSlice, selectExpandedState, useFilterItems } from "../../../../features";
import { TableOfContentNode, VirtualList, getNodeId, getParentNodeId, getPathNodes, useAppDispatch, useAppSelector } from "../../../../shared";
import { ListItem, useListItems } from "../list-item";
import { selectTreeState } from "../../../../entities";

const useKeyboardNavigation = (listItems: string[]) => {
  const dispatch = useAppDispatch();

  const [currentItemPath, setCurrentItemPath] = useState('')

  const {rawData} = useAppSelector(selectTreeState);
  const expandedState = useAppSelector(selectExpandedState);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>, path: string) => {
    const handleExpand = (id: string) => dispatch(ExpandableItemsSlice.actions.expandItem(id));
    const handleCollapse = (id: string) => dispatch(ExpandableItemsSlice.actions.collapseItem(id));

    if (e.key === 'ArrowLeft') {
      const nodeId = getNodeId(path);

      if (rawData[nodeId].pages?.length === 0 || expandedState[nodeId]) {
        handleCollapse(nodeId);

        setCurrentItemPath(nodeId);

        return;
      }

      const parentId = getParentNodeId(path);

      if (parentId) {
        handleCollapse(parentId);
        setCurrentItemPath(getPathNodes(path).slice(0, getPathNodes(path).length - 1).join('//'));
        return;
      }
    } else if (e.key === 'ArrowRight') {
      const nodeId = getNodeId(path);

      handleExpand(nodeId);
    } else if (e.key === 'ArrowDown') {
      const index = listItems.findIndex((v) => v === path);

      if (index < listItems.length) {
        setCurrentItemPath(listItems[index + 1]);
      }
    } else if (e.key === 'ArrowUp') {
      const index = listItems.findIndex((v) => v === path);

      if (index > 0) {
        setCurrentItemPath(listItems[index - 1]);
      }
    }
  }, [dispatch, expandedState, listItems, rawData])

  return useMemo(() => ({
    handleKeyDown, currentItemPath
  }), [currentItemPath, handleKeyDown])
}

export const TableOfContentsList = () => {
  const currentItemRef = useRef<HTMLDivElement>(null);

  const rootNodes = useFilterItems();
  const listItems = useListItems(rootNodes);

  const { currentItemPath, handleKeyDown } = useKeyboardNavigation(listItems);

  useEffect(() => {
    currentItemRef.current?.focus?.();
  }, [currentItemPath])

  return listItems.length === 0 ? (
    <TableOfContentNode>Please adjust filters</TableOfContentNode>
  ) : (
    <VirtualList itemsCount={listItems.length}>
      {({ itemIndex }) => <ListItem
        innerRef={listItems[itemIndex] === currentItemPath ? currentItemRef : null}
        itemPath={listItems[itemIndex]}
        handleKeyDown={handleKeyDown}
      />}
    </VirtualList>
  );
};
