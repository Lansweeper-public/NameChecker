import React from "react";
import classnames from "classnames";
import { Tooltip } from "antd";
import { TooltipPropsWithTitle } from "antd/lib/tooltip";

export type TooltipType =
  | "default"
  | "info"
  | "info-grey"
  | "info-long"
  | "info-white"
  | "popover-white"
  | "alert";

export interface ITooltipWrapper extends TooltipPropsWithTitle {
  type?: TooltipType;
  noPadding?: boolean;
  dataTestId?: string;
  dataUserlaneId?: string;
  fixedWidth?: boolean;
}

export const TooltipWrapper: React.FC<ITooltipWrapper> = ({
  type = "default",
  children,
  overlayClassName = "",
  noPadding = false,
  fixedWidth = false,
  dataTestId,
  title,
  ...rest
}) => (
  <Tooltip
    arrowPointAtCenter
    title={
      dataTestId ? (
        <span data-test-id={`${dataTestId}__tooltip-text`}>{title}</span>
      ) : (
        title
      )
    }
    {...rest}
    overlayClassName={classnames(
      "lec-tooltip",
      {
        "lec-tooltip--info": type.startsWith("info"),
        "lec-tooltip--info-grey": type === "info-grey",
        "lec-tooltip--info-long": type === "info-long",
        "lec-tooltip--info-white": type === "info-white",
        "lec-tooltip--popover-white": type === "popover-white",

        "lec-tooltip--alert": type === "alert",
        "lec-tooltip--no-padding": noPadding,
        "lec-tooltip--fixed-width": fixedWidth,
      },
      overlayClassName,
    )}
  >
    {children}
  </Tooltip>
);

export interface ToogleTooltipProps extends ITooltipWrapper {
  showTooltip?: boolean;
}

export const ToggleTooltip: React.FC<ToogleTooltipProps> = ({
  showTooltip,
  children,
  ...rest
}) =>
  showTooltip ? (
    <TooltipWrapper {...rest}>{children}</TooltipWrapper>
  ) : (
    <>{children}</>
  );
