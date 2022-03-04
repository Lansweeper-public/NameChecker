import React from "react";
import { Icon } from "../icon";
import { TooltipWrapper, ToggleTooltip } from "../tooltip";
import classNames from "classnames";
import { CursorPaginator } from "./pagination";
import { Paginator, PaginationSize, CursorPaginationSize } from "./pagination";
import { numberFormatter } from "./pagination/utils";

export interface ITableFooter {
  className?: string;
  numItems?: number;
  sizeList?: number[];
  showPaging?: boolean;
  currentPage?: number;
  showActions?: boolean;
  sizeListIndex?: number;
  scrollTopDisabled?: boolean;
  cursorView?: boolean;
  onScrollTopClick?: () => void;
  onPageSizeChanged?: (pageSize: number) => void;
  onPageChanged?: (page: number, pageSize?: number) => void;
}

export const TableFooter: React.FC<ITableFooter> = ({
  className,
  currentPage = 1,
  showActions,
  numItems = 0,
  sizeList = [],
  onPageChanged,
  onScrollTopClick,
  onPageSizeChanged,
  showPaging = true,
  sizeListIndex = 0,
  scrollTopDisabled = false,
  cursorView,
}) => {
  const onPaginatorSizeChanged = (index: number) => {
    if (onPageSizeChanged) {
      onPageSizeChanged(index);
    }
  };

  const getLastPage = (total: number, sizePerPage: number) => {
    return Math.floor(total / sizePerPage) + 1;
  };

  return cursorView ? (
    <>
      <div
        className={classNames("lec-cursor-table-footer", "lec-table-footer", {
          [className as string]: !!className,
          shortBorder: numItems === 0,
        })}
      >
        <div className={`lec-table-footer__content-left`}>
          <span className="lec-table-footer-results">
            {showPaging &&
              sizeList[sizeListIndex] < numItems &&
              `${numberFormatter(
                (currentPage - 1) * sizeList[sizeListIndex] + 1,
              )}-${
                currentPage * sizeList[sizeListIndex] < numItems
                  ? numberFormatter(currentPage * sizeList[sizeListIndex])
                  : numberFormatter(numItems)
              } of `}
            <b>{numberFormatter(numItems)}</b>
            {" results"}
          </span>
        </div>
        <div className={`lec-table-footer__content-center`}>
          {showPaging && sizeList[sizeListIndex] < numItems && (
            <CursorPaginator
              first={() =>
                onPageChanged && onPageChanged(1, sizeList[sizeListIndex])
              }
              last={() =>
                onPageChanged &&
                onPageChanged(
                  getLastPage(numItems, sizeList[sizeListIndex]),
                  sizeList[sizeListIndex],
                )
              }
              next={() =>
                onPageChanged &&
                onPageChanged(currentPage + 1, sizeList[sizeListIndex])
              }
              prev={() =>
                onPageChanged &&
                onPageChanged(currentPage - 1, sizeList[sizeListIndex])
              }
              hasNext={currentPage * sizeList[sizeListIndex] < numItems}
              hasPrev={currentPage > 1}
              showLast={true}
            />
          )}
        </div>
        {showActions && (
          <div className="lec-table-footer__content-right">
            <div style={{ marginRight: "16px" }}>
              <CursorPaginationSize
                totalItems={numItems}
                sizeList={sizeList}
                sizeListIndex={sizeListIndex}
                onSizeChanged={(limit: number) =>
                  onPaginatorSizeChanged(sizeList.indexOf(limit))
                }
              />
            </div>
            <div
              className="lec-cursor-table-button-container"
              onClick={onScrollTopClick}
            >
              <ToggleTooltip
                showTooltip={!scrollTopDisabled}
                title="Back to top"
                placement="bottomRight"
                mouseEnterDelay={0.2}
              >
                <button
                  className="lec-cursor-table-button"
                  disabled={scrollTopDisabled}
                >
                  <Icon icon="arrow-up" />
                </button>
              </ToggleTooltip>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <div
      className={`${className !== undefined ? className : ""} lec-table-footer`}
    >
      {showPaging && (
        <>
          <div className={`lec-table-footer__content-left`}>
            <PaginationSize
              sizeList={sizeList}
              totalItems={numItems}
              sizeListIndex={sizeListIndex}
              onChanged={onPaginatorSizeChanged}
            />
          </div>
          <div
            className={`lec-table-footer__content-center${
              !showActions ? "--last" : ""
            }`}
          >
            {numItems > sizeList[sizeListIndex] && (
              <Paginator
                total={numItems}
                current={currentPage}
                onChange={onPageChanged}
                pageSize={sizeList[sizeListIndex]}
              />
            )}
          </div>
        </>
      )}
      {showActions && (
        <div className={`lec-table-footer__content-right`}>
          {!scrollTopDisabled ? (
            <TooltipWrapper title="Go up" placement="top" mouseEnterDelay={0.2}>
              <div
                onClick={onScrollTopClick}
                className="lec-table-footer__action lec-table-footer__action--enabled"
              >
                <Icon icon="arrow-up" />
              </div>
            </TooltipWrapper>
          ) : (
            <div className="lec-table-footer__action lec-table-footer__action--disabled">
              <Icon icon="arrow-up" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
