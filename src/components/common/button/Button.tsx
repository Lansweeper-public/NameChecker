import React from "react";
import classnames from "classnames";
import { FC } from "react";
import { IconMaker } from "../iconMaker";
import { IconName } from "../icon";
import { Spin } from "../spin/Spin";

const cn = classnames;

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  disabled?: boolean;
  alert?: boolean;
  check?: boolean;
  disableMinWidth?: boolean;
  isConfirmation?: boolean;
  loading?: boolean;
  className?: string;
  secondary?: boolean;
  xs?: boolean;
  icon?: IconName;
  children: React.ReactNode;
}

export const Button: FC<IButtonProps> = ({
  children,
  alert,
  check,
  disableMinWidth,
  isConfirmation,
  loading,
  disabled,
  className,
  secondary,
  xs,
  icon,
  onClick,
  type = "button",
  ...rest
}) => {
  return (
    <button
      className={cn(className, "lec-button", {
        "lec-button--disabled": disabled,
        "lec-button--loading": loading,
        "lec-button--alert": !disabled && alert,
        "lec-button--check": !disabled && !alert && check,
        "lec-button--secondary": !disabled && !alert && secondary,
        "lec-button--xs": xs,
        "lec-button--confirmation": isConfirmation,
        "lec-button--min-width": disableMinWidth,
      })}
      type={type}
      disabled={disabled}
      {...(!disabled ? { onClick } : {})}
      {...rest}
    >
      <div
        className={`lec-button--content ${
          loading ? "lec-button--invisible-content" : ""
        }`}
      >
        {icon ? <IconMaker name={icon} /> : ""}
        {children}
      </div>

      {loading && <Spin type="ellipsis" />}
    </button>
  );
};
