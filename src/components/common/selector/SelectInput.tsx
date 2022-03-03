import React from "react";
import { Select } from "antd";
import { OptionProps, SelectProps } from "antd/lib/select";
import classnames from "classnames";
import { Icon } from "../icon";
import { Spin } from "../spin";

const { Option } = Select;

export interface ISelectInput extends SelectProps {
  label?: React.ReactNode;
  postLabel?: React.ReactNode;
  required?: boolean;
  customDropdownClassName?: string;
  dataTestId?: string;
  miniDropdown?: boolean;
}

export interface ISelectOption extends OptionProps {
  name?: string;
}

const SuffixIcon: React.FC<{ isOpen?: boolean; loading?: boolean }> = ({
  loading,
  isOpen = false,
}) => {
  if (loading) return <Spin type="ellipsis" />;
  return <Icon icon={isOpen ? "arrow-up" : "arrow-bottom"} />;
};

export const SelectInput: React.FC<ISelectInput> = ({
  required,
  label,
  postLabel,
  loading,
  disabled,
  miniDropdown,
  children,
  customDropdownClassName,
  notFoundContent,
  dataTestId,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const requiredClass = required ? "lec-select-required" : "";
  const miniDropdownClass = miniDropdown ? "lec-mini-dropdown" : "";

  const onOpenAutocomplete = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className={classnames(requiredClass, miniDropdownClass, `lec-select`)}>
      <div className="lec-select__label-container">
        {label && <label className="lec-select__label">{label}</label>}
        {postLabel && (
          <span className="lec-select__postlabel">{postLabel}</span>
        )}
      </div>
      <Select
        loading={loading}
        disabled={disabled || loading}
        data-test-id={dataTestId}
        notFoundContent={
          <div className="lec-select__dropdown__not-found-container">
            <span className="not-found-container__title">
              {notFoundContent || "Your search has no result"}
            </span>
          </div>
        }
        dropdownClassName={classnames(
          miniDropdownClass,
          customDropdownClassName,
          "lec-select__dropdown",
        )}
        suffixIcon={<SuffixIcon isOpen={isOpen} loading={loading} />}
        clearIcon={<Icon icon="close" />}
        onDropdownVisibleChange={onOpenAutocomplete}
        getPopupContainer={(trigger: HTMLElement) =>
          trigger.parentNode as HTMLElement
        }
        {...(rest as ISelectInput)}
      >
        {children}
      </Select>
    </div>
  );
};

export const SelectOption: React.FC<ISelectOption> = ({
  name,
  children,
  ...rest
}) => {
  return <Option {...rest}>{children}</Option>;
};
