import React from "react";
import * as HumanizeUtils from "./utils";

export interface IHumanize {
  value?: string | number;
  capitalize?: ICapitalize;
  literals?: string[];
}

export interface ICapitalize {
  mode: "BASIC" | "ALL" | "TITLE";
  exceptions?: string[];
}

export const toHumanized = (
  opts: IHumanize,
): string | number | null | undefined => {
  const { value, capitalize, literals } = opts;

  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return null;
  }

  let displayValue: string | undefined = value;

  if (capitalize) {
    if (capitalize.mode === "BASIC") {
      displayValue = HumanizeUtils.capitalize(displayValue);
    } else if (capitalize.mode === "ALL") {
      displayValue = HumanizeUtils.capitalizeAll(displayValue);
    } else if (capitalize.mode === "TITLE") {
      displayValue = HumanizeUtils.titleCase(
        displayValue,
        capitalize.exceptions,
      );
    }
  }

  if (literals) {
    literals.forEach((literal) => {
      const regex = new RegExp(`\\b${literal}\\b`, "gi");
      displayValue = displayValue
        ? displayValue.replace(regex, literal)
        : undefined;
    });
  }

  return displayValue;
};

export const Humanize: React.FC<IHumanize> = ({
  value,
  capitalize,
  literals,
  ...rest
}) =>
  value ? <span>{toHumanized({ value, capitalize, literals })}</span> : null;
