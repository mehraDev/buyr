import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Label } from "./styles";

interface VegNonvegInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  required? : boolean
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Slider = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  width: 44px;
  height: 20px;
  background: ${(props) => (props.checked ? "#008905f0" : "#e30b0bea")};
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  outline: none;

  &::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 2.5px;
    left: 2.5px;
    background: white;
    transition: 0.2s;
  }

  &:checked::before {
    transform: translateX(25px);
  }
`;

const Value = styled.span`
  margin-left: 0.5rem;
`;

const VegNonvegInput: React.FC<VegNonvegInputProps> = ({
  value,
  onChange,
  label,
  required
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    onChange(newValue);
  };

  return (
    <InputWrapper>
    <Slider checked={value === undefined ? true : value} onChange={handleInputChange} />
    <Label>
      {value ? "veg" : "non-veg"}
      {true && '*'} 
    </Label>
    </InputWrapper>
  );
};

export default VegNonvegInput;
