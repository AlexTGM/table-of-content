import { useMemo } from "react";
import { ExpandableItemsSlice, selectExpandedState } from "../../../../features";
import { VirtualList, getNodeId, getParentNodeId, useAppDispatch, useAppSelector } from "../../../../shared";
import { ListItem, useListItems } from "../list-item";
import { TreeNode, selectRawData } from "../../../../entities";

interface TableOfContentsListProps {
  rootNodes: TreeNode[],
}

export const TableOfContentsList = ({ rootNodes }: TableOfContentsListProps) => {
  const dispatch = useAppDispatch();

  const rawData = useAppSelector(selectRawData);
  const expandState = useAppSelector(selectExpandedState);
  const listItems = useListItems(rootNodes);

  const configuration = useMemo<Record<string, (index: number) => number | undefined>>(() => ({
    ArrowRight: index => {
      const nodeId = getNodeId(listItems[index]);

      if (rawData[nodeId].pages?.length && !expandState[nodeId]) {
        dispatch(ExpandableItemsSlice.actions.expandItem(nodeId));
      }

      return undefined;
    },
    ArrowLeft: (index) => {
      const nodeId = getNodeId(listItems[index]);
      const parentId = getParentNodeId(listItems[index]);

      let nodeIdToCollapse: string | undefined = undefined;

      if (rawData[nodeId].pages?.length && expandState[nodeId]) {
        nodeIdToCollapse = nodeId;
      } else if (parentId && expandState[parentId]) {
        nodeIdToCollapse = parentId;
      }

      if (nodeIdToCollapse) {
        const id = nodeIdToCollapse;

        dispatch(ExpandableItemsSlice.actions.collapseItem(id));
        return listItems.findIndex(path => path.endsWith(id));
      }

      return undefined;
    },
  }), [dispatch, expandState, listItems, rawData]);

  return <VirtualList itemsCount={listItems.length} configuration={configuration}>
    {({ itemIndex, innerRef }) => <ListItem
      innerRef={innerRef}
      itemPath={listItems[itemIndex]}
    />}
  </VirtualList>
};
