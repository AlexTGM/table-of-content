import { useEffect } from "react";
import {
  FilterInput,
  TableOfContentProps,
  selectSelectedItemPath,
  useTableOfContentInit,
} from "../../../../features";
import { useAppSelector, getNodeId } from "../../../../shared";
import { TableOfContentsList } from "./list";
import { useSelectedStateRestore } from "./use-selected-state-restore";

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
      <TableOfContentsList />;
    </>
  );
};
