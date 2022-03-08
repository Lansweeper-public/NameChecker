import React from "react";
import { Icon } from "../common/icon";

const defaultSize = 36;

export interface IAvatar {
  id?: string;
  size?: number;
  name?: string;
  alt?: string;
  image?: string;
  className?: string;
  mode?: "dark" | "color";
  overlay?: React.ReactNode;
}

const getColor = (name): string => {
  const colors = ["orange", "blue", "green"];
  const initialIndex = getInitials(name).charCodeAt(0) - 64 - 1;
  return colors[initialIndex % colors.length];
};
const getClassname = ({ className, name, profileImage, mode }): string => {
  let baseClass = "lec-avatar";
  if (className) baseClass += ` ${className}`;
  if (name && !profileImage) baseClass += " initials";
  if (mode) baseClass += ` lec-avatar--${mode}`;
  if (!profileImage && mode === "color") {
    baseClass += ` lec-avatar--${getColor(name)}`;
  }
  return baseClass;
};

const getSize = (size): string => (size ? `${size}px` : `${defaultSize}px`);

const getInitials = (name): string => name.substring(0, 1).toUpperCase();

const getContentSize = (size): string => {
  return size
    ? `${Math.round(size / 2)}px`
    : `${Math.round(defaultSize / 2)}px`;
};

const getContent = ({ profileImage, size, name, alt }): React.ReactNode => {
  if (profileImage) {
    return (
      <div className="img-container">
        <img className="img-avatar" src={profileImage} alt={alt} />
      </div>
    );
  }
  if (name) {
    return (
      <span className="initials" style={{ fontSize: getContentSize(size) }}>
        {getInitials(name)}
      </span>
    );
  }
  return <Icon icon="avatar" size={size || defaultSize} />;
};

export const Avatar: React.FC<IAvatar> = ({
  className,
  name = "",
  image,
  size,
  mode,
  overlay,
  alt,
  ...rest
}) => {
  const profileImage = image && image !== "null" ? image : undefined;

  return (
    <div
      className={getClassname({ className, name, profileImage, mode })}
      style={{ width: getSize(size), height: getSize(size) }}
      {...rest}
    >
      <div className="overlay">{overlay}</div>
      {getContent({ profileImage, size, name, alt })}
    </div>
  );
};
