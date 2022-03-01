import classnames from "classnames";
import { Input } from "antd";
import React from "react";
import { HelperText } from "../helperText";

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

const isValidated = (error = false, valid = false): boolean => error || valid;

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
      <div
        className={classnames("lec-form-control", {
          "lec-form-control--error": isError,
        })}
      >
        <div
          className={classnames("lec-input", {
            "lec-input-required": required,
            "lec-input-error": isError,
          })}
        >
          <Input
            {...rest}
            onChange={(event: any) => {
              onChange(event);
              if (customOnChange) {
                customOnChange(event);
              }
            }}
            value={value ? value : ""}
            size="large"
            className={classnames({
              "input-validated": isValidated(
                isError,
                checkInputValid(showValid, meta, isError),
              ),
            })}
            {...restInput}
          />
          {(meta.modified || showErrors) &&
            required &&
            !value &&
            meta.touched && <HelperText>This field is required</HelperText>}
          {(shouldShowMetaError(meta, showErrors) && (
            <HelperText>{meta.error}</HelperText>
          )) ||
            (shouldShowErrorText(errors) && (
              <HelperText>{errors.message}</HelperText>
            ))}
        </div>
      </div>
    </>
  );
};
