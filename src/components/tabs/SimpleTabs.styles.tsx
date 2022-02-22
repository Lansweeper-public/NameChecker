import styled from "../../theme";

export const TabContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  height: 40px;
`;

export const Tab = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
  border-top: 2px solid var(--light-grey);
  border-right: 2px solid var(--light-grey);
  ${({ active }) => !active && `border-bottom: 2px solid var(--light-grey)`};
  background-color: var(
    --${({ active }) => (active ? "white" : "lighter-grey")}
  );
  span {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    padding: 13px 23px;
    height: 40px;
    width: 128px;
    text-align: center;
    color: var(--${({ active }) => (active ? "grey" : "grey-80")});
  }
  &:first-of-type {
    margin-left: 0;
  }
  ${({ active }) =>
    active &&
    `
    &:after {
      content: "";
      position: absolute;
      width: 16px;
      height: 2px;
      bottom: 5px;
      margin-left: auto;
      margin-right: auto;
      background-color: var(--primary);
    }
  `}
`;
