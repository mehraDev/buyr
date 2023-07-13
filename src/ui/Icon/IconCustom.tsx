import React, { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";
import whatsapp from "../../assets/icons/whatsapp.png";
import instagram from "../../assets/icons/instagram.png";
import facebook from "../../assets/icons/facebook.png";

export enum IconCustomName {
  Whatsapp = "whatsapp",
  Instagram = "instagram",
  Facebook = "facebook",
}

interface Icons {
  [name: string]: string;
}

export const icons: Icons = {
  whatsapp: whatsapp,
  facebook: facebook,
  instagram: instagram,
};

interface IconProps {
  name: IconCustomName;
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onClick?: () => void;
  isHoverable?: boolean;
  clickEffect?: boolean;
  padding?: string;
}

const IconCustom: React.FC<IconProps> = ({
  name,
  className,
  color,
  width,
  height,
  borderRadius = 2.5,
  isHoverable = true,
  clickEffect = true,
  padding,
  onClick,
}) => {
  const [, setIsHovered] = useState(false);
  const iconPath = icons[name];
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      const timeout = setTimeout(() => {
        setIsClicked(false);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) {
      onClick();
    }
  };

  const iconStyle: CSSProperties = {
    color,
    width: width ? `${width}rem` : "",
    height: height ? `${height}rem` : "",
    borderRadius: `${borderRadius}rem`,
    cursor: isHoverable ? "pointer" : "default",
    background: isClicked && clickEffect ? "#04000008" : "",
    padding: padding ? padding : "4px",
  };

  return (
    <IconWrapper>
      <img
        src={iconPath}
        className={className}
        style={{ ...iconStyle }}
        alt={name}
        onClick={() => handleClick()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </IconWrapper>
  );
};

const IconWrapper = styled.div``;

export default IconCustom;
