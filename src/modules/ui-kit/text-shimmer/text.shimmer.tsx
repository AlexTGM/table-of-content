import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ShimmerContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 18px;
  background: linear-gradient(to right, #f6f7f8 4%, #ecebeb 25%, #f6f7f8 36%);
  background-size: 1000px 100%;
  animation: ${shimmerAnimation} 3s linear infinite;
`;

export const TextShimmer = () => {
  const minWidth = 75;
  const maxWidth = 100;

  const width = Math.floor(
    Math.random() * (maxWidth - minWidth + 1) + minWidth
  );

  return <ShimmerContainer width={width} />;
};
