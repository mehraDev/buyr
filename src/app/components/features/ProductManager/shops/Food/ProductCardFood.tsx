import React from "react";
import {  IProductFood } from "../../interfaces/productInterface";
import Card from "ui/basic/Card";
import { Box, Img,Text } from "ui/basic";

interface IProductCardFood{
  product: IProductFood
}

const FOOD_DUMMY_PRODUCT_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/cloudyug-f2fe4.appspot.com/o/s%2Ffood%2Fp%2Fpizza-1684092131674?alt=media&token=ea09cca2-c93e-4437-abaa-a89eb74caab4'

const ProductCardFood: React.FC<IProductCardFood> = ({ product }) => {
  const { name, price } = product;
  return (
    <Card fd="row">
      <Box w="50%">
        <Img src={ FOOD_DUMMY_PRODUCT_IMAGE} alt={name} br={'12px'}/>
      </Box>
      <Box w="50%" p="1rem" fd="c">
        <Text s="16" w={6} c='#013f54' m={[0,0,1,0]}>{name}</Text>
        <Text w={6} c='#022b39'> &#8377; {`${price}`}</Text>
      </Box>
    </Card>
  );
};

export default ProductCardFood;
