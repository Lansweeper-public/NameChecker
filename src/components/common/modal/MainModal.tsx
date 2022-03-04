import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import cn from "classnames";
import * as React from "react";
import { IButtonProps, Button } from "../button";
import { Icon } from "../icon";
import { InputWrapper } from "../input";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";

export interface IMainModal {
  title?: React.ReactNode;
  titleExtra?: React.ReactNode;
  dataTestId?: string;
  open: boolean;
  editableTitle?: boolean;
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onTitleChange?: (text: string) => void;
  primaryBtn?: IMainModalBtn;
  secondaryBtn?: IMainModalBtn;
  customFooter?: React.ReactNode;
}

export interface IMainModalBtn {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  alert?: boolean;
  disableMinWidth?: boolean;
  icon?: IButtonProps["icon"];
  type?: IButtonProps["type"];
}

export const MainModal: React.FC<IMainModal & ModalProps> = ({
  title,
  titleExtra,
  open,
  onClose,
  className,
  editableTitle,
  onTitleChange,
  primaryBtn,
  secondaryBtn,
  children,
  customFooter,
  dataTestId,
  wrapProps,
  ...rest
}) => {
  const customProps = {
    ...wrapProps,
    ...(dataTestId ? { "data-test-id": `${dataTestId}-modal` } : {}),
  };

  return (
    <Modal
      wrapClassName={cn("lec-modal", className)}
      visible={open}
      footer={null}
      closable={false}
      onCancel={onClose}
      width="576px"
      wrapProps={customProps}
      {...rest}
    >
      <div
        className="lec-modal__header--underlined lec-modal__header--editable"
        data-test-id={dataTestId && `${dataTestId}-modal-header`}
      >
        {editableTitle ? (
          <InputWrapper
            name={title as string}
            value={title as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (onTitleChange) {
                onTitleChange(e.target.value);
              }
            }}
          />
        ) : (
          <h1 data-test-id={dataTestId && `${dataTestId}-modal-title`}>
            {title}
          </h1>
        )}
        {titleExtra && (
          <div className="lec-modal__title-extra">{titleExtra}</div>
        )}
        <Icon
          icon="close"
          onClick={onClose}
          className="lec-modal__header__close-icon"
          data-test-id={dataTestId && `${dataTestId}-modal-close-button`}
        />
      </div>
      <ModalBody dataTestId={dataTestId} className="lec-main-modal__body">
        {children}
      </ModalBody>
      {customFooter
        ? customFooter
        : primaryBtn && (
            <ModalFooter
              className="lec-main-modal__footer"
              dataTestId={dataTestId}
            >
              <Button
                data-hj-ignore-attributes
                icon={primaryBtn.icon}
                type={primaryBtn.type}
                alert={primaryBtn.alert}
                loading={primaryBtn.loading}
                disabled={primaryBtn.disabled}
                onClick={() => primaryBtn.onClick()}
                disableMinWidth={primaryBtn.disableMinWidth}
                data-test-id={`${dataTestId}-modal-primary-button`}
              >
                {primaryBtn.label}
              </Button>

              {secondaryBtn && (
                <Button
                  data-hj-ignore-attributes
                  secondary={true}
                  onClick={() => secondaryBtn.onClick()}
                  type={secondaryBtn.type}
                  icon={secondaryBtn.icon}
                  loading={secondaryBtn.loading}
                  disabled={secondaryBtn.disabled}
                  disableMinWidth={secondaryBtn.disableMinWidth}
                  data-test-id={`${dataTestId}-modal-secondary-button`}
                >
                  {secondaryBtn.label}
                </Button>
              )}
            </ModalFooter>
          )}
    </Modal>
  );
};
