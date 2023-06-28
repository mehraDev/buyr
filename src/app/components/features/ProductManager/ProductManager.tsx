import React, { useState, useEffect } from 'react';
import { IProduct } from './interfaces/productInterface';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';
import Viewer from './Viewer';
import AddProduct from './AddProduct';
import { getProducts } from './services';
import InitialMessage from './InitialMessage';
import { Box,Text } from 'ui/basic';

interface IMessage {
  onAdd: () => void;
  onUpload: () => void;
}
const Message: React.FC<IMessage> = ({onAdd, onUpload}) =>  (
  <Box fd="c" a="center" p="2rem 1rem">
     <Text mb="1rem" s="16" c="#868686">Let's add some items to your store</Text>
      <button onClick={() => onAdd()}>Add Product</button>
      <button onClick={() => onUpload()}>Upload from File</button>
  </Box>
)

const ProductManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [viewMode, setViewMode] = useState< 'list' | 'tile'>('tile');
  const [optionsList,setOptionsList] = useState(false);
  const [screen, setScreen] = useState<'add' | 'edit'  | 'upload' |  'viewer'>('viewer');

 

  const handleOptionClick = (action: 'add' | 'edit' | 'upload' | 'viewer') => {
    setTimeout(() => {
      setScreen(action);
      setOptionsList(!optionsList)
    },100)
  }
  
  const handleViewOptionClick = () => {
    setTimeout(() => {
      viewMode === 'list' ? setViewMode('tile') : setViewMode('list');
      setOptionsList(!optionsList)},
      100)
  }

  const handleGoBack = () => {
    setScreen('viewer');
    setOptionsList(false)
  }

  const openAddFormScreen = () => {
    setScreen('add');
  }

  const openUploadScreen = () => {
    setScreen('upload');
  }

  useEffect(() => {
    const loadFeatureData = async (): Promise<void> => {
      try {
        const response = await getProducts();
        setProducts(response);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error)
        setError(error.message);
        setIsLoading(false);
      }
    };
    loadFeatureData();
  }, []);
  
if (isLoading) {
    return <LoadingAnimation/>
  }

  if(!products.length && screen === 'viewer'){
    return <InitialMessage>
      <Message onAdd={openAddFormScreen} onUpload={openUploadScreen}/>
      </InitialMessage>
  }
    
  return (
    <StyledWrapper>
      <ControlsWrapper>
        <OptionsWrapper>
        <OptionIcon>
          <Icon name={IconName.Ellipsis} width={1.5} height={1.5} onClick={() => setOptionsList(!optionsList)} />
        </OptionIcon>
        {optionsList && 
          <OptionsList>
            <li onClick={() => handleOptionClick('add')}>Add Product</li>
            <li onClick={() => handleOptionClick('edit')}>Edit</li>
            {viewMode === 'list' ?
            <li onClick={() => handleViewOptionClick()}>Tile View</li>  :
            <li onClick={() => handleViewOptionClick()}>List View</li>
          }
          <li onClick={() => handleOptionClick('upload')}>Upload</li>
          </OptionsList>
        }
        </OptionsWrapper>
      </ControlsWrapper>
      {screen === 'viewer' && 
      <Viewer products={products} shop={'food'}/>
      }
      {screen === 'add' && <AddProduct shop={'food'} onClose={handleGoBack}/>}
    </StyledWrapper>
  )

};

export const StyledWrapper = styled.div`
`;
// export const FeatureHeader = styled.div`
//   font-weight: bold;
//   padding: 1rem;
//   font-family: 'Raleway';
//   color: rgba(59,69,78,1.00);
//   font-size: 1.5rem;
//   font-weight: 600;
//   line-height: 40px;

// `
export const ControlsWrapper = styled.div`
  width: 100%;
`;
export const OptionIcon = styled.div`
  
`;
export const OptionsWrapper = styled.div`
   right: 8px;
    top: -3rem;
    align-items: end;
    display: flex;
    flex-direction: column;
    z-index: 200;
    position: absolute;
    width: 70%;
`;
export const OptionsList = styled.ul`
  margin-right: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  padding: 1rem 0;
  width: 100%;
  background: white;
  box-shadow: ${({theme}) => theme.shadow.boxShadowSecondary};
  box-shadow: ${({theme}) => theme.neutralColor.border};
  li {
    padding: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover,
    &:active {
      background-color: lightgray;
    }
  }

`
export default ProductManager;
