import React, { useEffect, useState } from "react";

import { Icon } from "../../icon";
import classNames from "classnames";

interface ICursorPaginationSelect {
  value: number;
  optionValues: Array<number>;
  onSelect: (selection: number) => void;
}

export const CursorPaginationSelect: React.FC<ICursorPaginationSelect> = ({
  value,
  optionValues,
  onSelect,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showActive, setShowActive] = useState(true);

  const handleClickOutside = () => {
    if (showOptions === true) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  return (
    <div className="lec-cursor-pagination-select__container">
      <div>
        <div
          className="lec-cursor-pagination-select"
          tabIndex={0}
          onClick={() => {
            setShowOptions(!showOptions);
            setShowActive(true);
          }}
        >
          <span className="lec-cursor-pagination-select__text">{value}</span>
          <Icon
            className="lec-cursor-pagination-select__icon"
            icon={showOptions ? "arrow-up" : "arrow-bottom"}
          />
        </div>
      </div>
      <div
        className={classNames(
          "lec-cursor-pagination-select__options-container",
          {
            "lec-cursor-pagination-select__options-container--open":
              showOptions,
          },
        )}
      >
        {optionValues.map((optionValue: number) => {
          return (
            <div
              className={classNames("lec-cursor-pagination-select__option", {
                "lec-cursor-pagination-select__option--active":
                  optionValue === value && showActive,
              })}
              key={optionValue}
              onClick={() => {
                onSelect(optionValue);
                setShowOptions(false);
              }}
              onMouseOver={() => setShowActive(false)}
            >
              <span className={"lec-cursor-pagination-select__text"}>
                {optionValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
