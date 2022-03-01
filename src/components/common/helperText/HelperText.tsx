import React from "react";

export const HelperText: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => (
  <p className={`${className} lec-form-control__helper-text`} {...rest}>
    {children}
  </p>
);
