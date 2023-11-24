import React from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { IButton } from "ui/Button/Button";
import { InputSearch } from "ui/Form";
import HorizontalSlider from "ui/Scroller/HorizontalSlider/HorizontalSlider";
import { Sticky } from "ui/Sticky";
import { Col, Row, Text } from "ui/basic";

interface IMenuHeader {
  name?: string;
  onSearch?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  stickyPointHeader: number;
  categories: string[];
  activeCategoryIndex: number;
}
export const MENU_HEADER_HEIGHT = 50;
const MenuHeader: React.FC<IMenuHeader> = ({
  name,
  onSearch,
  containerRef,
  categories,
  activeCategoryIndex,
  stickyPointHeader,
}) => {
  const theme = useTheme();
  return (
    <Sticky
      at={stickyPointHeader}
      stickyStyle={{
        position: "fixed",
        zIndex: 1,
        opacity: 1,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease-in-out",
        display: "block",
      }}
      style={{
        display: "none",
      }}
      containerRef={containerRef}
    >
      <Row
        style={{
          zIndex: 1,
          background: theme.neutralColor.bgContainer,
        }}
        j="between"
        a="center"
      >
        <Sticky
          at={stickyPointHeader}
          stickyStyle={{
            opacity: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ opacity: 0, display: "none" }}
          containerRef={containerRef}
        >
          <Col
            style={{ position: "relative", gap: "0.5rem" }}
            p={"0.5rem 1rem"}
          >
            <Row onClick={onSearch}>
              <InputSearch
                value={""}
                placeholder={`Search in ${name}`}
                onChange={function (value: string): void {}}
                onClear={function (): void {}}
              />
            </Row>

            <HorizontalSlider activeChildIndex={activeCategoryIndex}>
              {/* <Row style={{ gap: "0.5rem" }}> */}
              {categories.map((category, index) =>
                index === activeCategoryIndex ? (
                  <ButtonSlider>
                    <Text tt="cap">{category}</Text>
                  </ButtonSlider>
                ) : (
                  <ButtonSlider
                    color={theme.neutralColor.textSecondary}
                    border="1px solid #d9d9e3"
                    variant="secondary"
                  >
                    <Text tt="cap">{category}</Text>
                  </ButtonSlider>
                )
              )}
              {/* </Row> */}
            </HorizontalSlider>
          </Col>
        </Sticky>
      </Row>
    </Sticky>
  );
};
interface IButtonSlider extends IButton {}

// const ButtonSlider: React.FC<IButtonSlider> = (props) => {
//   return <Button {...props} padding="0.25rem 0.5rem" />;
// };

const ButtonSlider = React.forwardRef<HTMLButtonElement, IButtonSlider>(
  (props, ref) => {
    return <Button ref={ref} {...props} padding="0.25rem 0.5rem" />;
  }
);

export default MenuHeader;
