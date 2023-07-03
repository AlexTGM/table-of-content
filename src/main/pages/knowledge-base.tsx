import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useGetPagesQuery } from "../entities";
import { Header, Article } from "../widgets";
import { useCallback } from "react";
import {
  TableOfContentLoadedState,
  TableOfContentLoadingState,
} from "../../modules";

export const KnowledgeBase = (): JSX.Element => {
  const props = useGetPagesQuery();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageId = searchParams.get("pageId");

  const handleChange = useCallback(
    (selectedPageId: string) => {
      setSearchParams({ pageId: selectedPageId });
    },
    [setSearchParams]
  );

  return (
    <KnowledgeBaseContainer>
      <Header />

      <ContentContainer>
        <TableOfContentWrapper>
          {props.isLoading && <TableOfContentLoadingState />}
          {props.isSuccess && (
            <TableOfContentLoadedState
              inputData={props.data}
              onSelect={handleChange}
              selectedPageId={pageId}
            />
          )}
        </TableOfContentWrapper>

        <Article pageId={pageId} />
      </ContentContainer>
    </KnowledgeBaseContainer>
  );
};

const KnowledgeBaseContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  column-gap: 22px;
  overflow: hidden;
`;

const TableOfContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 284px;
  border-right: 1px solid #27282c33;
`;
