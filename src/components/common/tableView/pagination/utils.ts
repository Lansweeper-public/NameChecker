export const numberFormatter = (
  number = 0,
  locale?: string | string[],
  options?: Intl.NumberFormatOptions,
): string => {
  if (number === null) {
    return "0";
  }
  return number.toLocaleString(locale, options);
};

export const quantityString = (
  quantity: number,
  singularText: string,
  pluralText: string,
): string => (quantity === 1 ? singularText : pluralText);
