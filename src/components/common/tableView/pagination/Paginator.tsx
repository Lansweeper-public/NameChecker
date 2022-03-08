import * as React from "react";

import { Icon } from "../../icon";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination/Pagination";

const PaginationIcon: PaginationProps["itemRender"] = (
  num,
  type,
  originalElement,
): React.ReactNode => {
  switch (type) {
    case "prev":
      return <Icon icon="arrow-left" />;
    case "next":
      return <Icon icon="arrow-right" />;
    case "page":
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a style={{ width: `${num.toString().length * 8 + 16}px` }}>{num}</a>
      );
    default:
      return originalElement;
  }
};

export const Paginator: React.FC<PaginationProps> = ({
  itemRender,
  className,
  ...rest
}) => {
  return (
    <Pagination
      showLessItems={true}
      {...rest}
      className={`${className} lec-paginator`}
      itemRender={PaginationIcon}
    />
  );
};
