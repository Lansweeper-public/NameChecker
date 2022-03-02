import React, { ReactNode } from "react";
import { ModalBody, ModalFooter } from "../../common/modal";
import { Spin } from "../../common/spin";
import { ConfirmationButton, StyledModal } from "./ConfirmationModal.styles";

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
    <StyledModal
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
      <ModalBody>
        {typeof message === "string" ? <span>{message}</span> : message}
      </ModalBody>
      <ModalFooter>
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
          {loading ? <Spin type="ellipsis" /> : "Yes"}
        </ConfirmationButton>
      </ModalFooter>
    </StyledModal>
  );
};
