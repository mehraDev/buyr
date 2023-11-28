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
    <Row p={"0.5rem 1rem"}>
      <HorizontalSlider activeChildIndex={activeCategoryIndex}>
        {categories.map((category, index) =>
          index === activeCategoryIndex ? (
            <ButtonSlider
              br="16px"
              onClick={() => onClick(category)}
              key={index}
            >
              <Text tt="cap" s="14">
                {category}
              </Text>
            </ButtonSlider>
          ) : (
            <ButtonSlider
              key={index}
              color={theme.neutralColor.textSecondary}
              border="1px solid #d9d9e3"
              variant="secondary"
              br="16px"
              onClick={() => onClick(category)}
            >
              <Text tt="cap" s="14">
                {category}
              </Text>
            </ButtonSlider>
          )
        )}
      </HorizontalSlider>
    </Row>
  );
};

interface IButtonSlider extends IButton {}

const ButtonSlider = React.forwardRef<HTMLButtonElement, IButtonSlider>(
  (props, ref) => {
    return <Button ref={ref} {...props} padding="0.5rem 0.5rem" />;
  }
);

export default CategorySlider;
