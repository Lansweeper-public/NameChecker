import * as React from "react";
import classnames from "classnames";
import { numberFormatter } from "./utils";

const cn = classnames;
export interface IPaginationSize {
  totalItems: number;
  sizeList: number[];
  sizeListIndex: number;
  onChanged?: (size: number) => void;
}

const baseClass = "lec-pagination-size";

export class PaginationSize extends React.Component<IPaginationSize> {
  public onSizeChanged = (index: number) => {
    if (this.props.onChanged) {
      this.props.onChanged(index);
    }
  };

  public render() {
    const { totalItems, sizeList, sizeListIndex } = this.props;

    return (
      <div className={baseClass}>
        {sizeList[0] < totalItems ? (
          <>
            <span className={`${baseClass}__display-text`}>Display</span>
            <div className={`${baseClass}__size-list`}>
              {sizeList.map(
                (size, i) =>
                  size <= totalItems && (
                    <span
                      key={size}
                      className={cn(`${baseClass}__size-list__item`, {
                        [`${baseClass}__size-list__item--active`]:
                          i === sizeListIndex,
                      })}
                      onClick={() => this.onSizeChanged(i)}
                    >
                      {numberFormatter(size)}
                    </span>
                  ),
              )}
            </div>
            <span className={`${baseClass}__size`}>
              of {numberFormatter(totalItems)}
            </span>
          </>
        ) : (
          <>
            <span className={`${baseClass}__display-text`}>Results</span>{" "}
            <span className={`${baseClass}__size`}>
              {numberFormatter(totalItems)}
            </span>
          </>
        )}
      </div>
    );
  }
}
