import { Icon, IconName } from "../../icon";
import React from "react";
import classNames from "classnames";
import { ToggleTooltip } from "../../tooltip";

const CursorPaginatorItem: React.FC<{
  disabled: boolean;
  shouldShown: boolean;
  onClick: () => void;
  icon: IconName;
  tooltipTitle: string;
  dataTestId: string;
}> = ({ shouldShown, disabled, onClick, icon, tooltipTitle, dataTestId }) => {
  return (
    <span
      className={classNames({
        "lec-cursor-pagination-wrapper": true,
        disabled,
      })}
    >
      <ToggleTooltip
        showTooltip={shouldShown}
        title={tooltipTitle}
        placement="top"
        mouseEnterDelay={0.2}
      >
        <button
          type="button"
          className="lec-cursor-pagination-button"
          disabled={disabled}
          onClick={onClick}
          data-test-id={dataTestId}
        >
          <Icon icon={icon} />
        </button>
      </ToggleTooltip>
    </span>
  );
};

interface ICursorPaginator {
  hasPrev: boolean;
  hasNext: boolean;
  next: () => void;
  prev: () => void;
  last: () => void;
  first: () => void;
  showLast?: boolean;
}

export const CursorPaginator: React.FC<ICursorPaginator> = ({
  hasPrev = false,
  hasNext = true,
  next,
  prev,
  last,
  first,
  showLast = true,
}) => {
  return (
    <div className="cursor-paginator">
      <CursorPaginatorItem
        disabled={!hasPrev}
        shouldShown={hasPrev}
        onClick={first}
        icon="pagination-first"
        tooltipTitle="First Page"
        dataTestId="cursor-pagination-first"
      />
      <CursorPaginatorItem
        disabled={!hasPrev}
        shouldShown={hasPrev}
        onClick={prev}
        icon="arrow-left"
        tooltipTitle="Previous Page"
        dataTestId="cursor-pagination-prev"
      />
      <CursorPaginatorItem
        disabled={!hasNext}
        shouldShown={hasNext}
        onClick={next}
        icon="arrow-right"
        tooltipTitle="Next Page"
        dataTestId="cursor-pagination-next"
      />

      {showLast && (
        <CursorPaginatorItem
          disabled={!hasNext}
          shouldShown={hasNext}
          onClick={last}
          icon="pagination-last"
          tooltipTitle="Last Page"
          dataTestId="cursor-pagination-last"
        />
      )}
    </div>
  );
};
