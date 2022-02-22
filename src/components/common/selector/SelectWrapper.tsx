import {
  ILECImageIcon,
  LECFormControl,
  LECFormHelperText,
  LECSelectOption,
} from "@lansweeper/lecfrontcomponents";
import React from "react";
import { SelectOptionIcon, StyledLECSelect } from "./SelectWrapper.styles";

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

export const SelectWrapper = (props) => {
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
