import { IFiltersGroupedInput } from "../../../types";
import {
  BEGINS_WITH,
  END_WITH,
  EQUAL_TO,
  HAVE_X_NUMBER_OF_CHARACTERS,
  INCLUDE,
  NO_EQUAL_TO,
} from "./FilterTable.columns";

type IRegExps = { regexp: RegExp; esregexp: string };

const beginsWithEqual = (text: string): IRegExps => ({
  regexp: new RegExp(`^${text}`, "g"),
  esregexp: `${text}.*`,
});
const beginsWithNotEqual = (text: string): IRegExps => ({
  regexp: new RegExp(`^(?!${text})`, "g"),
  esregexp: `@&~(${text}.+)`,
});
const endsWithEqual = (text: string): IRegExps => ({
  regexp: new RegExp(`.*(${text})$`, "g"),
  esregexp: `.*${text}`,
});
const endsWithNotEqual = (text: string): IRegExps => ({
  regexp: new RegExp(`.*(?<!${text})$`, "g"),
  esregexp: `@&~(.+${text})`,
});
const includeWithEqual = (text: string): IRegExps => ({
  regexp: new RegExp(text, "g"),
  esregexp: `.*${text}.*`,
});
const includeWithNotEqual = (text: string): IRegExps => ({
  regexp: new RegExp(`^((?!${text}).)*$`, "g"),
  esregexp: `@&~(.*${text}.*)`,
});
const haveXNumberOfCharactersWithEqual = (num: string): IRegExps => ({
  regexp: new RegExp(`^.{${num}}$`, "g"),
  esregexp: `.{${num}}`,
});
const haveXNumberOfCharactersWithNotEqual = (num: string): IRegExps => ({
  regexp: new RegExp(
    `^(.{1,${isNaN(parseInt(num, 10)) ? 0 : parseInt(num, 10) - 1}}|.{${
      isNaN(parseInt(num, 10)) ? 0 : parseInt(num, 10) + 1
    },})$`,
    "g",
  ),
  esregexp: `(.{1,${isNaN(parseInt(num, 10)) ? 0 : parseInt(num, 10) - 1}}|.{${
    isNaN(parseInt(num, 10)) ? 0 : parseInt(num, 10) + 1
  },})`,
});

type IOperatorRegExpMap = { [x: string]: (text: string) => IRegExps };

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
        const irexexp = operatorsRegexpMap[op](
          items[cur].enterText?.toLowerCase() as string,
        );
        acc.regexps[op] = new RegExp(
          `${irexexp.regexp.source}|${acc.regexps[op].source}`,
          "g",
        );
        acc.esregexp[op] = `${irexexp.esregexp}|${acc.esregexp[op]}`;
      } else {
        const regexps = operatorsRegexpMap[op](
          items[cur].enterText?.toLowerCase() as string,
        );
        acc.regexps[op] = regexps.regexp;
        acc.esregexp[op] = regexps.esregexp;
        acc.ops.push(op);
      }
      acc.noesregexps.push(
        operatorsRegexpMap[noop](items[cur].enterText?.toLowerCase() as string)
          .esregexp,
      );
      return acc;
    },
    {
      ops: [] as string[],
      esregexp: [] as string[],
      noesregexps: [] as string[],
      regexps: {} as { [key: string]: RegExp },
    },
  );
  return {
    noesmatchers: matchers.noesregexps,
    esmatchers: Object.values(matchers.esregexp),
    matchers: Object.values(matchers.regexps),
  };
};

export const buildESFilter = (
  regexps: string[],
  conjunction: string,
): IFiltersGroupedInput => {
  const filters = {
    conjunction,
  } as IFiltersGroupedInput;
  filters.conditions = [];
  regexps.forEach((regexp) =>
    filters?.conditions?.push({
      operator: "REGEXP",
      path: "assetBasicInfo.name",
      value: regexp,
    }),
  );
  return filters;
};
