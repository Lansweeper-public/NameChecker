import classnames from "classnames";
import * as React from "react";

export interface IUnderscoredTitle {
  className?: string;
  children: React.ReactNode;
  big?: boolean;
  alert?: boolean;
}

export const UnderscoredTitle: React.FC<IUnderscoredTitle> = ({
  children,
  className,
  big,
  alert,
  ...rest
}) => {
  const cn = classnames;
  return (
    <div
      className={cn(className, "lec-underscored-title", {
        "lec-underscored-title--big": big,
        "lec-underscored-title--alert": alert,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};
