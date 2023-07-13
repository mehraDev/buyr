import { IProductFood } from "app/interfaces";
import styled from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";

interface IFoodItemCard {
  item: IProductFood;
}

const FoodItemCard: React.FC<IFoodItemCard> = ({ item }) => {
  return (
    <FoodWrapper key={item.id} p="2">
      {item.image && (
        <Box j="center">
          <Img src={item.image || ""} alt={item.name} h="214px" br="6px" />
        </Box>
      )}
      <Row h="14px" a="start" m="0.5rem 0 0.2rem">
        {item.veg ? <VegIcon /> : <NonVegIcon />}
      </Row>
      <Col j="between">
        <Text w={5} c="black" mb="8px">
          {item.name}
        </Text>
        <Text>&#x20B9; {item.price}</Text>
      </Col>
    </FoodWrapper>
  );
};

const FoodWrapper = styled(Col)`
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: white;
  border-radius: 4px;
`;
const VegIcon = styled.div`
  width: 8px;
  height: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: green;
  border: 1px solid green;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NonVegIcon = styled.div`
  width: 8px;
  height: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: #da0828;
  border: 1px solid green;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FoodItemCard;
