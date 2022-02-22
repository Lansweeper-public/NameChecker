import {
  LECFormControl,
  LECFormHelperText,
  LECInput,
} from "@lansweeper/lecfrontcomponents";
import React from "react";

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

export const InputWrapper = (props: any) => {
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
