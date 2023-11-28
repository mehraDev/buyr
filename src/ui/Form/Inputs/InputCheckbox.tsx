import React from "react";
import styled, { useTheme } from "styled-components";
import { InputWrapper, Label } from "./styles";
import Error from "ui/Error";
import { Row } from "ui/basic";
import { IInput } from "./interface";

interface IInputCheckbox extends IInput {
  label?: string;
  options: {
    label: string;
    value: any;
    selected: boolean;
    colorActive?: string;
    colorDisabled?: string;
    icon?: (color: string) => JSX.Element;
  }[];
  onChange: (options: { label: string; selected: boolean }[]) => void;
  error?: string;
}

const CheckboxButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CheckboxOption = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.neutralColor.bgLayout};
  padding: 4px;
  transition: background-color 0.3s ease;

  &:checked {
    background-color: ${({ theme }) => theme.brandColor.primaryActive};
  }
`;

const CheckboxInputLabel = styled.label`
  display: inline-flex;
  margin-left: 0.5rem;
`;

const InputCheckbox: React.FC<IInputCheckbox> = ({
  label,
  options,
  onChange,
  labelTop = true,
  required = false,
  error,
}) => {
  const handleInputChange = (optionIndex: number) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].selected =
      !updatedOptions[optionIndex].selected;
    onChange(updatedOptions);
  };

  const theme = useTheme();

  return (
    <InputWrapper top={labelTop}>
      {label && (
        <Label top={labelTop}>
          {label}
          {required && <sup>*</sup>}
        </Label>
      )}
      <Row a="center">
        <CheckboxButtonWrapper>
          {options.map((option, index) => (
            <CheckboxOption key={option.value}>
              <CheckboxInput
                type="checkbox"
                name={option.value}
                checked={option.selected}
                onChange={() => handleInputChange(index)}
                required={required}
              />
              {option.icon &&
                option.icon(
                  option.selected
                    ? option.colorActive || theme.brandColor.primaryActive
                    : option.colorDisabled || theme.neutralColor.borderSecondary
                )}
              <CheckboxInputLabel onClick={() => handleInputChange(index)}>
                {option.label}
              </CheckboxInputLabel>
            </CheckboxOption>
          ))}
        </CheckboxButtonWrapper>
        {error && <Error>{error}</Error>}
      </Row>
    </InputWrapper>
  );
};

export default InputCheckbox;
