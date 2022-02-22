import React from "react";
import { TooltipAlignConfig } from "antd/lib/tooltip";
import { ILECTableColumn, LECTooltip } from "@lansweeper/lecfrontcomponents";

export const columns: ILECTableColumn[] = [
  {
    key: "verified",
    name: "V",
    fixed: true,
    component: (
      <LECTooltip
        title="Verified"
        type="info-grey"
        placement="bottomLeft"
        align={{ offset: [-20, -4] } as TooltipAlignConfig}
      >
        <span>V</span>
      </LECTooltip>
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
