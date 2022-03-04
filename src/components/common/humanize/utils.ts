export const capitalize = (value: string, downCaseTail = false): string => {
  return `${value.charAt(0).toUpperCase()}${
    downCaseTail ? value.slice(1).toLowerCase() : value.slice(1)
  }`;
};

export const capitalizeAll = (value: string): string => {
  return value.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

export const titleCase = (value: string, exceptions?: string[]): string => {
  return doTitleCase(value, exceptions);
};

const doTitleCase = (
  value: string,
  exceptions?: string[],
  hyphenated = false,
  firstOrLast = true,
) => {
  let smallWords =
    /\b(a|an|and|at|but|by|de|en|for|if|in|of|on|or|the|to|via|vs?\.?)\b/i;
  if (exceptions) {
    smallWords = new RegExp(`\\b(${exceptions.join("||")}?\\.?)\\b`, "gi");
  }
  const internalCaps = /\S+[A-Z]+\S*/;
  const splitOnWhiteSpaceRegex = /\s+/;
  const splitOnHyphensRegex = /-/;
  const titleCasedArray: string[] = [];
  const stringArray = value.split(
    hyphenated ? splitOnHyphensRegex : splitOnWhiteSpaceRegex,
  );

  stringArray.forEach((word, index) => {
    if (word.indexOf("-") !== -1) {
      titleCasedArray.push(
        doTitleCase(
          word,
          exceptions,
          true,
          index === 0 || index === stringArray.length - 1,
        ),
      );
    } else if (
      firstOrLast &&
      (index === 0 || index === stringArray.length - 1)
    ) {
      titleCasedArray.push(internalCaps.test(word) ? word : capitalize(word));
    } else if (internalCaps.test(word)) {
      titleCasedArray.push(word);
    } else if (smallWords.test(word)) {
      titleCasedArray.push(word.toLowerCase());
    } else {
      titleCasedArray.push(capitalize(word));
    }
  });

  return titleCasedArray.join(hyphenated ? "-" : " ");
};
