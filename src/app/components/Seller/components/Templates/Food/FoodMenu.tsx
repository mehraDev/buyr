import { Text, Col, Row } from "ui/basic";
import CategoryViewer from "./CategoryViewer";
import { useTheme } from "styled-components";
import { IProductFood } from "app/interfaces";
import React from "react";
import Icon, { IconName } from "ui/Icon";

interface IFoodMenu {
  products: IProductFood[];
  scrollContainer?: React.RefObject<HTMLDivElement>;
  onCategoryPositionsUpdate: (category: string, postion: number) => void;
  onSearch: () => void;
}

const FoodMenu: React.FC<IFoodMenu> = ({
  products,
  scrollContainer,
  onCategoryPositionsUpdate,
  onSearch,
}) => {
  const theme = useTheme();
  const filterProducts = products.filter((product) => product);

  const categoryCounts: { [category: string]: number } = {};
  products.forEach((product) => {
    if (product.category) {
      let cat;
      if (typeof product.category === "string") {
        cat = product.category;
      } else {
        cat = product.category[0];
      }
      if (categoryCounts[cat]) {
        categoryCounts[cat]++;
      } else {
        categoryCounts[cat] = 1;
      }
    } else {
      if (categoryCounts["Others"]) {
        categoryCounts["Others"]++;
      } else {
        categoryCounts["Others"] = 1;
      }
    }
  });

  return (
    <Col p={"1rem"}>
      <Col
        p={"0rem 0rem 5rem"}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.069) 0px 1px 4px",
          gap: "1px",
        }}
      >
        <Row
          p="1rem"
          a="center"
          style={{
            borderRadius: "8px 8px 0 0",
            background: theme.neutralColor.bgContainer,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
          }}
          j="between"
        >
          <Text s="16" w={6} c={theme.neutralColor.text}>
            Menu
          </Text>
          <Row w="initial">
            <Icon
              name={IconName.Search}
              onClick={() => onSearch()}
              borderRadius={0}
              color="#ffb7bd"
            />
          </Row>
        </Row>
        <CategoryViewer
          scrollContainer={scrollContainer}
          products={filterProducts}
          onCategoryPositionsUpdate={onCategoryPositionsUpdate}
        />
      </Col>
    </Col>
  );
};

export default React.memo(FoodMenu);
