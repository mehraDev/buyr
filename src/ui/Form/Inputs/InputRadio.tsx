import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";
import Error from "ui/Error";
interface IInputRadio extends IInput {
    label?: string
    options: { label: string; value: any }[];
  onChange: (value: any) => void;
  error? : string
}

const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

const RadioButtonOption = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
`;

// const RadioButtonInput = styled.input`

//     appearance: none;
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     background-color: ${({theme}) => theme.brandColor.pinkActive};
//   margin: 0px;
// `;
const RadioButtonInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.brandColor.pinkBg};
  margin: 0;
  padding: 4px; /* Add padding to create spacing around the input */
  transition: background-color 0.3s ease;

  &:checked {
    background-color: ${({ theme }) => theme.brandColor.pink};
  }
`;

const RadioButtonInputLabel = styled.label`display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-bottom: 4px;
`;



const InputRadio: React.FC<IInputRadio> = ({
  label,
  options,
  value,
  onChange,
  labelTop = true,
  required = false,
  error
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    onChange(selectedOption);
  };

  return (
    <InputWrapper top={labelTop}>
      {label && 
        <Label top={labelTop}>
        {label}
        {required && <sup>*</sup>}
        </Label>}
        <div>
      <RadioButtonWrapper>
        {options.map((option) => (
          <RadioButtonOption key={option.value}>
            
            <RadioButtonInput
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={handleInputChange}
              required={required}
            />
            
            
            {/* <RadioButtonIcon checked={value === option.value} /> */}
            <RadioButtonInputLabel>{option.label}</RadioButtonInputLabel>
          </RadioButtonOption>
        ))}
      </RadioButtonWrapper>
      {error && <Error>{error}</Error>}
       </div>
    </InputWrapper>
  );
};

export default InputRadio;
