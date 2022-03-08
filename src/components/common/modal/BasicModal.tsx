import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import cn from "classnames";
import * as React from "react";
import { Icon } from "../icon";

export interface IBasicModal {
  open: boolean;
  title?: string;
  alert?: boolean;
  dataTestId?: string;
  onClose: () => void;
}

export const BasicModal: React.FC<IBasicModal & ModalProps> = ({
  title,
  open,
  alert,
  onClose,
  closable = true,
  children,
  className,
  centered,
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
      {...rest}
      centered={centered === false ? false : true}
      wrapClassName={cn("lec-modal", className)}
      visible={open}
      footer={null}
      closable={false}
      wrapProps={customProps}
      onCancel={(e: React.MouseEvent<HTMLElement>) => {
        onClose();
        e.stopPropagation();
      }}
    >
      <div
        className="lec-modal__header"
        data-test-id={dataTestId && `${dataTestId}-modal-header`}
      >
        <h2
          className={cn("lec-modal__header__title", { alert })}
          data-test-id={dataTestId && `${dataTestId}-modal-title`}
        >
          {title}
        </h2>
        {closable && (
          <Icon
            icon="close"
            className="lec-modal__header__close-icon"
            data-test-id={dataTestId && `${dataTestId}-modal-close-button`}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              onClose();
              e.stopPropagation();
            }}
          />
        )}
      </div>

      {children}
    </Modal>
  );
};
