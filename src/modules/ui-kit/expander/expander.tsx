import { memo } from "react";
import styled from "styled-components";

const ExpandIcon = styled.svg<{ $isExpanded: boolean }>`
  top: 8px;
  width: 20px;
  height: 20px;
  position: absolute;
  margin-left: -20px;

  transition: 0.2s ease-out;
  transform: ${(props) =>
    props.$isExpanded ? "rotate(90deg)" : "rotate(0deg)"};
`;

interface ExpanderProps {
  isExpanded: boolean;
}

export const Expander = memo(({ isExpanded }: ExpanderProps): JSX.Element => {
  return (
    <ExpandIcon $isExpanded={isExpanded} viewBox="-5 -3 24 24">
      <path d="M11 9l-6 5.25V3.75z" />
    </ExpandIcon>
  );
});
