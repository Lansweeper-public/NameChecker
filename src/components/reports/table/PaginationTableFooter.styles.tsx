import styled from "../../../theme";
import { CursorTableFooter } from "../../common/tableView";

export const StyledCursorTableFooter = styled(CursorTableFooter)<{
  isHidden: boolean;
}>`
  position: fixed;
  bottom: 0;
  z-index: 3;
  left: 0;
  ${({ isHidden }) => (isHidden ? "display: none" : "")};
`;
