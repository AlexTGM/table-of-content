import { useEffect } from "react";
import { TableOfContentsList } from "./list";
import { useSelectedStateRestore } from "./use-selected-state-restore";
import {
  TableOfContentProps,
  useTableOfContentInit,
  selectSelectedItemPath,
  FilterInput,
} from "../../../features";
import { useAppSelector, getNodeId } from "../../../shared";
import React from "react";

const useSelectedPathUpdate = (onSelect: (selectedPageId: string) => void) => {
  const selectedPath = useAppSelector(selectSelectedItemPath);

  useEffect(() => {
    selectedPath && onSelect(getNodeId(selectedPath));
  }, [onSelect, selectedPath]);
}

export const TableOfContentLoaded = React.memo(({
  inputData,
  selectedPageId,
  onSelect,
}: TableOfContentProps) => {
  useSelectedPathUpdate(onSelect);
  useTableOfContentInit(inputData);
  useSelectedStateRestore(selectedPageId);

  return (
    <>
      <FilterInput />
      <TableOfContentsList />
    </>
  );
});
