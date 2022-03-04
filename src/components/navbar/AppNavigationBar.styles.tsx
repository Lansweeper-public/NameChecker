import styled from "../../theme";
import { Button } from "../common/button";

const StyledNavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--light-grey);
  background-color: var(--grey);
  min-height: 66px;
  padding: 0 34px 0 28px;
`;

const StyledBrandContainerWithSite = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  padding: 0 32px;
`;

const StyledSpanWithSite = styled.span`
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  color: var(--white);
  margin-right: ${({ theme }) => theme.mixins.pxToRem(5)};
`;

const StyledBrandWithSite = styled.span`
  font-size: 12px;
  color: var(--lighter-grey-40);
  line-height: 33px;
  margin-right: 35.8px;
`;

const StyledLogOutAnchor = styled.a`
  text-decoration: none;
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

const StyledLogOutButton = styled(Button)`
  min-width: 82px;
  width: 82px;
  height: 23px;
  border-radius: 2px;
  line-height: 1.25;
  border: solid 1px var(--grey);
  background-color: var(--lighter-grey-40);
  color: var(--grey-80);
  font-size: 12px;
  padding: 4px 13px 4px 13px;

  &:hover {
    background-color: var(--lighter-grey);
  }
`;

const StyledImgWithSite = styled.img`
  width: 38.8px;
  height: 38.8px;
`;

const StyledBackButton = styled.img`
  margin-right: 7px;
`;

const StyledBackButtonContainer = styled.div`
  display: flex;
`;

const StyledBackToSites = styled.a`
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.mixins.rgba(theme.colors.white, 0.6)};
  }
`;

const StyledColoredBrand = styled.label`
  color: var(--primary);
`;

const StyledBrandContainer = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export {
  StyledNavigationBar,
  StyledBrandContainer,
  StyledColoredBrand,
  StyledBackToSites,
  StyledBackButtonContainer,
  StyledBackButton,
  StyledImgWithSite,
  StyledLogOutAnchor,
  StyledLogOutButton,
  StyledBrandContainerWithSite,
  StyledSpanWithSite,
  StyledBrandWithSite,
};
