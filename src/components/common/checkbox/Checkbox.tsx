import { Checkbox } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import classnames from "classnames";
import React, { ChangeEvent, useMemo } from "react";
import uuid from "uuid";

import { IconName, Icon } from "../icon";
import { IconMaker } from "../iconMaker";

export interface ICheckboxWrapper extends CheckboxProps {
  className?: string;
  name?: string;
  id?: string;
  image?: IconName;
  imageWhenChecked?: IconName;
  imageClassName?: string;
  imageSize?: number;
  defaultChecked?: boolean;
  checked?: boolean;
  label?: React.ReactNode;
  indeterminate?: boolean;
  dataTestId?: string;
  dataUserlaneId?: string;
  onChange?(e): void;
  onClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export const CheckboxWrapper: React.FC<ICheckboxWrapper> = ({
  id,
  label,
  name,
  className,
  checked,
  image,
  imageWhenChecked,
  imageClassName,
  imageSize,
  onChange,
  onClick,
  defaultChecked,
  indeterminate,
  disabled,
  dataTestId,
  dataUserlaneId,
  ...rest
}) => {
  const [isChecked, setIsChecked] = React.useState(
    defaultChecked ? defaultChecked : false,
  );

  const usedIsChecked = checked ?? isChecked;

  const uniqueId = useMemo(() => (id ? id : uuid.v4()), [id]);

  return (
    <div
      data-userlane-id={dataUserlaneId}
      data-test-id={dataTestId}
      id={id}
      className={classnames(`lec-checkbox`, className, {
        "lec-checkbox--disabled": disabled,
      })}
      onClick={onClick}
    >
      <label htmlFor={`hidden-checkbox-${uniqueId}`}>
        <div
          className={classnames(
            "box",
            usedIsChecked ? "lec-checkbox-checked" : "",
          )}
        >
          {usedIsChecked && !indeterminate && (
            <Icon icon="check" className="lec-checkbox__check" />
          )}

          {usedIsChecked && indeterminate && (
            <div className="lec-checkbox__check__indeterminate" />
          )}
        </div>

        {image || imageWhenChecked ? (
          usedIsChecked && imageWhenChecked ? (
            <IconMaker
              name={imageWhenChecked}
              className={classnames(
                "lec-checkbox__image",
                imageClassName ? imageClassName : "",
              )}
              size={imageSize}
            />
          ) : (
            image && (
              <IconMaker
                name={image}
                className={classnames(
                  "lec-checkbox__image",
                  imageClassName ? imageClassName : "",
                )}
                size={imageSize}
              />
            )
          )
        ) : (
          ""
        )}

        <span
          className={classnames("lec-checkbox__label", {
            "lec-checkbox__label--checked": usedIsChecked,
          })}
        >
          {label}
        </span>
      </label>
      <input
        id={`hidden-checkbox-${uniqueId}`}
        type="checkbox"
        className="lec-checkbox__hidden-checkbox"
        name={name}
        checked={usedIsChecked}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(ev);
          }
          setIsChecked(ev.target.checked);
        }}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export const LECCheckboxGroup = Checkbox.Group;
