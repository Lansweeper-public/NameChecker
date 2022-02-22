import {
  ILECButtonProps,
  LECButton,
  LECModal,
} from "@lansweeper/lecfrontcomponents";
import styled from "../../../theme";

interface IConfirmationButton extends ILECButtonProps {
  loading?: boolean;
}

export const ConfirmationButton = styled(LECButton)<IConfirmationButton>`
  min-width: auto;
  width: 3.5625rem;
  ${({ loading }) =>
    loading &&
    `
      padding: 0;
    `}
`;

export const StyledLECModal = styled(LECModal)`
  .lec-modal__header__title:after {
    width: 3rem;
  }
`;
