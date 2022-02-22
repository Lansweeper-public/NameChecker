import styled from "@emotion/styled";
import {
  ILECSelect,
  LECIconMaker,
  LECSelect,
} from "@lansweeper/lecfrontcomponents";

export const StyledLECSelect = styled(LECSelect)<ILECSelect>`
  .ant-select-selection-selected-value {
    svg {
      position: relative;
      margin-right: 0.75rem;
      top: 3px;
    }
    span {
      margin-left: 5px;
      font-size: 15px;
      font-weight: 500;
      ${({ disabled }) =>
        !disabled &&
        `
        color: var(--grey);
      `};
    }
  }
`;

export const SelectOptionIcon = styled(LECIconMaker)`
  position: relative;
  margin-right: 0.75rem;
  top: 0.1875rem;
`;
