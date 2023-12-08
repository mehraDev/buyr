import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Backdrop } from "ui/Backdrop";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { Text, Col, Row, Box } from "ui/basic";

interface IMenuButton {
  categoryCounts: { [category: string]: number };
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const MenuButton: React.FC<IMenuButton> = ({
  activeCategory,
  categoryCounts,
  onCategoryClick,
}) => {
  const [isMenu, setIsMenu] = useState(false);
  const handleMenuClick = (category: string) => {
    setIsMenu(false);
    onCategoryClick(category);
  };
  const theme = useTheme(); // You may need to import useTheme from styled-components
  const topLevelCategories = Object.keys(categoryCounts).reduce(
    (acc, category) => {
      const topLevel = category.split("/")[0];
      acc[topLevel] = (acc[topLevel] || 0) + categoryCounts[category];
      return acc;
    },
    {} as { [category: string]: number }
  );
  return (
    <>
      <Button
        onClick={() => setIsMenu(!isMenu)}
        style={{
          boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, .13), 0 1px 1px 0 rgba(0, 0, 0, .11)",
        }}
      >
        <Text c={"#fff"} s="14" tt="cap" w={6}>
          Menu
        </Text>
        {/* <Icon
          name={IconName.}
          width={0.9}
          height={0.9}
          padding="0"
          color={theme.neutralColor.textSecondary}
          style={{ marginRight: "2px" }}
        /> */}
      </Button>
      {isMenu && (
        <Backdrop>
          <Col h="100%" p="4rem 2rem">
            <Col
              h="100%"
              p="2rem"
              style={{
                background: theme.neutralColor.bgContainer,
                boxShadow: theme.shadow.boxShadowSecondary,
                borderRadius: "6px",
              }}
            >
              <Text s="24" w={7} type="heading">
                Menu
              </Text>
              <Col style={{ overflow: "scroll" }} h="100%">
                {Object.entries(topLevelCategories).map(([category], index) => (
                  <Row
                    key={index}
                    p="1rem 0"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMenuClick(category)}
                  >
                    <Text
                      key={category}
                      tt="cap"
                      s="14"
                      w={6}
                      c={
                        activeCategory === category.toLowerCase() ||
                        (!activeCategory && index === 0)
                          ? theme.brandColor.primary
                          : theme.neutralColor.textSecondary
                      }
                    >
                      {category.split("_").join(" ")}
                    </Text>
                  </Row>
                ))}
              </Col>
            </Col>
          </Col>
        </Backdrop>
      )}
    </>
  );
};

export default MenuButton;
