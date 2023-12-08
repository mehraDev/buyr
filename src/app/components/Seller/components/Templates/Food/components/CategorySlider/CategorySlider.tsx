import React from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { IButton } from "ui/Button/Button";
import HorizontalSlider from "ui/Scroller/HorizontalSlider/HorizontalSlider";
import { Row, Text } from "ui/basic";

interface CategorySliderProps {
  categories: string[];
  activeCategoryIndex: number;
  onClick: (cat: string) => void;
}
const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  onClick,
  activeCategoryIndex,
}) => {
  const theme = useTheme();
  return (
    <HorizontalSlider activeChildIndex={activeCategoryIndex}>
      {categories.map((category, index) => (
        <ButtonSlider
          onClick={() => onClick(category)}
          key={index}
          variant={index === activeCategoryIndex ? "primary" : "secondary"}
          border="none"
          active={index === activeCategoryIndex}
        >
          <Text
            tt="cap"
            s="16"
            w={5}
            c={
              index === activeCategoryIndex
                ? "white"
                : theme.neutralColor.textSecondary
            }
          >
            {category}
          </Text>
        </ButtonSlider>
      ))}
    </HorizontalSlider>
  );
};

interface IButtonSlider extends IButton {
  active: boolean;
}

const ButtonSlider = React.forwardRef<HTMLButtonElement, IButtonSlider>(
  (props, ref) => {
    const theme = useTheme();
    return (
      <Button
        br="8px"
        ref={ref}
        {...props}
        style={{
          background: props.active ? theme.brandColor.primary : "#f5f5f5",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.079)",
        }}
        padding="0.25rem 0.5rem"
      />
    );
  }
);

export default CategorySlider;
