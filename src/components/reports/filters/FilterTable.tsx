import React from "react";
import { attributeColumns, transformTableItem } from "./FilterTable.columns";
import { StyledTableView } from "./FilterTable.styles";

export interface IFilterTable {
  items: string[];
  selectedRows: string[];
  handleRemoveRow: (id: string) => void;
  handleAddRow: (id: string) => void;
}

export const FilterTable: React.FC<IFilterTable> = ({
  items,
  selectedRows,
  handleRemoveRow,
  handleAddRow,
}) => {
  const parsedItems = items.map((item) =>
    transformTableItem(item, handleRemoveRow, handleAddRow, items.length),
  );
  return (
    <StyledTableView
      tableProps={{
        items: parsedItems,
        columns: attributeColumns,
        rowsSelected: selectedRows,
        selectable: true,
      }}
      dataTestId="filter-table"
      sizeList={[100]}
      sizeListIndex={0}
      currentPage={1}
      hideFooter={true}
      numItems={items.length}
    />
  );
};
