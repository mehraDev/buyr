import React from "react";
import styled from "styled-components";
import { Box, Text } from "ui/basic";

interface IProductWidgetProps {
  products?: Array<{ id: string; name: string }>;
  onAddProduct?: () => void;
}

const ProductWidgetContainer = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
`;

const ProductWidgetHeading = styled(Text)`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProductList = styled(Box)`
  margin-top: 1rem;
`;

const ProductItem = styled(Box)`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const AddProductButton = styled.button`
  background-color: #013f54;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const ProductWidget: React.FC<IProductWidgetProps> = ({
  products = [],
  onAddProduct = () => {},
}) => {
  return (
    <ProductWidgetContainer>
      <ProductWidgetHeading>Products</ProductWidgetHeading>
      <ProductList>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product.id}>
              <Text>{product.name}</Text>
            </ProductItem>
          ))
        ) : (
          <Text>No Products Found</Text>
        )}
      </ProductList>
      {products.length === 0 && (
        <AddProductButton onClick={onAddProduct}>Add Product</AddProductButton>
      )}
    </ProductWidgetContainer>
  );
};

export default ProductWidget;
