import styled from "@emotion/styled";
import { LECMainModal } from "@lansweeper/lecfrontcomponents";
import React, { useState } from "react";
import { SiteList } from "../authorizedSites/SiteList";
import { ISite } from "../../types/site";

interface IChangeSitesModalProps {
  currentSiteId: string;
  sites: ISite[];
  open: boolean;
  loading: boolean;
  onClose: () => void;
  applyFilters: (siteId: string) => void;
}

const StyledParagraph = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: var(--grey);
  margin-bottom: 1.5rem;
`;

export const ChangeSitesModal: React.FC<IChangeSitesModalProps> = ({
  currentSiteId,
  sites,
  open,
  loading,
  onClose,
  applyFilters,
}) => {
  const [siteIdSelected, setSiteIdSelected] = useState<string>("");
  const title = "Apply to other site?";
  const sitesToShow = sites.filter((site) => site.id !== currentSiteId);

  const onSiteClick = (siteId: string) => {
    setSiteIdSelected(siteId);
  };

  return (
    <LECMainModal
      title={title}
      open={open}
      primaryBtn={{
        loading,
        label: "Apply",
        onClick: () => applyFilters(siteIdSelected),
        disabled: !siteIdSelected,
        disableMinWidth: true,
      }}
      onClose={() => {
        setSiteIdSelected("");
        onClose();
      }}
    >
      <StyledParagraph>
        Select which site you want to apply these filters
      </StyledParagraph>
      <SiteList
        authorizedSites={sitesToShow}
        onSiteClick={onSiteClick}
        siteIdSelected={siteIdSelected}
      />
    </LECMainModal>
  );
};
