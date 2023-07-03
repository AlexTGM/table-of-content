import styled from "styled-components";

import { useGetPagesQuery } from "../entities";

// Just for demo purpose only

export const Article = ({ pageId }: { pageId: string | null }) => {
  const { data: rawData, isLoading, isSuccess } = useGetPagesQuery();

  if (pageId === null) return <CenteredText>Home</CenteredText>;

  if (isLoading) return <CenteredText>Loading...</CenteredText>;
  if (isSuccess) {
    if (rawData.entities.pages[pageId] !== undefined) {
      return <CenteredText>{pageId}</CenteredText>;
    }
  }

  return <CenteredText>Page Not Found</CenteredText>;
};

const CenteredText = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;
