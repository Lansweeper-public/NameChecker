import {
  LECModalBody,
  LECModalFooter,
  LECSpin,
} from "@lansweeper/lecfrontcomponents";
import React, { ReactNode } from "react";
import { ConfirmationButton, StyledLECModal } from "./ConfirmationModal.styles";

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
