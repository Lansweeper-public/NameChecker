import React, { useEffect, useRef } from "react";
import { ESizeListOption } from "@lansweeper/lecfrontcomponents";
import { IFiltersGroupedInput } from "@lansweeper/integrations-dataset";
import { StyledLECCursorTableFooter } from "./PaginationTableFooter.styles";
import { IAssetResourcesPagination } from "../../../types";
import { ITableState } from "../../providers/common";
import { EPage } from "../../../lib/constants";

export const pageSizeOptions = [10, 25, 50];

export interface IChangePageParams {
  page: EPage;
  limit: number;
  filtersGrouped: IFiltersGroupedInput;
  fnUpdateAll: (params: IAssetResourcesPagination) => void;
  cursor?: string;
}

export interface IPaginationTableFooterProps {
  filters: IFiltersGroupedInput;
  resetTabCallback: (
    limit: number,
    filtersGrouped: IFiltersGroupedInput,
    fnUpdateAll: (params: IAssetResourcesPagination) => void,
  ) => void;
  handleChangePage: (params: IChangePageParams) => void;
  siteId?: string;
  isHidden: boolean;
}

export const PaginationTableFooter: React.FC<
  IPaginationTableFooterProps & ITableState
> = ({
  total,
  limit,
  filters,
  currentPage,
  currentCursor,
  nextCursor,
  updateAll,
  resetTabCallback,
  handleChangePage,
  isHidden,
  siteId,
}) => {
  const ref = useRef<string>();

  useEffect(() => {
    if (
      Object.keys(filters).length &&
      (!ref.current || ref.current !== JSON.stringify(filters))
    ) {
      ref.current = JSON.stringify(filters);
      resetTabCallback(limit, filters, updateAll);
    }
  }, [resetTabCallback]);

  useEffect(() => {
    resetTabCallback(limit, filters, updateAll);
  }, [siteId]);

  return (
    <StyledLECCursorTableFooter
      numItems={total}
      showPaging={true}
      forceSizeList={pageSizeOptions}
      sizeListOption={ESizeListOption.Small}
      cursorTable={{
        currentIndex: currentPage,
        hasNext: currentPage * limit < total,
        hasPrev: currentPage > 1,
        first: () =>
          handleChangePage({
            limit,
            page: EPage.FIRST,
            filtersGrouped: filters,
            fnUpdateAll: updateAll,
          }),
        last: () =>
          handleChangePage({
            limit,
            page: EPage.LAST,
            filtersGrouped: filters,
            fnUpdateAll: updateAll,
          }),
        next: () =>
          handleChangePage({
            limit,
            page: EPage.NEXT,
            filtersGrouped: filters,
            fnUpdateAll: updateAll,
            cursor: nextCursor,
          }),
        prev: () =>
          handleChangePage({
            limit,
            page: EPage.PREV,
            filtersGrouped: filters,
            fnUpdateAll: updateAll,
            cursor: currentCursor,
          }),
      }}
      onPageSizeChanged={(pageSize: number) => {
        handleChangePage({
          limit: pageSize,
          filtersGrouped: filters,
          page: EPage.FIRST,
          fnUpdateAll: updateAll,
        });
      }}
      sizeListIndex={pageSizeOptions.findIndex(
        (indLimit) => indLimit === limit,
      )}
      isHidden={isHidden}
    />
  );
};
