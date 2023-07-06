import styled, { css } from "styled-components";

export type HighlightType = "active" | "parent" | "ancestor" | "none";

export const TableOfContentNode = styled.div<{
  $highlightType?: HighlightType | undefined;
  $level?: number;
}>`
  user-select: none;
  position: relative;
  display: block;

  overflow: hidden;

  font-size: 13px;
  line-height: 20px;

  border-right: 22px solid transparent;
  border-left: 22px solid transparent;

  padding: ${(props) => css`8px 0 8px ${(props.$level ?? 0 + 1) * 16}px`};
  color: ${({ $highlightType }) =>
    $highlightType === "active" ? "#FFFFFF" : "#27282C"};
  background-color: ${({ $highlightType }) => {
    switch ($highlightType) {
      case "active":
        return "#307FFF";
      case "parent":
        return "#F4F4F4";
      case "ancestor":
        return "#F9F9F9";
      default:
        return undefined;
    }
  }};
`;
