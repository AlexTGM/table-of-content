import {
  FilterInput,
  TableOfContentProps,
  useTableOfContentInit,
} from "../../../../features";
import { TableOfContentsList } from "./list";

export const TableOfContentLoaded = ({ inputData }: TableOfContentProps) => {
  useTableOfContentInit(inputData);

  return (
    <>
      <FilterInput />
      <TableOfContentsList />;
    </>
  );
};
