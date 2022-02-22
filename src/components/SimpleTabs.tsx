import { LECTooltip } from "@lansweeper/lecfrontcomponents";
import React from "react";
import styled from "../theme";

const TabContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  height: 40px;
`;

const Tab = styled.div<{ active: boolean }>`
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

interface ITab {
  id: string;
  title: string;
  to: string;
}

interface ISimpleTabs {
  tabs: ITab[];
  isTabActive: (tab: ITab) => boolean;
  onSelectTab: (tab: ITab) => void;
  isTabDisabled: (tab: ITab) => boolean;
}

export const SimpleTabs: React.FC<ISimpleTabs> = ({
  tabs,
  isTabActive,
  onSelectTab,
  isTabDisabled,
}) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          active={isTabActive(tab)}
          onClick={() => onSelectTab(tab)}
        >
          {isTabDisabled(tab) ? (
            <LECTooltip title="Must apply a filter" type="info-grey">
              <span>{tab.title}</span>
            </LECTooltip>
          ) : (
            <span>{tab.title}</span>
          )}
        </Tab>
      ))}
    </TabContainer>
  );
};
