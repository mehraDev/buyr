import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';

const Food = lazy(() => import('./shops/Food/AddProductForm'));

interface IAddProduct {
  shop: string,
  onClose: () => void
}
const AddProduct: React.FC<IAddProduct> = ({ shop ,onClose}) => {
  let Form: React.ComponentType<any> | null = null;
  const Loading = () => <div>Loading...</div>;
  const Error = () => <div>Shop Does'nt have Add Product Form...</div>;

  switch (shop) {
    case 'food':
      Form = Food;
      break;
    default:
      break;
  }

  return (
    <StyledWrapper>
      <Header color='#d82b7e'>
        <h3>Add Product</h3>
        <Icon name={IconName.Close} onClick={() => onClose()}/>
      </Header>
      {Form ? (<Suspense fallback={<Loading/>}>
          <Form />
        </Suspense>)
        :(<Error/>)
        }
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  color: ${({theme }) => theme.neutralColor.textSecondary};
  margin: 1rem;
  border-radius: 6px;
  padding: 2rem 1.5rem;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.2); /* Adjust the shadow values to your preference */
`;

interface IStyledHeader{
  color: string
}
const Header = styled.div<IStyledHeader>`
  display: flex;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  color: ${({color}) => color ? color : ''};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 16px;
`;
export default AddProduct;
