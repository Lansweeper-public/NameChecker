import styled from "../theme";

const StyledHeader = styled.header`
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid var(--light-grey);
  background-color: var(--lighter-grey);
  min-height: 64px;
  padding-left: 32px;
  padding: 0 34px 0 28px;
`;

const StyledBrandContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
`;

const StyledSpan = styled.span`
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  color: var(--grey);
  margin-right: ${({ theme }) => theme.mixins.pxToRem(5)};
`;

const StyledBrand = styled.span`
  font-size: 12px;
  color: var(--grey-60);
  line-height: 33px;
  margin-right: 35.8px;
`;

const StyledImg = styled.img`
  width: 46.5px;
  height: 46.5px;
`;

export {
  StyledHeader,
  StyledBrandContainer,
  StyledSpan,
  StyledBrand,
  StyledImg,
};
