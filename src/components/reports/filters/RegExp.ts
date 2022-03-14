import { IFiltersGroupedInput } from "../../../types";
import {
  BEGINS_WITH,
  END_WITH,
  EQUAL_TO,
  HAVE_X_NUMBER_OF_CHARACTERS,
  INCLUDE,
  NO_EQUAL_TO,
} from "./FilterTable.columns";

const beginsWithEqual = (text: string) => new RegExp(`^${text}`, "g");
const beginsWithNotEqual = (text: string) => new RegExp(`^(?!${text})`, "g");
const endsWithEqual = (text: string) => new RegExp(`.*(${text})$`, "g");
const endsWithNotEqual = (text: string) => new RegExp(`.*(?<!${text})$`, "g");
const includeWithEqual = (text: string) => new RegExp(text, "g");
const includeWithNotEqual = (text: string) =>
  new RegExp(`^((?!${text}).)*$`, "g");
const haveXNumberOfCharactersWithEqual = (num: string) =>
  new RegExp(`^.{${num}}$`, "g");
const haveXNumberOfCharactersWithNotEqual = (num: string) =>
  new RegExp(
    `^(.{1,${isNaN(parseInt(num, 10)) ? 0 : parseInt(num, 10) - 1}}|.{${
      isNaN(parseInt(num, 10)) ? 0 : parseInt(num, 10) + 1
    },})$`,
    "g",
  );

type IOperatorRegExpMap = { [x: string]: (text: string) => RegExp };

const operatorsRegexpMap: IOperatorRegExpMap = {
  [BEGINS_WITH + EQUAL_TO]: beginsWithEqual,
  [BEGINS_WITH + NO_EQUAL_TO]: beginsWithNotEqual,
  [END_WITH + EQUAL_TO]: endsWithEqual,
  [END_WITH + NO_EQUAL_TO]: endsWithNotEqual,
  [INCLUDE + EQUAL_TO]: includeWithEqual,
  [INCLUDE + NO_EQUAL_TO]: includeWithNotEqual,
  [HAVE_X_NUMBER_OF_CHARACTERS + EQUAL_TO]: haveXNumberOfCharactersWithEqual,
  [HAVE_X_NUMBER_OF_CHARACTERS + NO_EQUAL_TO]:
    haveXNumberOfCharactersWithNotEqual,
};

export const buildRegExp = (items) => {
  const matchers = Object.keys(items).reduce(
    (acc, cur) => {
      const op = `${items[cur].selectOption}${items[cur].selectOperator}`;
      const noop = `${items[cur].selectOption}${
        items[cur].selectOperator === EQUAL_TO ? NO_EQUAL_TO : EQUAL_TO
      }`;
      if (acc.ops.includes(op)) {
        const rexexp = operatorsRegexpMap[op](items[cur].enterText as string);
        acc.regexps[op] = new RegExp(
          `${rexexp.source}|${acc.regexps[op].source}`,
          "g",
        );
      } else {
        acc.regexps[op] = operatorsRegexpMap[op](
          items[cur].enterText as string,
        );
        acc.ops.push(op);
      }
      acc.noregexps.push(
        operatorsRegexpMap[noop](items[cur].enterText as string),
      );
      return acc;
    },
    {
      ops: [] as string[],
      regexps: {} as { [key: string]: RegExp },
      noregexps: [] as RegExp[],
    },
  );
  return {
    matchers: Object.values(matchers.regexps),
    nomatchers: matchers.noregexps,
  };
};

export const buildFilter = (
  regexps: RegExp[],
  conjunction: string,
): IFiltersGroupedInput => {
  const filters = {
    conjunction,
  } as IFiltersGroupedInput;
  filters.conditions = [];
  regexps.forEach((regexp) =>
    filters?.conditions?.push({
      operator: "LIKE",
      path: "assetBasicInfo.name",
      value: regexp.source,
    }),
  );
  return filters;
};
