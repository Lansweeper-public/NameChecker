import React from "react";

export const iconNames = ["help", "minus", "plus"];

export type IconName = typeof iconNames[number];

export interface IIcon extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  size?: number;
  style?: any;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  icon: IconName;
  dataTestId?: string;
  dataUserlaneId?: string;
  id?: string;
}

export const Icon: React.FC<IIcon> = ({
  icon,
  style,
  size,
  className,
  dataTestId,
  dataUserlaneId,
  ...rest
}) => {
  const getClassName = (): string => {
    let baseClass = `lec-icon lec-icon-${icon}`;
    if (className) baseClass += ` ${className}`;
    return baseClass;
  };
  const getStyles = (): Record<string, unknown> => {
    let styles = { ...style };
    if (size) styles = { ...styles, fontSize: `${size}px` };
    return styles;
  };

  return (
    <i
      className={getClassName()}
      style={getStyles()}
      data-test-id={dataTestId}
      data-userlane-id={dataUserlaneId}
      {...rest}
    />
  );
};
