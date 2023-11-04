import { IProductFood } from "app/interfaces";
import styled, { useTheme } from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";

export enum EItemCardFood {
  Card = "card",
  Strip = "strip",
  Preview = "preview",
  ImageOnly = "imageonly",
}
export interface IItemFoodCard {
  item: IProductFood;
  onPreview?: (item: IProductFood) => void;
  mode?: EItemCardFood;
}

const ItemFoodCard: React.FC<IItemFoodCard> = ({
  item,
  onPreview,
  mode = EItemCardFood.Strip,
}) => {
  const theme = useTheme();
  const handleItemPreview = () => {
    if (!onPreview) {
      console.warn("No Preview Handler Provided");
    }
    if (onPreview) {
      onPreview(item);
    }
  };
  const isRow = mode === EItemCardFood.Strip || mode === EItemCardFood.Preview;
  const fd = isRow ? "rr" : "c";
  const previewHandler =
    mode === EItemCardFood.Preview ? undefined : handleItemPreview;
  const detailsGap = isRow ? "0.5rem" : "0.5rem";
  return (
    <Box fd={fd} a="start" style={{ gap: isRow ? "1rem" : "" }}>
      {item.image ? (
        <Row w="80%" h="7rem">
          <Img
            onClick={previewHandler}
            src={item.image}
            style={{
              border: `1px solid ${theme.neutralColor.borderSecondary}`,
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            alt={item.name}
            br="0.5rem"
          />
        </Row>
      ) : null}

      <Col j="center" style={{ gap: detailsGap }}>
        <Row a="center">
          <Row
            w="initial"
            p="2px"
            a="center"
            style={{
              border: "1px solid " + (item.veg ? "green" : "#da0828"),
              borderRadius: "3px",
            }}
          >
            {item.veg ? <VegIcon /> : <NonVegIcon />}
          </Row>
        </Row>
        <Text
          tt="cap"
          onClick={previewHandler}
          w={6}
          s="14"
          c={theme.neutralColor.text}
          style={{ cursor: "pointer" }}
        >
          {item.name}
        </Text>
        <Text w={6} s="12" c={theme.neutralColor.textSecondary}>
          &#x20B9; {item.price}
        </Text>
        {item.description && (
          <Row>
            <Text s="12" w={5} c={theme.neutralColor.textTertiary}>
              {item.description}
            </Text>
          </Row>
        )}
      </Col>
    </Box>
  );
};

const VegIcon = styled.div`
  width: 6px;
  height: 6px;
  background: green;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NonVegIcon = styled.div`
  width: 6px;
  height: 6px;
  background: #da0828;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ItemFoodCard;
