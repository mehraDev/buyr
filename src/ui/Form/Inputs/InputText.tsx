import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";
import Error from "ui/Error";

interface IInputText extends IInput{
  value: string;
  onChange: (value:string) => void,
  borderColor?: string | undefined
  error? : string
}
const Input = styled.input<{ hasValue: boolean ,borderColor:string}>`
  color: ${({theme}) => theme.neutralColor.text};
  font-weight: 400;
  border-width: 1px;
  padding: 8px ;
  font-size: 1rem;
  width: 100%;
  
  border-color: ${({theme}) => theme.neutralColor.border};
  border-radius: 4px;
  border-style: solid;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus  {
    border-color:${({borderColor,theme}) => borderColor ? borderColor : theme.brandColor.primary};
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

const InputText: React.FC<IInputText> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  labelTop = true,
  borderColor = '',
  error
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper top={labelTop}>
      {label && 
        <Label top={labelTop} >
        {label}
        {required && '*'}
        </Label>}
        <div>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        hasValue={value !== ""}
        required={required}
        borderColor={borderColor}
      />
       {error && <Error>{error}</Error>}
       </div>
    </InputWrapper>
  );
};

export default InputText;
