import { LECCursorTableFooter } from "@lansweeper/lecfrontcomponents";
import styled from "../../../theme";

export const StyledLECCursorTableFooter = styled(LECCursorTableFooter)<{
  isHidden: boolean;
}>`
  position: fixed;
  bottom: 0;
  z-index: 3;
  left: 0;
  ${({ isHidden }) => (isHidden ? "display: none" : "")};
`;
