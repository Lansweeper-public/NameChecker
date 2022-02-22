import React from "react";
import { LECMainModal } from "@lansweeper/lecfrontcomponents";
import styled from "@emotion/styled";

const StyledParragraph = styled.p`
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: var(--grey-80);
`;

const StyledImage = styled.img`
  margin-bottom: 0.75rem;
`;

const StyledCenteredDiv = styled.div`
  text-align: center;
`;

interface IHelpModalProps {
  onClose: () => void;
  open: boolean;
}

export const HelpModal: React.FC<IHelpModalProps> = ({ onClose, open }) => {
  return (
    <LECMainModal
      width={820}
      centered={true}
      open={open}
      onClose={onClose}
      title={"How it works?"}
      primaryBtn={{
        label: "GOT IT!",
        onClick: onClose,
        disableMinWidth: true,
      }}
    >
      <StyledParragraph>
        To find assets that do not comply to your naming convention, you can add
        filters that will display which assets do not conform. For example, your
        naming convention might expect a number at the end of the name. You can
        add a filter to find this
      </StyledParragraph>
      <StyledImage
        src="/assets/svg/help-modal/filter-1.svg"
        alt="Filter help modal 1"
      />
      <StyledParragraph>
        If you would like to specify multiple filters, to define your naming
        convention, you can add them to be applied separately. For example these
        filters look for assets that begin with either of two country codes. US
        or UK:
      </StyledParragraph>
      <StyledImage
        src="/assets/svg/help-modal/filter-2.svg"
        alt="Filter help modal 2"
      />
      <StyledParragraph>
        In this case, the assets with names beginning with UK or US, will be
        listed as compliant with your naming convention.
      </StyledParragraph>
      <StyledCenteredDiv>
        <img
          src="/assets/svg/help-modal/results-1.svg"
          alt="Results help modal 1"
        />
      </StyledCenteredDiv>
    </LECMainModal>
  );
};
