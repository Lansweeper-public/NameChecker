import classnames from "classnames";
import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../icon";
import { ITooltipWrapper, TooltipWrapper } from "../tooltip";

export interface ITag {
  label?: string | ReactNode;
  value?: string;
  className?: string;
  onClose?: (key?: string) => void;
  style?: React.CSSProperties;
  info?: ITooltipWrapper;
  variant?: "default" | "grey" | "blue" | "alert";
  disabled?: boolean;
}

const variantTooltipProps: {
  [key: string]: {
    type?: ITooltipWrapper["type"];
    placement?: ITooltipWrapper["placement"];
  };
} = {
  default: { type: "info-white" },
  grey: {
    type: "info-long",
    placement: "bottomLeft",
  },
  blue: {
    type: "info",
  },
  alert: {
    type: "info",
  },
};

export const Tag: React.FC<ITag> = ({
  label,
  value,
  className,
  onClose,
  disabled,
  info,
  variant = "default",
  ...rest
}) => {
  const closeRef = useRef<HTMLDivElement | null>(null);
  const [labelWidth, setLabelWidth] = useState<string>("auto");

  useLayoutEffect(() => {
    const closeWidth: number =
      closeRef && closeRef.current ? closeRef.current.offsetWidth : 0;
    setLabelWidth(`calc(100% - ${closeWidth}px)`);
  }, [closeRef]);

  const variantClassname =
    variant === "default" ? "lec-tag" : `lec-tag lec-tag--${variant}`;
  const disabledClassname = disabled ? "lec-tag-disabled" : "";
  const tooltipProps = {
    ...variantTooltipProps[variant],
    ...info,
  };

  return (
    <div
      data-test-id={`lec-tag-${value}`}
      className={classnames(className, variantClassname, disabledClassname)}
      {...rest}
    >
      <div className="lec-tag__content" style={{ width: labelWidth }}>
        {label && <span className="lec-tag__content__label">{label}</span>}
      </div>
      {(onClose || info) && (
        <div ref={closeRef} className="lec-tag__close-container">
          {info && (
            <TooltipWrapper
              arrowPointAtCenter={true}
              placement="bottom"
              {...(tooltipProps as ITooltipWrapper)}
              className={onClose ? `lec-tag__info-tooltip--closable-tag` : ""}
            >
              <Icon
                icon={variant === "alert" ? variant : "info"}
                className="lec-tag__info-icon"
              />
            </TooltipWrapper>
          )}
          {onClose && (
            <Icon
              data-test-id={`lec-tag-icon-close-${value}`}
              icon={"close"}
              onClick={(e) => {
                e.stopPropagation();
                onClose(value);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
