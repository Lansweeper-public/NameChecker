import { LECCursorTableFooter } from "@lansweeper/lecfrontcomponents";
import { Page, FullPageContent } from "../../components";
import styled from "../../theme";

const StyledPage = styled(Page)`
  flex-direction: column;
  margin-right: 0;
  margin-left: 0;
  background-color: var(--lighter-grey);
  padding: 30px 136px 4px 122px;
`;

const StyledFullPageContent = styled(FullPageContent)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 75px;
`;

const StyledTableContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  .lsd-table__empty {
    height: 312.9px;
    border-top: 7.4px solid var(--lighter-grey);
    position: initial;

    .lec-empty-title {
      font-size: 15px;
      font-weight: 500;
      color: var(--grey-80);
    }
  }

  .lec-cursor-table-footer.lec-table-footer.lec-table-view__footer.shortBorder {
    flex-flow: column nowrap;
    align-items: initial;
    height: initial;

    .lec-table-footer__content-left {
      margin-left: initial;

      .lsd-table__table {
        width: 100%;
      }
    }
  }

  .lec-table-view.lsd-table-view .lec-table-footer {
    box-shadow: initial;
  }

  .lec-icon-check:before {
    color: var(--green);
  }

  .lec-icon-close:before {
    color: var(--red);
  }

  .lec-table-footer__content-left {
    margin-left: initial;

    .lsd-table__table {
      width: 100%;
    }
  }

  .lsd-table__scrolling-container {
    height: initial;
  }
`;

const StyledLECCursorTableFooter = styled(LECCursorTableFooter)<{
  isHidden: boolean;
}>`
  position: fixed;
  bottom: 0;
  z-index: 3;
  left: 0;
  ${({ isHidden }) => (isHidden ? "display: none" : "")};
`;

export {
  StyledPage,
  StyledFullPageContent,
  StyledTableContainer,
  StyledLECCursorTableFooter,
};
