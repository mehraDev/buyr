import styled from "styled-components";
import { IProduct } from "./interfaces/productInterface";
import shopList from "./shops/supportedShopsList";

export interface IViewer{
  products: IProduct[];
  shop: string;
}

const Viewer : React.FC<IViewer>= ({ products ,shop }) => {
  if (products.length === 0) {
    return (
      <EmptyProductsContainer>
        <EmptyProductsMessage>No products found.</EmptyProductsMessage>
        <button>Add Product</button>
        <button>Upload from File</button>
      </EmptyProductsContainer>
    );
  }
  
  const ShopViewer = shopList[shop]; 
  return (
    <StyledWrapper>
      <ShopViewer products={products}/>
    </StyledWrapper>
    )
  };

  export const StyledWrapper = styled.div`
    height: calc(100%);
    overflow: scroll;
    padding: 1rem;
    display: flex;
    gap: 2%;
    flex-wrap: wrap;
`;
const EmptyProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  text-align: center;
`;

const EmptyProductsMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;
  export default Viewer;