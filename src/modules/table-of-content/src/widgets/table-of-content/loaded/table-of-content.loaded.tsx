import { TableOfContentsList } from "./list";
import { useSelectedStateRestore } from "./use-selected-state-restore";
import {
  TableOfContentProps,
  useTableOfContentInit,
  FilterInput,
  selectFilterState,
  useSelectedPathUpdate,
} from "../../../features";
import React, {  } from "react";
import { TableOfContentNode, useAppSelector } from "../../../shared";

export const TableOfContentLoaded = React.memo(({
  inputData,
  selectedPageId,
  onSelect,
}: TableOfContentProps) => {
  const {filteredNodes} = useAppSelector(selectFilterState);

  useSelectedPathUpdate(onSelect);
  useTableOfContentInit(inputData);
  useSelectedStateRestore(selectedPageId);

  return (
    <>
      <FilterInput />

      {filteredNodes.length === 0
        ? <TableOfContentNode>Please adjust filters</TableOfContentNode>
        : <TableOfContentsList rootNodes={filteredNodes} />
      }
    </>
  );
});
