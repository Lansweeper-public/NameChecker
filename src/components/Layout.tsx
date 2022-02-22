import styled from "../theme";

export const Page = styled.div`
  flex: 1;
  display: flex;
`;

export const PageMenu = styled.div`
  width: 264px;

  padding: 40px 16px 0 0;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

export const PageContent = styled.div`
  flex: 1;
  padding: 40px 32px;
`;

export const FullPageContent = styled.div`
  flex: 1;
`;

export const PageTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: "Quicksand";
  font-style: normal;
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.grey};
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 24px 0 32px;
  height: ${({ theme }) => theme.mixins.pxToRem(66)};
  min-height: ${({ theme }) => theme.mixins.pxToRem(66)};
  transition-property: margin-top;
  transition-duration: 0.3s;
  transition-delay: ease-out;

  border-bottom: ${({ theme }) => `2px solid ${theme.colors.lightGrey}`};
`;

export const Head = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    margin: 0;
    color: ${({ theme }) => theme.colors.grey};
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  padding-left: 16px;
  .lec-icon {
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    color: ${({ theme }) => theme.mixins.rgba(theme.colors.grey, 0.5)};
    :hover {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`;
