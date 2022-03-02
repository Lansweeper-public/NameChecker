import React, { RefObject } from "react";
import { TooltipProps } from "antd/lib/tooltip";
import { IIconMaker } from "../iconMaker";

export type TSortDirection = "ASC" | "DESC" | undefined;

export interface ITableColumn {
  id?: string;
  key: string;
  name: string;
  component?: React.ReactNode;
  sort?: boolean;
  defaultSort?: boolean;
  localSort?: boolean;
  void?: string;
  flexible?: boolean;
  fixed?: boolean;
  width?: string;
  dataTestId?: string;
  centerHeader?: boolean;
  noRightPadding?: boolean;
  noLeftPadding?: boolean;
  bold?: boolean;
  hasSeparationBorder?: boolean;
}

export interface ITableItemAttribute {
  onClick?: (item: ITableItem, column: ITableColumn) => void;
  text?: string | number;
  icon?: {
    type: IIconMaker["type"];
    name: IIconMaker["name"];
    title?: IIconMaker["title"];
    className?: IIconMaker["className"];
    titlePlacement?: TooltipProps["placement"];
  };
  component?: React.ReactNode;
  value?: string | number;
  extraWidth?: number;
}

export interface ITableItemAttributes {
  [key: string]: ITableItemAttribute;
}

export interface ITableItem {
  id: string;
  disabled?: boolean;
  selectionDisabled?: boolean;
  error?: boolean;
  attributes: ITableItemAttributes;
}

export interface IScrollContainerOpts {
  offsetHeight?: number;
  scrollHeight?: number;
}

export interface ITableFooterMetadata {
  [key: string]: React.ReactNode;
}

export type ITableSize = "sm" | undefined;

export interface ITableProps {
  items: ITableItem[];
  columns: ITableColumn[];
  className?: string;
  flexible?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  capitalize?: boolean;
  loading?: boolean;
  empty?: React.ReactNode;
  emptyMessage?: string;
  size?: ITableSize;
  footerMetadata?: ITableFooterMetadata;
  onSelectChange?: (item: ITableItem, selected: boolean) => void;
  onSelectAll?: (items: string[]) => void;
  rowsSelected?: string[];
  goToRow?: number;
  onGoToRow?: () => void;
  sortDisabled?: boolean;
  sort?: (items: ITableItem[], sortDirection: TSortDirection) => ITableItem[];
  onSortChanged?: (column?: ITableColumn, direction?: TSortDirection) => void;
  onScroll?: (
    top: number,
    left: number,
    containerOpts?: IScrollContainerOpts,
  ) => void;
  onResize?: (scrollHeight: number, offsetHeight: number) => void;
  sortByColumn?: ITableColumn | undefined;
  sortDirection?: TSortDirection;
  onMouseLeaveItem?: (itemId: string) => void;
  onMouseEnterItem?: (itemId: string) => void;
  indeterminate?: boolean;
  ref?: any;
}

export interface ITableHandler {
  scrollTo: (scrollTop: number, scrollLeft?: number) => void;
  bodyContentRef: RefObject<HTMLDivElement>;
  fixedContentRef: RefObject<HTMLDivElement>;
}

export interface TableProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "onScroll"
  > {
  items: ITableItem[];
  columns: ITableColumn[];
  className?: string;
  hoverable?: boolean;
  selectable?: boolean;
  single?: boolean;
  capitalize?: boolean;
  loading?: boolean;
  empty?: React.ReactNode;
  emptyMessage?: string;
  size?: ITableSize;
  footerMetadata?: ITableFooterMetadata;
  onSelectChange?: (item: ITableItem, selected: boolean) => void;
  onSelectAll?: (items: string[]) => void;
  rowsSelected?: string[];
  goToRow?: number;
  sortDisabled?: boolean;
  sort?: (items: ITableItem[], sortDirection: TSortDirection) => ITableItem[];
  onSortChanged?: (column?: ITableColumn, direction?: TSortDirection) => void;
  onScroll?: (
    top: number,
    left: number,
    containerOpts: IScrollContainerOpts,
  ) => void;
  sortByColumn?: ITableColumn | undefined;
  sortDirection?: TSortDirection;
  indeterminate?: boolean;
  borderBottom?: boolean;
  errorAndLinks?: boolean;
  dataTestId?: string;
  headerCheckboxId?: string;
}
