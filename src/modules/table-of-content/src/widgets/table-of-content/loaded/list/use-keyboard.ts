import { useMemo } from "react";
import { selectRawData } from "../../../../entities";
import { selectExpandedState, ExpandableItemsSlice } from "../../../../features";
import { useAppDispatch, useAppSelector, getNodeId, getParentNodeId } from "../../../../shared";

export const useKeyboard = (listItems: string[]) => {
  const dispatch = useAppDispatch();

  const rawData = useAppSelector(selectRawData);
  const expandState = useAppSelector(selectExpandedState);

  return useMemo<Record<string, (index: number) => number | undefined>>(
    () => ({
      ArrowRight: (index) => {
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
          return listItems.findIndex((path) => path.endsWith(id));
        }

        return undefined;
      },
    }),
    [dispatch, expandState, listItems, rawData]
  );
};
