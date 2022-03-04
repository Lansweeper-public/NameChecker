import React from "react";

import { Icon, IconName, iconNames } from "../icon";

export type IconMakerType = "icons" | "lec-font";

export interface IIconMaker extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  size?: number;
  style?: any;
  type?: IconMakerType;
  name: IconName;
  title?: string;
  dataTestId?: string;
  hideUnknown?: boolean;
  id?: string;
}

export const IconMaker: React.FC<IIconMaker> = ({
  type,
  name,
  hideUnknown,
  id,
  ...rest
}) => {
  const isFont: boolean =
    type === "lec-font" || iconNames.includes(name as IconName);

  if (isFont) return <Icon id={id} icon={name as IconName} {...rest} />;

  return null;
};
