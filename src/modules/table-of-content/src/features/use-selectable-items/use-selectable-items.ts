import { SelectableItemsSlice } from ".";
import { useMemo, useCallback } from "react";
import { useAppDispatch } from "../../shared";

export const useSelectableItems = (path: string) => {
  const dispatch = useAppDispatch();

  const handleSelect = useCallback(() => {
    dispatch(SelectableItemsSlice.actions.setSelectedPath(path));
  }, [dispatch, path]);

  return useMemo(() => ({ handleSelect }), [handleSelect]);
};
