import React from "react";
import { TooltipAlignConfig } from "antd/lib/tooltip";
import { TooltipWrapper } from "../../common/tooltip";
import { ITableColumn } from "../../common/tableView";

export const columns: ITableColumn[] = [
  {
    key: "verified",
    name: "V",
    fixed: true,
    component: (
      <TooltipWrapper
        title="Verified"
        type="info-grey"
        placement="bottomLeft"
        align={{ offset: [-20, -4] } as TooltipAlignConfig}
      >
        <span>V</span>
      </TooltipWrapper>
    ),
    width: "50",
  },
  {
    key: "name",
    name: "Name",
    fixed: true,
  },
  {
    key: "type",
    name: "Type",
  },
  {
    key: "manufacturer",
    name: "Manufacturer",
  },
  {
    key: "assetKey",
    name: "Asset ID",
  },
];

export const SORT_DEFAULT_COLUMN = columns[1];
