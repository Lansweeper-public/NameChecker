import {
  ILECImageIcon,
  ILECSelect,
  LECFormControl,
  LECFormHelperText,
  LECIconMaker,
  LECInput,
  LECSelect,
  LECSelectOption,
} from "@lansweeper/lecfrontcomponents";
import React from "react";
import styled from "@emotion/styled";

const SelectOptionIcon = styled(LECIconMaker)`
  position: relative;
  margin-right: 0.75rem;
  top: 0.1875rem;
`;

const StyledLECSelect = styled(LECSelect)<ILECSelect>`
  .ant-select-selection-selected-value {
    svg {
      position: relative;
      margin-right: 0.75rem;
      top: 3px;
    }
    span {
      margin-left: 5px;
      font-size: 15px;
      font-weight: 500;
      ${({ disabled }) =>
        !disabled &&
        `
          color: var(--grey);
        `};
    }
  }
`;

export interface IListItem {
  id?: string;
  key?: string;
  name: string;
  image?: ILECImageIcon["image"];
  disabled?: boolean;
}

const determineHasError = (meta, showErrors) =>
  !!((meta.modified || showErrors) && meta.error);
const determineRequired = (hasError, required, restInput) =>
  !!(hasError && required && !restInput.value);
const determineShouldBeShowed = (
  hasError,
  isInvalid,
  isMetaErrorAString,
  isShowRequired,
) => hasError && isInvalid && isMetaErrorAString && isShowRequired;
const determineShowErrorMessage = (errors, isShowRequired) =>
  errors?.show && errors.message && isShowRequired;

export const LECSelectWrapper = (props) => {
  const {
    input: { onChange: onChangeInput, value, ...restInput },
    meta,
    items,
    showErrors,
    required,
    showSearch,
    allowClear,
    onChange,
    errors,
    loading,
    ...rest
  } = props;

  const hasError = determineHasError(meta, showErrors);
  const showRequired = determineRequired(hasError, required, restInput);

  return (
    <>
      <LECFormControl error={hasError}>
        <StyledLECSelect
          loading={loading}
          required={required}
          defaultValue={meta.initial ? meta.initial : undefined}
          onChange={(e) => {
            onChangeInput(e);
            if (onChange) {
              onChange(e);
            }
          }}
          {...rest}
          filterOption={(inputValue, option: { props: IListItem }) =>
            option.props.name
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          allowClear={allowClear}
          showSearch={showSearch}
          {...restInput}
          value={value === "" ? undefined : value}
        >
          {items
            .filter(({ name }) => name !== value)
            .map(({ id, key, name, image, disabled }: IListItem) => (
              // LECSelect needs field name in their children to be able to filter by text search
              <LECSelectOption key={key || id} value={name} disabled={disabled}>
                <span>
                  {image && <SelectOptionIcon name={image} />}
                  {name}
                </span>
              </LECSelectOption>
            ))}
        </StyledLECSelect>
        {showRequired && (
          <LECFormHelperText>This field is required</LECFormHelperText>
        )}
        {(determineShouldBeShowed(
          hasError,
          meta.invalid,
          typeof meta.error === "string",
          !showRequired,
        ) && <LECFormHelperText>{meta.error}</LECFormHelperText>) ||
          (determineShouldBeShowed(
            hasError,
            meta.invalid,
            meta.error?.hasError,
            !showRequired,
          ) && <LECFormHelperText>{errors.message}</LECFormHelperText>) ||
          (determineShowErrorMessage(errors, !showRequired) && (
            <LECFormHelperText>{errors.message}</LECFormHelperText>
          ))}
      </LECFormControl>
    </>
  );
};

const isMetaError = (meta) => meta.error || meta.error?.hasError;

const checkInputError = (showErrors, meta, errors, required, value) => {
  return (
    (showErrors && isMetaError(meta)) ||
    errors?.show ||
    (meta.modified && required && !value)
  );
};

const checkInputValid = (showValid, meta, isError) =>
  showValid && meta.touched && !meta.pristine && !isError;

const shouldShowErrorText = (errors) => errors?.show && errors.message;

const shouldShowMetaError = (meta, showErrors) =>
  (meta.modified || showErrors) &&
  meta.invalid &&
  typeof meta.error === "string";

export const LECInputWrapper = (props: any) => {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    required,
    showErrors,
    customOnChange,
    showValid,
    errors,
    ...rest
  } = props;

  const isError = checkInputError(showErrors, meta, errors, required, value);

  return (
    <>
      <LECFormControl error={isError}>
        <LECInput
          {...rest}
          required={required}
          name={name}
          valid={checkInputValid(showValid, meta, isError)}
          error={isError}
          onChange={(event: any) => {
            onChange(event);
            if (customOnChange) {
              customOnChange(event);
            }
          }}
          value={value ? value : ""}
          {...restInput}
        />
        {(meta.modified || showErrors) &&
          required &&
          !value &&
          meta.touched && (
            <LECFormHelperText>This field is required</LECFormHelperText>
          )}
        {(shouldShowMetaError(meta, showErrors) && (
          <LECFormHelperText>{meta.error}</LECFormHelperText>
        )) ||
          (shouldShowErrorText(errors) && (
            <LECFormHelperText>{errors.message}</LECFormHelperText>
          ))}
      </LECFormControl>
    </>
  );
};
