import React, { ChangeEvent, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";

import { Box, Col, Row, Text } from "ui/basic";
import Icon, { IconName } from "ui/Icon";

interface IInputPassword extends IInput {
  value: string;
  onChange: (value: string) => void;
  borderColor?: string | undefined;
  error?: string;
  onBlur?: () => void;
  disabled?: boolean;
  onClick?: () => void;
  tt?: "upp" | "cap";
  type?: "current" | "new";
}
const Input = styled.input<{
  hasValue: boolean;
  borderColor: string;
  tt?: "upp" | "cap";
  error: boolean;
}>`
  color: ${({ theme }) => theme.neutralColor.text};
  font-weight: 400;
  border-width: 1px;
  padding: 8px;
  font-size: 1rem;
  width: 100%;
  text-transform: ${({ tt }) =>
    tt ? (tt === "upp" ? "uppercase" : tt === "cap" ? "capitalize" : "") : ""};
  border-color: ${({ theme, error }) =>
    error ? theme.errorColor.errorBorder : theme.neutralColor.border};
  border-radius: 4px;
  border-style: solid;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: ${({ borderColor, theme }) =>
      borderColor ? borderColor : theme.brandColor.primary};
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  ${({ theme, disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      background-color: ${theme.neutralColor
        .fillQuaternary}; /* Use your desired color */
      color: ${theme.neutralColor.textTertiary}; /* Use your desired color */
      cursor: not-allowed;
    `}
`;

const InputPassword: React.FC<IInputPassword> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  labelTop = true,
  borderColor = "",
  error,
  onBlur,
  disabled,
  onClick,
  tt,
  type = "current",
}) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOnBlur = () => {
    setShowPassword(false);
    if (onBlur) {
      onBlur();
    }
  };
  return (
    <InputWrapper top={labelTop}>
      <Col>
        {label && (
          <Label top={labelTop}>
            {label}
            {required && "*"}
          </Label>
        )}
        <Box style={{ position: "relative" }} onBlur={handleOnBlur}>
          <Input
            error={error ? true : false}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            hasValue={value !== ""}
            required={required}
            borderColor={borderColor}
            autoComplete={type === "new" ? "new-password" : "current-password"}
            disabled={disabled}
            onClick={onClick}
            tt={tt}
          />
          {value !== "" && (
            <Row
              onClick={togglePasswordVisibility}
              style={{ position: "absolute", right: "0", bottom: "0" }}
              w="initial"
              p={"0.5rem"}
            >
              <Icon
                onBlur={handleOnBlur}
                width={0.8}
                height={0.8}
                color={"#b4b3b3"}
                name={showPassword ? IconName.PassShow : IconName.PassHide}
              />
            </Row>
          )}
        </Box>
        <Row style={{ position: "relative" }}>
          {error && (
            <Row a="center" style={{ position: "absolute" }}>
              <Icon
                name={IconName.Alert}
                color={theme.errorColor.errorText}
                height={0.8}
                width={0.8}
                isHoverable={false}
              />
              <Text s="12" w={5} c={theme.errorColor.errorText}>
                {error}
              </Text>
            </Row>
          )}
        </Row>
      </Col>
    </InputWrapper>
  );
};

export default InputPassword;
