import { Empty } from "antd";
import cn from "classnames";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import ReactResizeDetector from "react-resize-detector";
import { Spin } from "../spin";
import { sortByItemAttributeText } from "./sortUtils";
import {
  ColumnFooter,
  ColumnHeader,
  HeaderCheckbox,
  TableRow,
} from "./Table.components";
import {
  ITableColumn,
  ITableItem,
  TableProps,
  TSortDirection,
} from "./Table.types";

const canUseDOM = () =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

const getSelectedStatus = (
  items: ITableItem[],
  selectedIds: string[] = [],
): {
  selectableCount: number;
  allSelected: boolean;
} => {
  const selectableItems = items.filter((i) => !i.selectionDisabled);
  if ((selectedIds.length ?? 0) > 0) {
    const selectedById = selectedIds.reduce((acc, curr) => {
      return { ...acc, [curr]: true };
    }, {});
    return {
      selectableCount: selectableItems.length,
      allSelected:
        selectableItems.length > 0 &&
        selectableItems.every((i) => selectedById[i.id]),
    };
  }
  return {
    selectableCount: selectableItems.length,
    allSelected: false,
  };
};

const getAccumulativeWidths = (
  columnRefs: (HTMLDivElement | null)[],
): number[] =>
  columnRefs
    .map((current) => (current ? current.offsetWidth : 0))
    .map((_, i, arr) => arr.slice(0, i).reduce((a, c) => a + c, 0));

export const Table = forwardRef<HTMLDivElement | null, TableProps>(
  (
    {
      items,
      columns,
      className,
      hoverable,
      selectable = true,
      single = false,
      capitalize,
      loading,
      empty,
      emptyMessage,
      onSelectChange,
      onSelectAll,
      rowsSelected,
      sort,
      sortDisabled,
      footerMetadata,
      onSortChanged,
      onScroll,
      sortByColumn,
      sortDirection,
      size,
      goToRow,
      indeterminate,
      borderBottom,
      errorAndLinks,
      dataTestId,
      children,
      headerCheckboxId,
      ...rest
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollingRef: any,
  ) => {
    const [columnsWidth, setColumnsWidth] = useState<number[]>([]);

    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [hasScrollShadow, setHasScrollShadow] = useState(false);
    const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);

    const ROW_HEIGHT = size === "sm" ? 32 : 40;
    const isSmall = size === "sm";

    const { arrangedColumns, fixedColumnsLength } = useMemo(() => {
      const fixedColumns = columns.filter((c) => c.fixed);
      const fixedLength = fixedColumns.length;
      const scrollingColumns = columns.filter((c) => !c.fixed);
      return {
        arrangedColumns: [...fixedColumns, ...scrollingColumns],
        fixedColumnsLength: fixedLength,
      };
    }, [columns]);

    const { selectableCount, allSelected } = getSelectedStatus(
      items,
      rowsSelected,
    );

    let sortedItems = items;
    if (sortByColumn && sortByColumn.localSort) {
      sortedItems = sortByItemAttributeText(
        items,
        sortByColumn.key,
        sortDirection,
      );
    } else if (sortByColumn && !sortByColumn.localSort) {
      sortedItems = sort ? sort(items, sortDirection) : items;
    }

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (e.currentTarget.scrollTop === 0) {
        setHasScrollShadow(false);
      } else if (!hasScrollShadow) {
        setHasScrollShadow(true);
      }
      if (onScroll && scrollingRef?.current) {
        onScroll(e.currentTarget.scrollTop, e.currentTarget.scrollLeft, {
          scrollHeight: scrollingRef.current.scrollHeight,
          offsetHeight: scrollingRef.current.offsetHeight,
        });
      }
    };

    useEffect(() => {
      const columnsWidthMap = getAccumulativeWidths(columnRefs.current);
      if (borderBottom) {
        const hasScroll = scrollingRef?.current
          ? scrollingRef.current?.offsetWidth < scrollingRef.current?.scrollLeft
          : false;
        setHasHorizontalScroll(hasScroll);
      }
      setColumnsWidth(columnsWidthMap);
    }, [items, borderBottom, scrollingRef]);

    const handleHorizontalResize = () => {
      const columnsWidthMap = getAccumulativeWidths(columnRefs.current);
      if (borderBottom) {
        const hasScroll = scrollingRef?.current
          ? scrollingRef.current?.offsetWidth <
            scrollingRef.current?.scrollWidth
          : false;
        setHasHorizontalScroll(hasScroll);
      }
      setColumnsWidth(columnsWidthMap);
    };

    const ignoreGoToRow = useRef<boolean>(false);

    useEffect(() => {
      if (
        goToRow &&
        !loading &&
        !!items.length &&
        !!columns.length &&
        scrollingRef?.current?.scrollTo &&
        !ignoreGoToRow.current
      ) {
        scrollingRef.current.scrollTo({
          top: goToRow * ROW_HEIGHT,
          behavior: "smooth" as "smooth" | "auto" | undefined,
        });
        ignoreGoToRow.current = true;
      }
    }, [loading, items, columns, goToRow, ROW_HEIGHT, scrollingRef]);

    const onColumnClick = (column: ITableColumn) => {
      if (!sortDisabled && column.sort && items.length > 1) {
        let newKey: ITableColumn | undefined = column;
        let newOrderDirection: TSortDirection = "ASC";

        if (sortByColumn && sortByColumn.key === column.key) {
          newKey = sortDirection === "ASC" ? column : undefined;
          newOrderDirection = sortDirection === "ASC" ? "DESC" : "ASC";
        }

        if (
          onSortChanged &&
          (newKey !== sortByColumn || newOrderDirection !== sortDirection)
        ) {
          onSortChanged(newKey, newOrderDirection);
        }
      }
    };

    const setAllItemsSelected = (selected: boolean) => {
      if (onSelectAll) {
        onSelectAll(
          selected
            ? items
                .filter((i) => !i.selectionDisabled && !i.disabled)
                .map((i) => i.id)
            : [],
        );
      }
    };

    const setItemSelected = (item: ITableItem, selected: boolean) => {
      if (onSelectChange) {
        onSelectChange(item, selected);
      }
    };

    if (!canUseDOM()) {
      return <p>Table is not compatible with SSR</p>;
    }

    return (
      <div
        className={cn("lsd-table", className ?? "", {
          "lsd-table--scroll-shadow": hasScrollShadow,
          "lsd-table--small": isSmall,
          "lsd-table--hoverable": hoverable,
          "lsd-table--no-select": selectable === false,
          "lsd-table--border-bottom":
            borderBottom &&
            (!hasHorizontalScroll || (!loading && items.length === 0)),
          "lsd-table--error-and-links": errorAndLinks,
        })}
        data-test-id={dataTestId}
        {...rest}
      >
        <ReactResizeDetector
          handleHeight={false}
          handleWidth
          onResize={handleHorizontalResize}
          refreshMode="debounce"
          refreshRate={300}
          targetRef={scrollingRef}
        >
          <div
            className="lsd-table__scrolling-container"
            onScroll={handleScroll}
            ref={scrollingRef}
            data-test-id={dataTestId && `${dataTestId}-scroll-container`}
          >
            <table className="lsd-table__table">
              <thead>
                <tr className="lsd-table__header">
                  {!!selectable && onSelectChange && !single && (
                    <HeaderCheckbox
                      id={headerCheckboxId}
                      ref={(headerRef) => (columnRefs.current[0] = headerRef)}
                      selectedCount={rowsSelected?.length ?? 0}
                      allSelected={allSelected}
                      disabled={items.length === 0 || selectableCount === 0}
                      setAllSelected={setAllItemsSelected}
                      indeterminate={indeterminate}
                      onlyFixed={fixedColumnsLength === 0}
                      small={isSmall}
                    />
                  )}
                  {onSelectChange && single && (
                    <th
                      ref={(headerRef) => (columnRefs.current[0] = headerRef)}
                      className={cn(
                        "lsd-table__header-cell",
                        "lsd-table__header-cell--radio",
                        "lsd-table__header-cell--fixed",
                        "lsd-table__header-cell--clickable",
                        {
                          "lsd-table__header-cell--radio-only-fixed":
                            fixedColumnsLength === 0,
                          "lsd-table__header-cell--last":
                            fixedColumnsLength === 0,
                          "lsd-table__header-cell--small": isSmall,
                        },
                      )}
                      style={{ left: 0 }}
                    ></th>
                  )}
                  {arrangedColumns.map((c, i) => {
                    return (
                      <ColumnHeader
                        id={c.id}
                        key={c.key}
                        ref={(cref) =>
                          (columnRefs.current[!!onSelectChange ? i + 1 : i] =
                            cref)
                        }
                        column={c}
                        capitalize={capitalize}
                        onColumnClick={onColumnClick}
                        sortDisabled={sortDisabled}
                        sortByColumn={sortByColumn}
                        sortDirection={sortDirection}
                        size={size}
                        hasItems={items.length > 1}
                        isLastFixed={
                          fixedColumnsLength > 0 && fixedColumnsLength === i + 1
                        }
                        left={columnsWidth[onSelectChange ? i + 1 : i]}
                        hasSeparationBorder={c.hasSeparationBorder}
                      />
                    );
                  })}
                </tr>
              </thead>
              <tbody
                className={cn({
                  "lsd-table--touched": rowsSelected?.length,
                  "lsd-table--multiple": !single,
                  "lsd-table--single": single,
                })}
              >
                {sortedItems.map((item, itemIndex) => {
                  const selected = !!rowsSelected?.includes(item.id);
                  return (
                    <TableRow
                      key={item.id}
                      item={item}
                      itemIndex={itemIndex}
                      columns={arrangedColumns}
                      hasCheckbox={!!selectable && !!onSelectChange && !single}
                      hasRadio={!!onSelectChange && single}
                      selected={selected}
                      disabled={
                        (single && !!rowsSelected?.length && !selected) ||
                        item.disabled
                      }
                      setSelected={setItemSelected}
                      fixedLength={fixedColumnsLength}
                      isSmall={isSmall}
                      columnsWidth={columnsWidth}
                    />
                  );
                })}
              </tbody>
              {footerMetadata && (
                <tfoot>
                  <tr>
                    {onSelectChange && <ColumnFooter fixed left={0} />}
                    {arrangedColumns.map((column, i) => (
                      <ColumnFooter
                        key={column.key}
                        fixed={column.fixed}
                        content={footerMetadata[column.key]}
                        left={columnsWidth[onSelectChange ? i + 1 : i]}
                      />
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </ReactResizeDetector>
        {loading && (
          <div className="lsd-table__loading">
            <Spin type="ellipsis" />
          </div>
        )}
        {!loading && items.length === 0 && (
          <div
            className={cn("lsd-table__empty", {
              "lsd-table__empty--small": isSmall,
            })}
          >
            {empty ? (
              empty
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={emptyMessage}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);
