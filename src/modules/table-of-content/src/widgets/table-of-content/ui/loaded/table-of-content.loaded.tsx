import { selectRootNodes } from "../../../../entities";
import {
  TableOfContentProps,
  useTableOfContentInit,
} from "../../../../features";
import { useAppSelector } from "../../../../shared";

export const TableOfContentLoaded = ({ inputData }: TableOfContentProps) => {
  useTableOfContentInit(inputData);

  const rootNodes = useAppSelector(selectRootNodes);

  return (
    <ul data-testid="table-of-content">
      {rootNodes.map((node) => (
        <li key={node.path}>{node.path}</li>
      ))}
    </ul>
  );
};
