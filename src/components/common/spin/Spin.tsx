import React, { CSSProperties } from "react";

export interface ISpin {
  className?: string;
  style?: CSSProperties;
  type: "ellipsis" | "circle";
}

export const Spin: React.FC<ISpin> = ({ type, style, className, ...rest }) => {
  const getClassName = (): string => {
    let baseClass = `lec-spin lec-spin-${type}`;
    if (className) baseClass += ` ${className}`;
    return baseClass;
  };

  const getSpinnerContent = (): React.ReactElement => {
    if (type === "ellipsis" || type === "circle") {
      return (
        <>
          <div />
          <div />
          <div />
          <div />
        </>
      );
    }

    return <></>;
  };

  return (
    <div className={getClassName()} style={style} {...rest}>
      {getSpinnerContent()}
    </div>
  );
};
