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

export const TableOfContentLoaded = ({
  inputData,
  selectedPageId,
  onSelect,
}: TableOfContentProps) => {
  useTableOfContentInit(inputData);
  useSelectedStateRestore(selectedPageId);

  const selectedPath = useAppSelector(selectSelectedItemPath);

  useEffect(() => {
    selectedPath && onSelect(getNodeId(selectedPath));
  }, [onSelect, selectedPath]);

  return (
    <>
      <FilterInput />
      <TableOfContentsList />
    </>
  );
};
