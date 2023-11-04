import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";
import {
  faArrowUpFromBracket,
  faLeaf,
  faSortUp,
  faTimes,
  faSearch,
  faDiamond,
  faImage,
  faThLarge,
  faList,
  faPhone,
  faChevronLeft,
  faRing,
  faCircleExclamation,
  faGear,
  faHouse,
  faXmark,
  faBell,
  faArrowLeft,
  faArrowRight,
  faBars,
  faEllipsisVertical,
  faChevronDown,
  faChevronUp,
  faSortDown,
  faLocation,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export enum IconName {
  Search = "search",
  Clear = "clear",
  Notification = "notification",
  LeftArrow = "leftArrow",
  RightArrow = "rightArrow",
  Bars = "bars",
  Ellipsis = "ellipsis",
  ChevronDown = "chevronDown",
  ChevronUp = "chevronUp",
  Close = "faXmark",
  Home = "home",
  Setting = "setting",
  Alert = "alert",
  VegNonveg = "vegNonveg",
  GoBack = "goBack",
  Image = "image",
  Whatsapp = "whatsapp",
  Facebook = "facebook",
  Instagram = "instagram",
  Phone = "phone",
  Grid = "grid",
  List = "list",
  Diamond = "diamond",
  Download = "downlaod",
  Location = "location",
  DownArrow = "downArrow",
  UpArrow = "upArrow",
  Leaf = "leaf",
  Share = "share",
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
  image: faImage,
  whatsapp: faWhatsapp,
  facebook: faFacebook,
  instagram: faInstagram,
  phone: faPhone,
  grid: faThLarge,
  list: faList,
  diamond: faDiamond,
  downlaod: faDownload,
  location: faLocation,
  downArrow: faSortDown,
  clear: faTimes,
  search: faSearch,
  upArrow: faSortUp,
  leaf: faLeaf,
  share: faArrowUpFromBracket,
};

interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onClick?: () => void;
  isHoverable?: boolean;
  clickEffect?: boolean;
  padding?: string;
  style?: CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  name,
  className,
  color,
  width,
  height,
  borderRadius = 2.5,
  isHoverable = true,
  clickEffect = true,
  padding,
  style,
  onClick,
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
    width: width ? `${width}rem` : "",
    height: height ? `${height}rem` : "",
    borderRadius: `${borderRadius}rem`,
    cursor: isHoverable ? "pointer" : "default",
    background: isClicked && clickEffect ? "#04000008" : "",
    padding: padding ? padding : "4px",
    ...style,
  };
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={{ ...iconStyle }}
      onClick={() => handleClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default Icon;
