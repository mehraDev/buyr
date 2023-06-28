import { useState } from "react";
import Form, { InputDescription, InputInteger, InputRadio, InputText } from "ui/Form";
import styled from "styled-components";
import InputImageButton from "ui/Form/Inputs/InputImage";
import ImageViewer from "ui/ImageViewer/ImageViewer";
// import ImageSearch from "ui/ImageSearch/ImageSearch";
import theme from "ui/Utils/Media/Theme/theme";
import addProduct from "../../services/addProduct";
import Popup from "ui/Popup";
import FoodCard from "./ProductCardFood";
import { sendMessageToServiceWorker } from "pwa/serviceWorkerRegistration";

const AddProductForm = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState<number  | undefined>(0);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState<string | 0>(0);
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = { action: 'customAction' };
    sendMessageToServiceWorker(message);
    
    if (!itemName) {
      setNameError('Please enter the product name.');
    console.log(isAdding)
    }
    if (!price) {
      setPriceError('Please enter the product price.');
    }
    if (!itemType) {
      setTypeError('Please select a product type.');
    }
  
    if (!itemName || !price || !itemType || nameError || priceError || typeError) {
      return;
    }
    
    setPreview(true);
  };
  const clearError = () => {
    setNameError('');
    setTypeError('');
    setPriceError('');
  }
  const handleName = (updatedName:string) => {
    setItemName(updatedName);
    clearError()
  }
  const handleAddProduct = async () => {
    try {
      setIsAdding(true);
      const success = await addProduct(itemName, parseFloat('price'));
  
      if (success) {
        setItemName("");
        setPrice(undefined);
        setImage(null);
        setDescription("");
        setItemType(0);

        clearError()
        alert("Product added successfully");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product");
    } finally {
      setIsAdding(false);
    }
  }
  const handlePrice = (updatedPrice:number) => {
    setPrice(updatedPrice);
    clearError()
  }
  const handleType = (updatedType:string) => {
    setItemType(updatedType);
    clearError()
  }
  return (
    <>
    <FoodForm onSubmit={handleSubmit} noValidate>
      <InputText
        label="Name"
        value={itemName}
        placeholder="Enter Product name"
        onChange={(updatedName) => handleName(updatedName)}
        required={true}
        borderColor={theme.brandColor.pink}
        error={nameError}
      />
      <InputInteger
        label="Price"
        required={true}
        width='220px'
        value={price}
        onChange={(updatedPrice) => handlePrice( updatedPrice)}
        borderColor={theme.brandColor.pink}
        error={priceError}
      />
      <InputRadio
      label="Type"
      options={[{label: 'Veg', value: 'veg'},{label: 'Non Veg', value:'nonVeg'}]}
      value={itemType}
        onChange={(val) => handleType( val)}
        required={true}
        error={typeError}
      />
      <ImageWrapper>
        <InputImageButton onChange={(s) => {setImage(s)}}/>
        {image && 
        <ImageViewerWrapper>
        <DescriptionText>Selected Image</DescriptionText>
        <ImageViewer images={[image]} width="150px" height="150px"/>
        </ImageViewerWrapper>
        }
      {/* {itemName && <>
        <p>Or select from below</p>
      <ImageSearch query={itemName} numResults={4} />
      </>
      } */}
      </ImageWrapper>
      <InputDescription
        value={description}
        onChange={(updatedDescription) => setDescription(updatedDescription)}
        label="Description"
        placeholder=""
      />
      <StyledButton type="submit">Preview Item</StyledButton>
    </FoodForm>
    <Popup title={'Item Preview'} onClose={() => setPreview(false)} isOpen={preview}>
    <FoodCard product={{ id: 1, name: itemName, price:price, description, image }}/>
    <StyledButton onClick={() => handleAddProduct()}>Add Product</StyledButton>
    </Popup>
    </>
  );
};

const FoodForm = styled(Form)`
  gap: 1.5rem;
`   

const StyledButton = styled.button`
  background-color: #e51579;
  color: #ffffff;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cf136e;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 33, 212, 0.3);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center ;
`

const ImageViewerWrapper = styled.div`
margin: 0.5rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const DescriptionText = styled.div`
  color: ${({theme}) => theme.neutralColor.textTertiary};
  font-size: ${({theme}) => theme.font.fontSizeSM};
  font-weight: 500;
  margin-bottom: 8px;
`
export default AddProductForm;

