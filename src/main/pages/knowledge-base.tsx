import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useGetPagesQuery } from "../entities";
import { Header, Article } from "../widgets";
import { TableOfContentLoading } from "../../modules";

export const KnowledgeBase = (): JSX.Element => {
  const props = useGetPagesQuery();

  const [searchParams] = useSearchParams();
  const pageId = searchParams.get("pageId");

  return (
    <KnowledgeBaseContainer>
      <Header />

      <ContentContainer>
        <TableOfContentWrapper>
          {props.isLoading && <TableOfContentLoading />}
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
