import cn from "classnames";
import React from "react";
import { CheckboxWrapper } from "../checkbox";
import { Icon } from "../icon";
import { IconMaker } from "../iconMaker";
import { TooltipWrapper } from "../tooltip";
import {
  ITableColumn,
  ITableItem,
  ITableSize,
  TSortDirection,
} from "./Table.types";

interface ColumnHeaderProps {
  id?: string;
  column: ITableColumn;
  capitalize?: boolean;
  onColumnClick: (column: ITableColumn) => void;
  sortDisabled?: boolean;
  sortByColumn?: ITableColumn | undefined;
  sortDirection?: TSortDirection;
  size?: ITableSize;
  hasItems: boolean;
  isLastFixed?: boolean;
  left?: number;
  hasSeparationBorder?: boolean;
}

const getIcon = (direction: TSortDirection) =>
  direction === "ASC" ? "arrow-up" : "arrow-bottom";

export const ColumnHeader = React.forwardRef<
  HTMLTableCellElement,
  ColumnHeaderProps
>(
  (
    {
      column,
      capitalize,
      onColumnClick,
      sortDisabled,
      sortByColumn,
      sortDirection,
      size,
      hasItems,
      isLastFixed,
      left,
      hasSeparationBorder,
      ...rest
    },
    ref,
  ) => {
    return (
      <th
        ref={ref}
        className={cn("lsd-table__header-cell", {
          "lsd-table__header-cell--fixed": column.fixed,
          "lsd-table__header-cell--no-capitalize": capitalize,
          "lsd-table__header-cell--clickable": column.sort && hasItems,
          "lsd-table__header-cell--sorted": sortByColumn?.key === column.key,
          "lsd-table__header-cell--small": size === "sm",
          "lsd-table__header-cell--last": isLastFixed,
          "lsd-table__header-cell--no-right-padding": column.noRightPadding,
          "lsd-table__header-cell--right-border": hasSeparationBorder,
        })}
        onClick={() => onColumnClick(column)}
        key={column.key}
        data-test-id={column.dataTestId && `${column.dataTestId}-title`}
        style={{
          width: column.width ? `${column.width}px` : undefined,
          left: column.fixed ? `${left}px` : undefined,
        }}
        {...rest}
      >
        <div
          className={cn("lsd-table__header-cell-content", {
            "lsd-table__header-cell-content--centered": column.centerHeader,
          })}
        >
          {column.component ?? column.name}
          {column.sort && (
            <>
              {sortByColumn?.key === column.key ? (
                <Icon
                  className={cn("lsd-table__order-arrow", {
                    "lsd-table__order-arrow--show": !sortDisabled && hasItems,
                  })}
                  icon={getIcon(sortDirection)}
                />
              ) : (
                <Icon
                  className="lsd-table__order-arrow lsd-table__order-arrow--hover"
                  icon="arrow-up"
                />
              )}
            </>
          )}
        </div>
      </th>
    );
  },
);

interface ColumnFooterProps {
  fixed?: boolean;
  content?: React.ReactNode;
  left?: number;
}

export const ColumnFooter: React.FC<ColumnFooterProps> = ({
  fixed,
  content = "",
  left,
}) => (
  <td
    className={cn("lsd-table__footer-cell", {
      "lsd-table__footer-cell--fixed": fixed,
    })}
    style={{
      left: fixed ? `${left}px` : undefined,
    }}
  >
    <div className="lsd-table__footer-cell-content">{content ?? ""}</div>
  </td>
);

interface HeaderCheckboxProps {
  id?: string;
  dataUserlaneId?: string;
  selectedCount: number;
  allSelected: boolean;
  disabled: boolean;
  setAllSelected: (selected: boolean) => void;
  indeterminate?: boolean;
  onlyFixed: boolean;
  small: boolean;
}

export const HeaderCheckbox = React.forwardRef<
  HTMLTableCellElement,
  HeaderCheckboxProps
>(
  (
    {
      selectedCount,
      allSelected,
      disabled,
      setAllSelected,
      indeterminate,
      onlyFixed,
      small,
      dataUserlaneId,
      ...rest
    },
    ref,
  ) => {
    return (
      <th
        ref={ref}
        className={cn(
          "lsd-table__header-cell",
          "lsd-table__header-cell--checkbox",
          "lsd-table__header-cell--fixed",
          "lsd-table__header-cell--clickable",
          {
            "lsd-table__header-cell--checkbox-only-fixed": onlyFixed,
            "lsd-table__header-cell--last": onlyFixed,
            "lsd-table__header-cell--small": small,
          },
        )}
        style={{ left: 0 }}
      >
        <span className="lsd-table__header-cell-content lsd-table__header-cell-content--checkbox">
          {indeterminate ? (
            <CheckboxWrapper
              checked={selectedCount > 0}
              onChange={(e) => setAllSelected(e.target.checked)}
              disabled={disabled}
              indeterminate={!allSelected}
              dataUserlaneId={dataUserlaneId}
              {...rest}
            />
          ) : (
            <CheckboxWrapper
              checked={allSelected}
              onChange={(e) => setAllSelected(e.target.checked)}
              disabled={disabled}
              {...rest}
            />
          )}
        </span>
      </th>
    );
  },
);

interface RowCheckboxProps {
  item: ITableItem;
  selected: boolean;
  setSelected: (item: ITableItem, selected: boolean) => void;
  onlyFixed: boolean;
  small: boolean;
  dataTestId?: string;
  disabled?: boolean;
  dataUserlaneId?: string;
}

export const RowCheckbox: React.FC<RowCheckboxProps> = ({
  item,
  selected,
  setSelected,
  onlyFixed,
  small,
  dataTestId,
  disabled,
  dataUserlaneId,
}) => {
  return (
    <td
      className={cn(
        "lsd-table__cell",
        "lsd-table__cell--checkbox",
        "lsd-table__cell--fixed",
        "lsd-table__cell--clickable",
        {
          "lsd-table__cell--checkbox-only-fixed": onlyFixed,
          "lsd-table__cell--last": onlyFixed,
          "lsd-table__cell--small": small,
          "lsd-table__cell--selected": selected,
          "lsd-table__cell--disabled": disabled,
        },
      )}
      data-test-id={dataTestId}
      style={{ left: 0 }}
    >
      <span
        className="lsd-table__cell-content lsd-table__cell-content--checkbox"
        data-userlane-id={dataUserlaneId}
      >
        <CheckboxWrapper
          checked={selected}
          onChange={(e) => setSelected(item, e.target.checked)}
          disabled={item.selectionDisabled || disabled}
        />
      </span>
    </td>
  );
};

export interface TableEmptyCellProps {
  text?: string;
}

export const TableEmptyCell: React.FC<TableEmptyCellProps> = ({
  text = "-",
}) => <span className="lsd-table__empty-cell">{text}</span>;

interface TableCellProps {
  item: ITableItem;
  column: ITableColumn;
  selected?: boolean;
  dataTestId?: string;
  sorted?: boolean;
  isLastFixed?: boolean;
  isSmall: boolean;
  noRightPadding?: boolean;
  left?: number;
  hasSeparationBorder?: boolean;
  disabled?: boolean;
}

const TableCell: React.FC<TableCellProps> = ({
  item,
  column,
  sorted,
  isLastFixed,
  selected,
  isSmall,
  dataTestId,
  noRightPadding,
  left,
  hasSeparationBorder,
  disabled,
}) => {
  const attr = item.attributes[column.key];
  return (
    <td
      data-test-id={dataTestId}
      className={cn("lsd-table__cell", {
        "lsd-table__cell--fixed": column.fixed,
        "lsd-table__cell--bold": column.bold,
        "lsd-table__cell--small": isSmall,
        "lsd-table__cell--clickable": !!attr.onClick,
        "lsd-table__cell--selected": selected,
        "lsd-table__cell--disabled": disabled,
        "lsd-table__cell--last": isLastFixed,
        "lsd-table__cell--no-right-padding": noRightPadding,
        "lsd-table__cell--right-border": hasSeparationBorder,
      })}
      onClick={() => attr.onClick && attr.onClick(item, column)}
      style={{
        left: column.fixed ? `${left}px` : undefined,
      }}
    >
      <span
        className={cn("lsd-table__cell-content", {
          "lsd-table__cell-content--sorted": sorted,
          "lsd-table__cell-content--error": item.error,
        })}
      >
        {attr.icon && (
          <div
            className={
              attr.text || attr.component
                ? "lsd-table__cell-icon"
                : "lsd-table__cell-icon lsd-table__cell-icon--only-icon"
            }
          >
            {(!attr.icon.title && (
              <IconMaker
                type={attr.icon.type}
                name={attr.icon.name}
                className={attr.icon.className}
              />
            )) || (
              <TooltipWrapper
                placement={attr.icon.titlePlacement}
                type="info"
                title={attr.icon.title}
              >
                <IconMaker
                  type={attr.icon.type}
                  name={attr.icon.name}
                  className={attr.icon.className}
                />
              </TooltipWrapper>
            )}
          </div>
        )}
        {!attr.icon && !attr.text && attr.text !== 0 && !attr.component && (
          <TableEmptyCell />
        )}
      </span>
    </td>
  );
};

export const TableItem = React.memo(TableCell, (prev, next) => {
  return (
    prev.item === next.item &&
    prev.selected === next.selected &&
    prev.isLastFixed === next.isLastFixed &&
    prev.sorted === next.sorted &&
    prev.left === next.left
  );
});

interface RowProps {
  item: ITableItem;
  itemIndex: number;
  columns: ITableColumn[];
  hasCheckbox: boolean;
  hasRadio?: boolean;
  selected?: boolean;
  setSelected: (item: ITableItem, selected: boolean) => void;
  fixedLength: number;
  isSmall: boolean;
  sortedColumnKey?: string;
  columnsWidth: number[];
  disabled?: boolean;
}

export const Row: React.FC<RowProps> = ({
  item,
  itemIndex,
  columns,
  hasCheckbox,
  hasRadio,
  selected,
  setSelected,
  fixedLength,
  isSmall,
  sortedColumnKey,
  columnsWidth,
  disabled,
}) => {
  return (
    <tr key={item.id} data-row-index={itemIndex}>
      {hasCheckbox && !hasRadio && (
        <RowCheckbox
          item={item}
          selected={!!selected}
          setSelected={setSelected}
          onlyFixed={fixedLength === 0}
          small={isSmall}
          dataTestId={`row-checkbox--${itemIndex}`}
          disabled={disabled}
        />
      )}
      {columns.map((column, columnIndex) => (
        <TableItem
          key={`${column.key}-${item.id}`}
          item={item}
          column={column}
          isLastFixed={fixedLength > 0 && fixedLength === columnIndex + 1}
          sorted={sortedColumnKey === column.key}
          selected={selected}
          disabled={disabled}
          isSmall={isSmall}
          dataTestId={column.dataTestId && `${column.dataTestId}--${itemIndex}`}
          noRightPadding={column.noRightPadding}
          left={
            columnsWidth[
              hasCheckbox || hasRadio ? columnIndex + 1 : columnIndex
            ]
          }
          hasSeparationBorder={column.hasSeparationBorder}
        />
      ))}
    </tr>
  );
};

export const TableRow = React.memo(Row, (prev, next) => {
  return (
    prev.item === next.item &&
    prev.selected === next.selected &&
    prev.disabled === next.disabled &&
    prev.columnsWidth === next.columnsWidth
  );
});
