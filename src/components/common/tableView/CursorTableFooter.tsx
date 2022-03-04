import classNames from "classnames";
import React from "react";
import { Icon } from "../icon";
import { ToggleTooltip } from "../tooltip";
import { CursorPaginationSize, CursorPaginator } from "./pagination";
import { numberFormatter, quantityString } from "./pagination";

export interface ICursorTable {
  currentIndex: number;
  hasNext: boolean;
  hasPrev: boolean;
  next: () => void;
  prev: () => void;
  first: () => void;
  last: () => void;
}

export interface ICursorTableFooter {
  cursorTable?: ICursorTable;
  className?: string;
  numItems?: number;
  sizeList: number[];
  showPaging?: boolean;
  sizeListIndex?: number;
  scrollTopDisabled?: boolean;
  scrollTopHidden?: boolean;
  onScrollTopClick?: () => void;
  onPageSizeChanged?: (pageSize: number) => void;
  showLast?: boolean;
}

export const SizeLists = {
  Small: [10, 25, 50],
  Medium: [50, 100, 250],
  Large: [100, 250, 500],
};

export const CursorTableFooter: React.FC<ICursorTableFooter> = ({
  cursorTable,
  className,
  numItems = 0,
  sizeList,
  onScrollTopClick,
  onPageSizeChanged,
  showPaging = true,
  sizeListIndex = 0,
  scrollTopDisabled = false,
  scrollTopHidden = false,
  showLast,
}) => {
  const onPaginatorSizeChanged = (index: number) => {
    if (onPageSizeChanged) {
      onPageSizeChanged(index);
    }
  };

  const firstElement = cursorTable
    ? (cursorTable.currentIndex - 1) * sizeList[sizeListIndex] + 1
    : 0;
  const lastElement = cursorTable
    ? firstElement + sizeList[sizeListIndex] - 1
    : numItems - 1 > 0
    ? numItems - 1
    : 0;
  const showPager = showPaging && cursorTable && numItems > sizeList[0];

  const callCursorFnAndGoTop = (cursorFn: () => void) => {
    if (onScrollTopClick) {
      onScrollTopClick();
    }
    cursorFn();
  };
  return (
    <div
      className={classNames("lec-cursor-table-footer", "lec-table-footer", {
        [className as string]: !!className,
        shortBorder: numItems === 0,
      })}
    >
      <div className={`lec-table-footer__content-left`}>
        <span className="lec-table-footer-results">
          {showPager &&
            `${numberFormatter(firstElement)}-${
              lastElement < numItems
                ? numberFormatter(lastElement)
                : numberFormatter(numItems)
            } of `}
          <b data-test-id="table-footer_result-items">
            {numberFormatter(numItems)}{" "}
          </b>
          {quantityString(numItems, "result", "results")}
        </span>
      </div>
      <div className={`lec-table-footer__content-center`}>
        {showPager && cursorTable && (
          <CursorPaginator
            first={() => callCursorFnAndGoTop(cursorTable.first)}
            last={() => callCursorFnAndGoTop(cursorTable.last)}
            next={() => callCursorFnAndGoTop(cursorTable.next)}
            prev={() => callCursorFnAndGoTop(cursorTable.prev)}
            hasNext={cursorTable.hasNext}
            hasPrev={cursorTable.hasPrev}
            showLast={showLast}
          />
        )}
      </div>
      <div className={`lec-table-footer__content-right`}>
        {showPager && (
          <div style={{ marginRight: "16px" }}>
            <CursorPaginationSize
              totalItems={numItems}
              sizeList={sizeList}
              sizeListIndex={sizeListIndex}
              onSizeChanged={onPaginatorSizeChanged}
            />
          </div>
        )}
        {!scrollTopHidden && (
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
        )}
      </div>
    </div>
  );
};
