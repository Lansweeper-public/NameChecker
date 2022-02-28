import { LECModal } from "@lansweeper/lecfrontcomponents";
import styled from "../../../theme";
import { Button, IButtonProps } from "../../common/button";

interface IConfirmationButton extends IButtonProps {
  loading?: boolean;
}

export const ConfirmationButton = styled(Button)<IConfirmationButton>`
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
