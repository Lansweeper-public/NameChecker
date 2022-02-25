import { getAssetResources } from "../services/assetResources";
import { IAssetResourcesPagination } from "../types/assets";
import { EPage } from "../lib/constants";
import { IFiltersGroupedInput } from "../types";

export const pageSizeOptions = [100, 250, 500];

type TUsePagination = () => {
  goToPage: (
    page: EPage,
    siteId: string,
    limit: number,
    filters: IFiltersGroupedInput,
    updateAll: (params: IAssetResourcesPagination) => void,
    cursor?: string,
  ) => void;
};

export const usePagination: TUsePagination = () => {
  const goToPage = (
    page: EPage,
    siteId: string,
    limit: number,
    filters: IFiltersGroupedInput,
    updateAll: (params: IAssetResourcesPagination) => void,
    cursor?: string,
  ) => {
    getAssetResources(siteId, limit, page, cursor, filters)
      .then((response) => {
        if (response?.site?.assetResources) {
          updateAll(response?.site?.assetResources);
        }
      })
      .catch((error) => console.error(error));
  };

  return {
    goToPage: (page, siteId, limit, filters, updateAll, cursor) =>
      goToPage(page, siteId, limit, filters, updateAll, cursor),
  };
};
