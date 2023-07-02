import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useGetPagesQuery } from "../entities";
import { Header, Article } from "../widgets";

export const KnowledgeBase = (): JSX.Element => {
  const props = useGetPagesQuery();

  const [searchParams] = useSearchParams();
  const pageId = searchParams.get("pageId");

  console.log(props)

  return (
    <KnowledgeBaseContainer>
      <Header />

      <ContentContainer>
        <TableOfContentWrapper>
          {props.isLoading && <p data-testid="isLoading">Is Loading...</p>}
          {props.isSuccess && <p data-testid="loaded">Data Loaded</p>} 
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
