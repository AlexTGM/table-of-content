import styled from "styled-components";
import { TextShimmer } from "../../../../../ui-kit";
import { TableOfContentNode } from "../../../shared";

const LoadingStateStyled = styled.ul`
  margin-top: 42px;
`;

export const TableOfContentLoading = () => {
  return (
    <LoadingStateStyled>
      {[...Array(8).keys()].map((index) => (
        <li key={index} data-testid={`skeleton-${index}`}>
          <TableOfContentNode>
            <TextShimmer />
          </TableOfContentNode>
        </li>
      ))}
    </LoadingStateStyled>
  );
};
