import React from "react";
import { StyledButton, StyledField } from "./FilterTable.styles";
import { IListItem, InputWrapper, SelectWrapper } from "../../common";
import { Icon } from "../../common/icon";
import { ITableColumn, ITableItem } from "../../common/tableView";
import { FormApi } from "final-form";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

export const BEGINS_WITH = "Begins with";
export const END_WITH = "End with";
export const INCLUDE = "Include";
export const HAVE_X_NUMBER_OF_CHARACTERS = "Have X number of characters";
export const EQUAL_TO = "Equal to";
export const NO_EQUAL_TO = "Not equal to";

const isNumberField = (id, currentValues) => {
  return Object.entries(currentValues).some(([key, value]) => {
    return (
      key === `selectOption#${id}` && value === HAVE_X_NUMBER_OF_CHARACTERS
    );
  });
};

export const parseNumber = (value) => {
  if (!value) return value;
  return value.replace(/[^\d]/g, "");
};

export const attributeColumns: ITableColumn[] = [
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
  form: FormApi,
  id: string,
  handleRemoveRow: (id: string) => void,
  handleAddRow: (id: string) => void,
  numRows: number,
): ITableItem => {
  const initialValues = form.getState().initialValues;
  const currentValues = form.getState().values;

  return {
    id,
    attributes: {
      selectOption: {
        component: (
          <>
            <Field name={`enterText#${id}`} subscription={{}}>
              {({ input: { onChange } }) => (
                <OnChange name={`selectOption#${id}`}>
                  {() => {
                    if (
                      currentValues[`selectOption#${id}`] ===
                      HAVE_X_NUMBER_OF_CHARACTERS
                    ) {
                      onChange(parseNumber(currentValues[`enterText#${id}`]));
                    }
                  }}
                </OnChange>
              )}
            </Field>
            <StyledField
              name={`selectOption#${id}`}
              initialValue={
                initialValues[`selectOption#${id}`]
                  ? initialValues[`selectOption#${id}`]
                  : BEGINS_WITH
              }
              component={SelectWrapper}
              items={selectOptions}
            />
          </>
        ),
      },
      selectOperator: {
        component: (
          <StyledField
            name={`selectOperator#${id}`}
            initialValue={
              initialValues[`selectOperator#${id}`]
                ? initialValues[`selectOperator#${id}`]
                : EQUAL_TO
            }
            component={SelectWrapper}
            items={operatorOptions}
          />
        ),
      },
      enterText: {
        component: isNumberField(id, currentValues) ? (
          <StyledField
            name={`enterText#${id}`}
            component={InputWrapper}
            parse={parseNumber}
            format={parseNumber}
          />
        ) : (
          <StyledField name={`enterText#${id}`} component={InputWrapper} />
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
  };
};
