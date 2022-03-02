import React from "react";
import { TooltipWrapper } from "../common/tooltip";
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
            <TooltipWrapper title="Must apply a filter" type="info-grey">
              <span>{tab.title}</span>
            </TooltipWrapper>
          ) : (
            <span>{tab.title}</span>
          )}
        </Tab>
      ))}
    </TabContainer>
  );
};
