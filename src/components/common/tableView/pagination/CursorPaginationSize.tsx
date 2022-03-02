import React, { useEffect, useState } from "react";

import { CursorPaginationSelect } from "./CursorPaginationSelect";

export interface ICursorPaginationSize {
  totalItems: number;
  sizeList: number[];
  sizeListIndex: number;
  onSizeChanged?: (size: number) => void;
}

export const CursorPaginationSize: React.FC<ICursorPaginationSize> = ({
  totalItems = 300,
  sizeList = [100, 250, 300],
  sizeListIndex,
  onSizeChanged,
}) => {
  const sortSizeList = [...sizeList]
    .sort((a: number, b: number) => a - b)
    .reduce((acc, curr, index) => {
      if (curr < totalItems) {
        acc.push(curr);
      } else {
        if (acc[index - 1] < totalItems) {
          acc.push(curr);
        }
      }

      return acc;
    }, [] as number[]);
  const [size, setSize] = useState(sizeList[0]);

  useEffect(() => {
    const defaultValue = sizeListIndex
      ? sizeList[sizeListIndex]
      : sortSizeList[0];

    setSize(defaultValue);
  }, [sizeListIndex, sizeList]);

  if (sortSizeList.length <= 0) {
    return null;
  }

  const sizeChange = (newSize: number) => {
    setSize(newSize);
    if (onSizeChanged) {
      onSizeChanged(newSize);
    }
  };

  return (
    <div className="lec-pagination-size__container">
      <span className="lec-pagination-size__label">Display: </span>
      <CursorPaginationSelect
        value={size ?? sizeList[sizeListIndex]}
        optionValues={sortSizeList}
        onSelect={sizeChange}
      />
    </div>
  );
};
