import { LECTooltip } from "@lansweeper/lecfrontcomponents";
import React from "react";
import { Tab, TabContainer } from "./SimpleTabs.styles";

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
