import styled from "styled-components";
import { TableOfContentNode } from "./table-of-content-node.base";

export const InteractiveTableOfContentNode = styled(TableOfContentNode)`
  cursor: pointer;

  &:hover {
    background-color: ${({ $highlightType }) =>
      $highlightType === "active" ? "#307FDD" : "#19191C0D"};
  }

  &:focus {
    outline-offset: -1px;
    outline-color: #307fff;
  }
`;
