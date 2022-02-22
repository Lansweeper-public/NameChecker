import React, { createContext, useContext, useState } from "react";
import { IAssetResource, IAssetResourcesPagination } from "../../types";
import { EPage } from "../../lib/constants";
import { ITableState, INITIAL_STATE } from "./common";
import { resolvePage } from "../../lib/utils";

export const MatchedContext = createContext<ITableState>(INITIAL_STATE);

export const MatchedProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<IAssetResource[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCursor, setCurrentCursor] = useState<string>();
  const [nextCursor, setNextCursor] = useState<string>();
  const [page, setPage] = useState<EPage>(EPage.FIRST);

  const updateAll = ({
    items: newItems,
    total: newTotal,
    pagination: { limit: newLimit, current, next, page: newPage },
  }: IAssetResourcesPagination) => {
    setItems(() => newItems);
    setLimit(newLimit);
    setTotal(newTotal);
    setCurrentPage((prev) => {
      return resolvePage(newPage, newTotal, newLimit, prev);
    });
    setCurrentCursor(current);
    setNextCursor(next);
    setPage(newPage);
  };

  return (
    <MatchedContext.Provider
      value={{
        items,
        limit,
        total,
        currentPage,
        currentCursor,
        nextCursor,
        page,
        updateAll,
      }}
    >
      {children}
    </MatchedContext.Provider>
  );
};

export const useMatchedAssets = () => useContext(MatchedContext);
