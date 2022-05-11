import React from "react";
import { columns } from "./AssetResourcesTable.columns";
import { IAssetResource, IFiltersGroupedInput } from "../../../types";
import { ITableState } from "../../providers";
import { Icon } from "../../common/icon";
import { Table } from "../../common/tableView";

export enum TABS {
  ALL_ASSETS = "All assets",
  MATCHED = "Matched",
  NO_MATCH = "No Match",
}

export interface IAssetResourcesTable {
  items: IAssetResource[];
  tab: string;
  loading: boolean;
  filterValues: Record<string, unknown>;
  regExps: RegExp[];
  empty: React.ReactNode;
  filters: IFiltersGroupedInput;
  assetPos?: number;
  isHidden?: boolean;
}

const isCheckByTab = (tab, name, regExps) => {
  if (tab === TABS.ALL_ASSETS) {
    return regExps.some((regexp) => name?.toLowerCase()?.match(regexp));
  }

  if (tab === TABS.MATCHED) {
    return true;
  }

  return false;
};

export const AssetResourcesTable: React.FC<
  IAssetResourcesTable & ITableState
> = ({
  items,
  loading,
  filterValues,
  regExps,
  tab,
  empty,
  assetPos,
  isHidden,
}) => {
  const paginatedItems = items.map((asset: IAssetResource) => {
    const { name, type } = asset.assetBasicInfo ?? {};
    const { manufacturer } = asset.assetCustom ?? {};
    return {
      id: asset._id,
      selectionDisabled: true,
      attributes: {
        verified: {
          component: Object.keys(filterValues).length ? (
            <Icon
              icon={isCheckByTab(tab, name, regExps) ? "check" : "close"}
            ></Icon>
          ) : (
            ""
          ),
        },
        name: { text: name },
        type: { text: type },
        manufacturer: { text: manufacturer },
        assetKey: { text: asset.key },
      },
    };
  });

  return (
    <Table
      columns={columns}
      items={paginatedItems}
      loading={loading}
      empty={empty}
      hoverable={true}
      goToRow={assetPos}
      hidden={isHidden}
    />
  );
};
