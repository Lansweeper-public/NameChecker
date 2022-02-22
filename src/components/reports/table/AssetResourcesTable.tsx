import React from "react";
import { LSDTable, LECIcon } from "@lansweeper/lecfrontcomponents";
import { IFiltersGroupedInput } from "@lansweeper/integrations-dataset";
import { columns } from "./AssetResourcesTable.columns";
import { IAssetResource } from "../../../types";
import { ITableState } from "../../providers";

export interface IAssetResourcesTable {
  items: IAssetResource[];
  loading: boolean;
  filterValues: Record<string, unknown>;
  regExps: RegExp[];
  empty: React.ReactNode;
  filters: IFiltersGroupedInput;
  assetPos?: number;
  isHidden?: boolean;
}

export const AssetResourcesTable: React.FC<
  IAssetResourcesTable & ITableState
> = ({ items, loading, filterValues, regExps, empty, assetPos, isHidden }) => {
  const paginatedItems = items.map((asset: IAssetResource) => {
    const { name, type } = asset.assetBasicInfo ?? {};
    const { manufacturer } = asset.assetCustom ?? {};
    return {
      id: asset._id,
      selectionDisabled: true,
      attributes: {
        verified: {
          component: Object.keys(filterValues).length ? (
            <LECIcon
              icon={
                regExps.every((regexp) => name?.match(regexp))
                  ? "check"
                  : "close"
              }
            ></LECIcon>
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
    <LSDTable
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
