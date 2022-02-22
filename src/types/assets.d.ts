import { TSortDirection } from "@lansweeper/lecfrontcomponents";
import { EPage } from "../lib/constants";

export interface IAssetResource {
  _id: string;
  key: string;
  assetBasicInfo: {
    key: string;
    name: string;
    type: string;
  };
  assetCustom: {
    manufacturer: string;
  };
}

export interface IPagination {
  limit: number;
  page: EPage;
  current?: string;
  next?: string;
}

export interface IOrderAsset {
  field: string;
  direction: TSortDirection;
}

export interface IAssetResourcesPagination {
  total: number;
  pagination: IPagination;
  items: [IAssetResource];
  order: IOrderAsset;
}

export interface IAssetsResourceResponse {
  site: {
    assetResources: IAssetResourcesPagination;
  };
}

export interface IExportStatus {
  progress: string;
  url: string;
  requestedAt: string;
  completedAt: string;
  exportId: string;
}

export interface IStatusExportResponse {
  site: {
    exportStatus: IExportStatus;
  };
}
