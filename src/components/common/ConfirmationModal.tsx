import React, { ReactNode } from "react";
import {
  LECModal,
  LECModalBody,
  LECModalFooter,
  LECButton,
  LECSpin,
  ILECButtonProps,
} from "@lansweeper/lecfrontcomponents";
import styled from "../../theme";

interface IConfirmationButton extends ILECButtonProps {
  loading?: boolean;
}
const ConfirmationButton = styled(LECButton)<IConfirmationButton>`
  min-width: auto;
  width: 3.5625rem;
  ${({ loading }) =>
    loading &&
    `
      padding: 0;
    `}
`;

const StyledLECModal = styled(LECModal)`
  .lec-modal__header__title:after {
    width: 3rem;
  }
`;

interface IConfirmationModalProps {
  isOpen: boolean;
  loading?: boolean;
  centered?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  check?: boolean;
  isConfirmation?: boolean;
  message: string | ReactNode;
  dataTestId?: string;
}

export const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  centered,
  check = false,
  loading = false,
  isConfirmation = false,
  dataTestId = "",
}) => {
  return (
    <StyledLECModal
      wrapProps={{
        "data-test-id": dataTestId,
      }}
      title={title}
      open={isOpen}
      onClose={onClose}
      alert={!check}
      width="416px"
      centered={centered}
    >
      <LECModalBody>
        {typeof message === "string" ? <span>{message}</span> : message}
      </LECModalBody>
      <LECModalFooter>
        <ConfirmationButton secondary={check} onClick={onClose}>
          No
        </ConfirmationButton>
        <ConfirmationButton
          alert={!check}
          check={check}
          loading={loading}
          onClick={onConfirm}
          isConfirmation={isConfirmation}
        >
          {loading ? <LECSpin type="ellipsis" /> : "Yes"}
        </ConfirmationButton>
      </LECModalFooter>
    </StyledLECModal>
  );
};
