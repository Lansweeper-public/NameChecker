import styled from "../../../theme";
import { Button, IButtonProps } from "../../common/button";
import { BasicModal } from "../../common/modal";

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

export const StyledModal = styled(BasicModal)`
  .lec-modal__header__title:after {
    width: 3rem;
  }
`;
