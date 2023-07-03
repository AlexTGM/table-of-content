import { ExpandableItemsSlice, selectIsExpanded } from ".";
import { useCallback, useMemo } from "react";
import { selectNodeData } from "../../entities";
import { useAppDispatch, useAppSelector } from "../../shared";

export const useExpandableItem = (nodeId: string) => {
  const dispatch = useAppDispatch();

  const { pages } = useAppSelector((state) => selectNodeData(state, nodeId));
  const isExpanded = useAppSelector((state) => selectIsExpanded(state, nodeId));
  const isExpandable = useMemo(() => (pages?.length ?? 0) > 0, [pages]);

  const handleExpand = useCallback(() => {
    dispatch(ExpandableItemsSlice.actions.toggleItem(nodeId));
  }, [dispatch, nodeId]);

  return useMemo(
    () => ({
      isExpandable,
      isExpanded,
      handleExpand,
    }),
    [handleExpand, isExpandable, isExpanded]
  );
};
