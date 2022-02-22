import styled, { CreateStyled } from "@emotion/styled";

export interface ITheme {
  colors: {
    primary: string;
    lightGrey: string;
    lighterGrey: string;
    darkGrey: string;
    grey: string;
    white: string;
    red: string;
    green: string;
    dark: string;
    black: string;
    blue: string;
    magenta: string;
    yellow: string;
  };
  mixins: {
    rgba(hex: string, opacity: number, trueOpacity?: boolean): string;
    pxToRem(...args: number[]): string;
  };
}

export const theme: ITheme = {
  colors: {
    primary: "#ff8a00",
    lightGrey: "#e4e4e4",
    lighterGrey: "#f2f2f2",
    darkGrey: "#9c9fa3",
    grey: "#393e46",
    white: "#ffffff",
    black: "#000000",
    red: "#ff5f3d",
    green: "#27c686",
    dark: "#222831",
    blue: "#309dd1",
    magenta: "#d739aa",
    yellow: "#ffcd22",
  },
  mixins: {
    rgba: (hex, opacity, trueOpacity = false): string => {
      const copyHex = hex.replace("#", "");
      const r = parseInt(copyHex.substring(0, 2), 16);
      const g = parseInt(copyHex.substring(2, 4), 16);
      const b = parseInt(copyHex.substring(4, 6), 16);

      return trueOpacity
        ? `rgba(${r},${g},${b},${opacity})`
        : `rgb(${(1 - opacity) * 255 + opacity * r}, ${
            (1 - opacity) * 255 + opacity * g
          }, ${(1 - opacity) * 255 + opacity * b})`;
    },
    pxToRem: (...args): string => {
      return args
        .map((pixels) => {
          const baseVal = 16;
          const px = parseInt(pixels.toString(), 10);
          const rem = parseFloat(
            (px / parseInt(baseVal.toString(), 10)).toPrecision(4),
          );
          return `${rem}rem`;
        })
        .reduce((acc, curr): string => {
          if (acc === undefined) {
            return curr;
          }
          return `${acc} ${curr}`;
        });
    },
  },
};

export default styled as CreateStyled<ITheme>;
