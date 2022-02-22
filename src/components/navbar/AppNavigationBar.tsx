import React from "react";
import { ISite } from "../../types";
import {
  StyledNavigationBar,
  StyledBrandContainerWithSite,
  StyledSpanWithSite,
  StyledBrandWithSite,
  StyledLogOutButton,
  StyledBackButton,
  StyledBackButtonContainer,
  StyledBackToSites,
  StyledColoredBrand,
  StyledBrandContainer,
  StyledImgWithSite,
  StyledLogOutAnchor,
} from "./AppNavigationBar.styles";

interface IAppNavigationBarProps {
  site: ISite;
  goToSitesPage: () => void;
}

export const AppNavigationBar: React.FC<IAppNavigationBarProps> = ({
  site,
  goToSitesPage,
}) => {
  return (
    <StyledNavigationBar>
      <StyledBackButtonContainer>
        <StyledBackToSites
          onClick={goToSitesPage}
          data-test-id="navigation-bar__go-to-sites"
        >
          <StyledBackButton src="/assets/svg/icon_16px_back.svg" />
          {site?.name}
        </StyledBackToSites>
      </StyledBackButtonContainer>
      <StyledBrandContainer>
        <StyledImgWithSite src="/assets/svg/name-checker-logo.svg" />
        <StyledBrandContainerWithSite>
          <StyledSpanWithSite>NameChecker</StyledSpanWithSite>
          <StyledBrandWithSite>
            by Lan<StyledColoredBrand>sweeper</StyledColoredBrand>
          </StyledBrandWithSite>
        </StyledBrandContainerWithSite>
      </StyledBrandContainer>
      <StyledLogOutAnchor href="/logout">
        <StyledLogOutButton>LOG OUT</StyledLogOutButton>
      </StyledLogOutAnchor>
    </StyledNavigationBar>
  );
};
