import * as React from "react";

export interface IModalBody {
  id?: string;
  className?: string;
  dataTestId?: string;
}
export const ModalBody: React.FC<IModalBody> = ({
  children,
  className,
  dataTestId,
  ...rest
}) => {
  return (
    <div
      className={`${className || ""} lec-modal__body`}
      data-test-id={dataTestId && `${dataTestId}-modal-body`}
      {...rest}
    >
      {children}
    </div>
  );
};
