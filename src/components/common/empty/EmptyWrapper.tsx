import React from "react";
import { Empty } from "antd";
import classnames from "classnames";
import { Button } from "../button";

export interface IEmpty {
  image?: string;
  className?: string;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  renderButton?: boolean;
  disabledButton?: boolean;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText?: string | React.ReactNode;
  secondaryButton?: boolean;
  showImage?: boolean;
  dataTestId?: string;
}

export const EmptyWrapper: React.FC<IEmpty> = ({
  image,
  className,
  title,
  subTitle,
  renderButton,
  disabledButton,
  onButtonClick,
  buttonText,
  secondaryButton,
  showImage = true,
  dataTestId,
}) => {
  const imageComponent: React.ReactNode = !showImage ? null : image ? (
    <img
      src={`/assets/svg/${image}.svg`}
      width={120}
      height={120}
      alt="Empty"
    />
  ) : (
    Empty.PRESENTED_IMAGE_SIMPLE
  );
  return (
    <Empty
      className={classnames("lec-empty", className)}
      image={imageComponent}
      description=""
    >
      <div className="lec-empty-title">{title || "Oops!"}</div>
      <div className="lec-empty-subtitle">{subTitle || "No Data"}</div>
      {renderButton && (
        <Button
          onClick={onButtonClick}
          className="lec-empty-button"
          secondary={secondaryButton}
          disabled={disabledButton}
          data-test-id={dataTestId}
        >
          {buttonText}
        </Button>
      )}
    </Empty>
  );
};
