import React from "react";
import {
  StyledSiteListContainer,
  StyledSiteListItem,
  StyledSiteListItemContent,
  StyledSiteListItemTitle,
  StyledSiteListItemSubtitle,
} from "./SiteList.styles";
import { ISite } from "../../types";
import { Avatar } from "../avatar";

interface ISiteListProps {
  authorizedSites?: ISite[];
  disabled?: boolean;
  onSiteClick?: (siteId: string) => void;
  siteIdSelected?: string;
}

export const SiteList: React.FC<ISiteListProps> = ({
  authorizedSites = [],
  onSiteClick,
  siteIdSelected,
}) => {
  const onItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    siteId: string,
  ): void => {
    if (onSiteClick) {
      onSiteClick(siteId);
      event.preventDefault();
    }
  };

  return (
    <StyledSiteListContainer data-test-id="switch-site__site-list">
      {authorizedSites.map((site: ISite, index: number) => {
        const siteName = site.companyName || site.name;
        return (
          <a
            key={index}
            href={`/reports/${site.id}`}
            onClick={(event) => onItemClick(event, site.id)}
          >
            <StyledSiteListItem
              key={site.id}
              className={siteIdSelected === site.id ? "selected" : ""}
              data-test-id={`switch-site__site-btn--${index}`}
            >
              <Avatar
                image={site.logoUrl}
                name={siteName}
                mode="color"
                alt="Site image"
              />
              <StyledSiteListItemContent>
                <StyledSiteListItemTitle>{siteName}</StyledSiteListItemTitle>
                <StyledSiteListItemSubtitle>
                  app.lansweeper.com/{site.name}
                </StyledSiteListItemSubtitle>
              </StyledSiteListItemContent>
            </StyledSiteListItem>
          </a>
        );
      })}
    </StyledSiteListContainer>
  );
};
