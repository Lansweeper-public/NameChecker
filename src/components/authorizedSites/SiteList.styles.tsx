import styled from "@emotion/styled";

const StyledSiteListContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledSiteListItem = styled.li<{
  disabled?: boolean;
  onClick?: () => void;
}>`
  border: 1px solid var(--light-grey);
  margin: 0;
  padding: 1.063rem 1rem;
  display: flex;
  align-items: center;
  background-color: ${({ disabled }) => disabled && "var(--lighter-grey-40)"};
  margin-bottom: 8px;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "var(--lighter-grey-40)" : "var(--lighter-grey)"};
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &.selected {
    background-color: var(--lighter-grey-60)};
  }
`;

const StyledSiteListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.75rem;
`;

const StyledSiteListItemTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: var(--grey);
`;

const StyledSiteListItemSubtitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--grey-80);
`;

export {
  StyledSiteListContainer,
  StyledSiteListItem,
  StyledSiteListItemContent,
  StyledSiteListItemTitle,
  StyledSiteListItemSubtitle,
};
