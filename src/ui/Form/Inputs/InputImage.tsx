import React,{ useRef } from "react";
import styled from "styled-components";
import Icon, { IconName } from "ui/Icon";
import resizeImage from "ui/Utils/Media/imageResizer";

interface IInputImageButton{
  onChange: (file: File | null) => void;
  width? : string;
}

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color:#e51579;
  color: #fff;
  width: fit-content;
`;

const InputImageButton : React.FC<IInputImageButton> = ({ 
  onChange ,
  width
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (event:any) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     onChange(file);
  //   } else {
  //     onChange(null);
  //   }
  // };

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
  
    if (file) {
      try {
        console.log('sdsdsd')
        const resizedImage = await resizeImage(file, 200, 200);
        onChange(resizedImage as File);
        console.log('sdsdsd')
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  };
  return (
    <>
      <Button onClick={(e ) => handleButtonClick(e)}>
        <Icon name={IconName.Image} width={1} height={1} color="white"/>
          Upload Image
      </Button>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default InputImageButton;
