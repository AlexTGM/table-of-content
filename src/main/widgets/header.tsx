import styled from "styled-components";

// Just for demo purpose only

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Product name</HeaderTitle>
      <HeaderSubtitle>2021.3</HeaderSubtitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #27282c;
  color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  column-gap: 8px;
`;

const HeaderText = styled.p`
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.024px;
`;

const HeaderTitle = styled(HeaderText)`
  font-size: 17px;
`;

const HeaderSubtitle = styled(HeaderText)`
  font-size: 16px;
`;
