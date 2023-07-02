import { SelectableItemSlice, selectSelectedItemPath } from ".";
import { useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../shared";

export const useSelectableItems = (path: string) => {
  const dispatch = useAppDispatch();

  const selectedItemPath = useAppSelector(selectSelectedItemPath);

  const handleSelect = useCallback(() => {
    dispatch(SelectableItemSlice.actions.setSelectedPath(path));
  }, [dispatch, path]);

  return useMemo(
    () => ({ selectedItemPath, handleSelect }),
    [handleSelect, selectedItemPath]
  );
};