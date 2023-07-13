import { Grid, Row, Text } from "ui/basic";
import FoodItemCard from "./FoodItemCard";
import Icon, { IconName } from "ui/Icon";
import { useTheme } from "styled-components";
import { IProductFood } from "app/interfaces";
import { useState } from "react";

interface ICategoryViewer {
  category: string;
  filteredProducts: IProductFood[];
  query: string;
}
const removeUnderscore = (name: string): string => {
  return name.replace(/_/g, " ");
};

const CategoryViewer: React.FC<ICategoryViewer> = ({
  category,
  filteredProducts,
  query,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/cloudyug-f2fe4.appspot.com/o/s%2Ffood%2Fusr%2FuLx3ycbLhwPgBlll2Ez9z1CE1I43%2Fp%2Fpastery-strawberry.jpg?alt=media&token=aeceb012-45c9-43d2-bc1b-2fc5c50dccc7";

  const items = filteredProducts.filter(
    (product) => product.category === category
  );
  if (!items || items.length === 0) {
    return null;
  }
  const categoryName = removeUnderscore(category);

  return (
    <>
      {(!query || query === "") && (
        <Row
          p="0.5rem 1rem"
          style={{ background: theme.neutralColor.bgContainer }}
          a="center"
          j="between"
          onClick={() => setExpanded(!expanded)}
        >
          <Text type="subheading" w={6} c={theme.neutralColor.text}>
            {categoryName}
          </Text>
          <Icon
            name={IconName.DownArrow}
            style={{
              transform: `rotate(${expanded ? "180deg" : "0deg"})`,
              transformOrigin: "center",
            }}
          />
        </Row>
      )}
      {expanded && (
        <Grid
          columns={2}
          mc={[0.5]}
          style={{ backgroundColor: "#f8f8f8" }}
          key={category}
        >
          {items.map((product) => (
            <FoodItemCard
              item={{ ...product, image: imageUrl }}
              key={product.id}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default CategoryViewer;
