import { IProductFood } from "app/interfaces";
import React, { useEffect, useState } from "react";
import styled, { useTheme, keyframes, css } from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";
import getImageUrl from "../../services/getImageUrl";
import { useSellerId } from "../../SellerIdContext";
interface IFoodItemCard {
  item: IProductFood;
}

const FoodItemCard: React.FC<IFoodItemCard> = ({ item }) => {
  const theme = useTheme();
  const sellerId = useSellerId();
  const [isLoading, setIsLoading] = useState(true);
  const [imageURL, setImageURL] = useState<string>("");
  useEffect(() => {
    const loadImageUrl = async () => {
      try {
        if (!item.image) {
          setIsLoading(false);
          return;
        }
        const url = await getImageUrl(item.image, "food", sellerId);
        setImageURL(url);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting image URL:", error);
        setIsLoading(false);
      }
    };

    loadImageUrl();
  }, [item]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageURL("");
    console.log("setting ");
  };

  return (
    <FoodWrapper key={item.id} p="0rem">
      {item.image !== undefined && (imageURL !== "" || isLoading) && (
        <Box j="center">
          <ImageContainer loading={isLoading}>
            <Img
              src={imageURL}
              alt={item.name}
              h="200px"
              br="6px 6px 0 0"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </ImageContainer>
        </Box>
      )}
      <Row j="end" p="0 0.5rem">
        <Row
          w="initial"
          p="3px"
          a="end"
          j="end"
          m="0.5rem 0 0.2rem"
          style={{ border: "1px solid green", borderRadius: "3px" }}
        >
          {item.veg ? <VegIcon /> : <NonVegIcon />}
        </Row>
      </Row>
      <Col j="between" p=" 0 0.5rem 1rem">
        <Text w={6} c={theme.neutralColor.text} mb="8px">
          {item.name}
        </Text>
        <Text w={5} c={theme.neutralColor.text}>
          &#x20B9; {item.price}
        </Text>
      </Col>
    </FoodWrapper>
  );
};

const FoodWrapper = styled(Col)`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: white;
  border-radius: 6px;
`;

const VegIcon = styled.div`
  width: 6px;
  height: 6px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: green;
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

const fadeInKeyframes = keyframes`
  0% {

    background: #dbdbdb88; /* Starting color */
  }
  50% {

    background: #dbdbdb6a; /* Mid-color */
  }
  100% {

    background: #bdbcbc42; /* Final color */
  }
`;

const fadeInAnimation = css`
  animation: ${fadeInKeyframes} 2s infinite;
`;

const ImageContainer = styled.div<{ loading: boolean }>`
  width: 100%;
  height: 200px;

  ${({ loading }) => loading && fadeInAnimation};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({ loading }) => (loading ? 0 : 1)};
  }
`;

export default FoodItemCard;
