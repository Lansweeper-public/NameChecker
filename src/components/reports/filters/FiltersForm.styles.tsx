import styled from "../../../theme";
import { Button } from "../../common/button";
import { Icon } from "../../common/icon";
import { Tag } from "../../common/tag";

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  direction: row;
  margin-bottom: ${({ theme }) => theme.mixins.pxToRem(18)};
  align-self: center;
  & > .lec-select {
    flex: 1;
  }
`;

const StyledFilterContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 3px;
  border: solid 1px var(--light-grey);
  background-color: var(--white);
  padding: 24px;
`;

const StyledFormFooter = styled.div<{ isReadMode: boolean }>`
  display: flex;
  justify-content: ${({ isReadMode }) =>
    isReadMode ? "flex-start" : "flex-end"};

  .lec-button.lec-button--secondary + .lec-button.lec-button--secondary {
    margin-left: 4px;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  position: relative;
`;

const StyledTagListContainer = styled.div`
  margin-bottom: 12px;
  border-bottom: 2px solid var(--light-grey);
`;

const StyledTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 14px;
`;

const StyledExpressionTag = styled(Tag)<{
  onClick?: () => void;
}>`
  background-color: var(--lighter-grey-40);
  cursor: pointer;

  .lec-tag__content .lec-tag__content__label {
    color: var(--grey-80);
  }
`;

const StyledIcon = styled(Icon)`
  &.lec-icon {
    color: var(--grey-80);
    cursor: pointer;
  }
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  z-index: 1001;
`;

const StyledButton = styled(Button)`
  min-width: 104px;
`;

const StyledEditButton = styled(Button)`
  min-width: 104px;
  margin-right: 8px;
`;

const StyledCancelButton = styled(Button)`
  width: 104px;
  margin-right: 12px;
`;

export {
  StyledHeader,
  StyledFilterContainer,
  StyledButton,
  StyledCancelButton,
  StyledEditButton,
  StyledFormFooter,
  StyledForm,
  StyledTagList,
  StyledTagListContainer,
  StyledExpressionTag,
  StyledIcon,
};
