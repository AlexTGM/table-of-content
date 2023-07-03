import { useEffect } from "react";
import { selectRawData } from "../../../../entities";
import { ExpandableItemsSlice, SelectableItemsSlice } from "../../../../features";
import { useAppDispatch, useAppSelector, joinPath } from "../../../../shared";

export const useSelectedStateRestore = (selectedPageId: string | null) => {
  const dispatch = useAppDispatch();
  const rawData = useAppSelector(selectRawData);

  useEffect(() => {
    if (selectedPageId === null || Object.keys(rawData).length === 0) return;

    const nodes = [selectedPageId];
    let page = rawData[selectedPageId];

    if (page === undefined) return;

    do {
      nodes.unshift(page.parentId);
      page = rawData[page.parentId];
    } while (page?.parentId !== "ij");

    const path = joinPath(nodes);

    dispatch(ExpandableItemsSlice.actions.expandToPath(path));
    dispatch(SelectableItemsSlice.actions.setSelectedPath(path));
  }, [dispatch, rawData, selectedPageId]);
};
