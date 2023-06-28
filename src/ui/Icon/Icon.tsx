import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";
import { faImage,faChevronLeft,faRing,faCircleExclamation,faGear,faHouse,faXmark,faBell, faArrowLeft, faArrowRight,faBars,faEllipsisVertical,faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";


export enum IconName {
  Notification = 'notification',
  LeftArrow = 'leftArrow',
  RightArrow = 'rightArrow',
  Bars = 'bars',
  Ellipsis = 'ellipsis',
  ChevronDown = 'chevronDown',
  ChevronUp = 'chevronUp',
  Close = 'faXmark',
  Home = 'home',
  Setting = 'setting',
  Alert = 'alert',
  VegNonveg = 'vegNonveg',
  GoBack = 'goBack',
  Image = 'image'
}

interface Icons {
  [name: string]: any;
}

export const icons: Icons = {
  notification: faBell,
  leftArrow: faArrowLeft,
  rightArrow: faArrowRight,
  bars: faBars,
  ellipsis: faEllipsisVertical,
  chevronDown: faChevronDown,
  chevronUp: faChevronUp,
  faXmark: faXmark,
  home: faHouse,
  setting: faGear,
  alert: faCircleExclamation,
  vegNonveg: faRing,
  goBack: faChevronLeft,
  image: faImage
};


interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onClick? : () => void,
  isHoverable? : boolean,
  clickEffect? : boolean
}

const Icon: React.FC<IconProps> = ({
  name,
  className,
  color,
  width ,
  height ,
  borderRadius = 2.5,
  isHoverable = true,
  clickEffect = true,
  onClick
}) => {
  const [, setIsHovered] = useState(false);
  const icon = icons[name];
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
    width: width ? `${width}rem` : '',
    height:  height ? `${height}rem`: '',
    borderRadius: `${borderRadius}rem`,
    cursor: isHoverable ? 'pointer' : 'default',
    background: (isClicked && clickEffect) ? '#04000008' : '',
    padding: '4px',
  };
  return (
<IconWrapper>
<FontAwesomeIcon
      icon={icon}
      className={className}
      style={{ ...iconStyle}}
      onClick={() => handleClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
</IconWrapper>
   

    
  );
};

const IconWrapper = styled.div`
`;
export default Icon;
