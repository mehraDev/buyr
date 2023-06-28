import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";

interface IInputDescription extends IInput{
  value: string;
  onChange: (value: string) => void;
}
const TextArea = styled.textarea`
  height: 100px;
  font-size: 1rem;
  border-width : 1px;
  padding: 12px;
  border-color: ${({theme}) => theme.neutralColor.border};
  border-radius: 4px;
  transition: border-bottom-color 0.3s ease;
  outline: none;
  color: ${({theme}) => theme.neutralColor.text};
  font-weight: 400;
  &:focus {
    border-color:${({theme}) => theme.brandColor.pink};
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  &:active {
    outline: none;
    border-color:${({theme}) => theme.brandColor.pink};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

`;

const InputDescription: React.FC<IInputDescription> = ({
  value,
  onChange,
  label,
  placeholder,
  required,
  labelTop = true
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper top={labelTop}>
        {label && 
          <Label top={labelTop}>
          {label}
          {required && '*'}
          </Label>}
      <TextArea
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default InputDescription;
