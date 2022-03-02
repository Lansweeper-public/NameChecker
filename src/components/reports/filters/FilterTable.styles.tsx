import styled from "../../../theme";
import { Field } from "react-final-form";
import { Button } from "../../common/button";
import { TableView } from "../../common/tableView";

const StyledTableView = styled(TableView)`
  margin-bottom: 12px;

  .lsd-table__header-cell-content {
    font-size: 16px;
    color: var(--black);
    font-weight: 500;
    margin-left: 10px;
  }

  .lec-checkbox .box {
    display: none;
  }

  .lec-table__fixed__content {
    .content__column__row a {
      padding-left: 0;
    }

    .content__column__row--error a {
      color: var(--red);
      .lec-icon-alert {
        font-size: 1rem;
      }
    }
  }

  .lsd-table__table .lsd-table__cell {
    padding: 7px 0px 6px 10px;
  }

  .lsd-table__cell:first-of-type {
    span {
      padding-left: 7px;
    }
  }

  .lsd-table__cell:last-of-type {
    span {
      padding-right: 7px;
    }
  }

  .lsd-table__table .lsd-table__cell:last-child span,
  .lsd-table__table .lsd-table__cell:nth-of-type(4n) span {
    justify-content: flex-end;
  }

  .lsd-table__table .lsd-table__cell:nth-of-type(4n),
  .lsd-table__table .lsd-table__cell:nth-of-type(5n) {
    padding-left: 19px;
  }

  .lsd-table__table .lsd-table__cell:first-of-type {
    padding-left: 0px;
  }

  & th.lsd-table__header-cell {
    padding: 0;
    height: auto;
  }

  & th.lsd-table__header-cell:first-of-type div {
    margin-left: 10;
  }

  .lsd-table__header-cell {
    padding: initial;
    text-transform: initial;
  }

  .lec-input.lec-input-input,
  .lec-form-control {
    width: 100%;
  }

  .lsd-table--border-bottom {
    border: none;
  }

  .lsd-table tbody tr {
    border: none;
  }

  .lsd-table tbody {
    & tr:nth-of-type(odd) > td {
      background-color: initial;
    }
    & .lsd-table__cell.lsd-table__cell--selected {
      background-color: var(--light-grey-60);
    }
  }

  .lsd-table__header-cell {
    box-shadow: initial;
  }
`;

const StyledField = styled(Field)`
  .ant-select-selection-selected-value {
    font-size: 16px;
    color: var(--grey);
    font-weight: 500;
  }

  .ant-select-selection__rendered {
    line-height: 38px;
  }

  .ant-select-selection {
    border-radius: 2px;
    height: initial;
    border: 1px solid var(--light-grey);
  }
`;

const StyledButton = styled(Button)`
  min-height: 40px;
  min-width: 40px;
  align-self: flex-end;
  min-width: 40px;
  padding: 14px 12px 10px;
  border-radius: 3px;
  border: solid 1px var(--light-grey);
  background-color: var(--lighter-grey-40);

  .lec-icon {
    margin-right: initial;
    color: #000000;
  }

  &:hover {
    background-color: var(--lighter-grey);
  }
`;

export { StyledTableView, StyledButton, StyledField };
