import React, { useRef, useState } from "react";
import { Table } from "./Table";
import { IScrollContainerOpts, TableProps } from "./Table.types";
import { TableFooter } from "./TableFooter";

const baseClass = "lec-table-view";
export interface TableViewProps {
  numItems: number;
  sizeList: number[];
  className?: string;
  currentPage: number;
  dataTestId?: string;
  hideFooter?: boolean;
  showActions?: boolean;
  virtualized?: boolean;
  sizeListIndex: number;
  onPageSizeChanged?: (pageSize: number) => void;
  tableProps: TableProps;
  onPageChanged?: (page: number, pageSize?: number) => void;
  cursorView?: boolean;
}

export const TableView: React.FC<TableViewProps> = ({
  numItems,
  sizeList,
  className,
  dataTestId,
  hideFooter,
  tableProps,
  currentPage,
  showActions,
  onPageChanged,
  sizeListIndex,
  onPageSizeChanged,
  cursorView,
}) => {
  const [scrollIsAtTop, setScrollIsAtTop] = useState<boolean>(true);
  const tableRef = useRef<HTMLDivElement>(null);
  const handleOnTableScroll = (
    top: number,
    left: number,
    containerOpts: IScrollContainerOpts,
  ) => {
    if (top === 0) {
      setScrollIsAtTop(true);
    } else if (scrollIsAtTop) {
      setScrollIsAtTop(false);
    }
    if (tableProps.onScroll) {
      tableProps.onScroll(top, left, containerOpts);
    }
  };

  const handleScrollTop = () => {
    if (tableRef && tableRef.current) {
      tableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      data-test-id={dataTestId}
      className={`${baseClass} ${className || ""} lsd-table-view`}
    >
      <Table
        {...tableProps}
        onScroll={handleOnTableScroll}
        borderBottom={hideFooter}
        ref={tableRef}
      />
      {!hideFooter && (
        <TableFooter
          numItems={numItems}
          sizeList={sizeList}
          currentPage={currentPage}
          showActions={showActions}
          onPageChanged={onPageChanged}
          sizeListIndex={sizeListIndex}
          scrollTopDisabled={scrollIsAtTop}
          className={`${baseClass}__footer`}
          onScrollTopClick={handleScrollTop}
          onPageSizeChanged={onPageSizeChanged}
          cursorView={cursorView}
        />
      )}
    </div>
  );
};
