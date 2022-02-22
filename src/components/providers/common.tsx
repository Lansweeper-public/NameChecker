import { IAssetResource, IAssetResourcesPagination } from "../../types";
import { EPage } from "../../lib/constants";

export interface ITableState {
  items: IAssetResource[];
  limit: number;
  total: number;
  currentPage: number;
  currentCursor?: string;
  nextCursor?: string;
  page: EPage;
  updateAll: (params: IAssetResourcesPagination) => void;
}

export const INITIAL_STATE: ITableState = {
  items: [],
  limit: 10,
  total: 0,
  currentPage: 1,
  currentCursor: undefined,
  nextCursor: undefined,
  page: EPage.FIRST,
  updateAll: (params: IAssetResourcesPagination) => null,
};
