import React, { ChangeEvent } from "react";
import styled, { useTheme } from "styled-components";
import { InputWrapper, Label } from "./styles";
import Error from "ui/Error";
import { Row } from "ui/basic";

interface IInputPhoneNumber {
  value: string | undefined;
  onChange: (value: string) => void;
  width?: string;
  borderColor?: string;
  error?: string;
  label?: string;
  required?: boolean;
  labelTop?: boolean;
  placeholder?: string;
}

const PhoneNumberWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CountryCode = styled.span``;

const Input = styled.input<{ borderColor: string }>`
  color: ${({ theme }) => theme.neutralColor.text};
  font-weight: 400;
  border-width: 1px;
  padding: 8px;
  font-size: 1rem;
  border-color: ${({ theme }) => theme.neutralColor.border};
  transition: border-color 0.3s ease;
  width: ${({ width }) => (width ? width : "")};
  border-radius: "0px 4px 4px 0px";
  border-style: solid;
  &:focus {
    border-color: ${({ borderColor, theme }) =>
      borderColor ? borderColor : theme.brandColor.primary};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  &:active {
    outline: none;
    border-color: ${({ borderColor, theme }) =>
      borderColor ? borderColor : theme.brandColor.primary};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const InputPhoneNumber: React.FC<IInputPhoneNumber> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  labelTop = true,
  width,
  borderColor = "",
  error,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Ensure that the input is numeric and doesn't exceed 10 digits
    if (/^\d{0,10}$/.test(inputValue)) {
      onChange(inputValue);
    }
  };
  const theme = useTheme();
  return (
    <InputWrapper top={labelTop}>
      {label && (
        <Label top={labelTop}>
          {label}
          {required && "*"}
        </Label>
      )}
      <PhoneNumberWrapper>
        <Row
          a="center"
          j="between"
          w="initial"
          style={{ borderRadius: "4px 0px 0px 4px" }}
          //   bg={theme.neutralColor.textQuaternary}
          h="100%"
          p={"0.25rem 0.5rem"}
        >
          <CountryCode>+91</CountryCode>
        </Row>
        <Input
          type="tel"
          value={value}
          onChange={handleInputChange}
          required={required}
          placeholder={placeholder ? placeholder : "1234567890"}
          width={width}
          maxLength={10}
          borderColor={borderColor}
        />
      </PhoneNumberWrapper>
      {error && <Error>{error}</Error>}
    </InputWrapper>
  );
};

export default InputPhoneNumber;
