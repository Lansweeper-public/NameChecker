import * as React from "react";

export interface IModalFooter {
  className?: string;
  dataTestId?: string;
}

export const ModalFooter: React.FC<IModalFooter> = ({
  children,
  className,
  dataTestId,
}) => {
  return (
    <div
      className={`${className || ""} lec-modal__footer`}
      data-test-id={dataTestId && `${dataTestId}-modal-footer`}
    >
      {children}
    </div>
  );
};
