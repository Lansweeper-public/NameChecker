import React from "react";
import { ILECTableColumn, ILECTableItem } from "@lansweeper/lecfrontcomponents";
import { StyledButton, StyledField } from "./FilterTable.styles";
import { IListItem, InputWrapper, SelectWrapper } from "../../common";
import { Icon } from "../../common/icon";

export const attributeColumns: ILECTableColumn[] = [
  {
    key: "selectOption",
    name: "Select option",
    dataTestId: "filter__asset-name",
    width: "313",
  },
  {
    key: "selectOperator",
    name: "Select an operator",
    dataTestId: "filter__asset-selectOperator",
    width: "313",
  },
  {
    key: "enterText",
    name: "Enter text",
    dataTestId: "filter__asset-enterText",
    width: "393",
  },
  {
    key: "minus",
    name: "",
    dataTestId: "filter__asset-minus-action",
    width: "50",
  },
  {
    key: "plus",
    name: "",
    dataTestId: "filter__asset-plus-action",
    width: "50",
  },
];

export const BEGINS_WITH = "Begins with";
export const END_WITH = "End with";
export const INCLUDE = "Include";
export const HAVE_X_NUMBER_OF_CHARACTERS = "Have X number of characters";
export const EQUAL_TO = "Equal to";
export const NO_EQUAL_TO = "Not equal to";

export const selectOptions: IListItem[] = [
  BEGINS_WITH,
  END_WITH,
  INCLUDE,
  HAVE_X_NUMBER_OF_CHARACTERS,
].map((key, index) => ({ id: (index + 1).toString(), name: key }));

export const operatorOptions: IListItem[] = [EQUAL_TO, NO_EQUAL_TO].map(
  (key, index) => ({ id: (index + 1).toString(), name: key }),
);

export const transformTableItem = (
  id: string,
  handleRemoveRow: (id: string) => void,
  handleAddRow: (id: string) => void,
  numRows: number,
): ILECTableItem => ({
  id,
  attributes: {
    selectOption: {
      component: (
        <StyledField
          name={`selectOption#${id}`}
          initialValue={BEGINS_WITH}
          component={SelectWrapper}
          items={selectOptions}
        />
      ),
    },
    selectOperator: {
      component: (
        <StyledField
          name={`selectOperator#${id}`}
          initialValue={EQUAL_TO}
          component={SelectWrapper}
          items={operatorOptions}
        />
      ),
    },
    enterText: {
      component: (
        <StyledField
          name={`enterText#${id}`}
          component={InputWrapper}
          required={true}
        />
      ),
    },
    minus: {
      component:
        numRows > 1 ? (
          <StyledButton onClick={() => handleRemoveRow(id)}>
            <Icon icon="minus" />
          </StyledButton>
        ) : (
          <div />
        ),
    },
    plus: {
      component: (
        <StyledButton onClick={() => handleAddRow(id)}>
          <Icon icon="plus" />
        </StyledButton>
      ),
    },
  },
  selectionDisabled: false,
});
