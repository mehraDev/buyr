import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";
import theme from "ui/Utils/Media/Theme/theme";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  width?: string;
  padding?: string;
  margin?: string;
  color?: string;
  bg?: string;
  border?: string;
  br?: string;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      children,
      variant = "primary",
      size,
      color,
      bg,
      border,
      br,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <ButtonWrapper
        ref={ref}
        variant={variant}
        size={size}
        {...rest}
        color={color}
        bg={bg}
        border={border}
        br={br}
        disabled={disabled}
      >
        {children}
      </ButtonWrapper>
    );
  }
);
const ButtonWrapper = styled.button<IButton>`
  background-color: ${({ bg, variant, disabled }) =>
    disabled
      ? variant === "primary"
        ? theme.neutralColor.textTertiary
        : "transparent"
      : bg ||
        (variant === "primary" ? theme.brandColor.primary : "transparent")};

  color: ${({ color, variant, disabled }) => {
    if (color) {
      if (disabled && variant === "secondary") {
        return theme.neutralColor.textTertiary;
      } else {
        return color;
      }
    } else {
      return variant === "primary" ? "#ffffff" : theme.brandColor.primary;
    }
  }};

  border: ${({ color, border, variant, disabled }) => {
    if (border) {
      return border;
    } else if (variant === "primary") {
      return `1px solid ${theme.brandColor.primary}`;
    } else if (variant === "secondary") {
      if (disabled) {
        return `1px solid ${theme.neutralColor.textTertiary}`;
      } else if (color) {
        return `1px solid ${color}`;
      } else {
        return `1px solid ${theme.brandColor.primary}`;
      }
    } else {
      return disabled && variant === "secondary"
        ? `1px solid ${theme.neutralColor.text}`
        : `1px solid ${theme.brandColor.primary}`;
    }
  }};

  border-radius: ${({ br }) => br || "4px"};
  padding: ${({ padding }) => padding || "0.5rem 1rem"};

  ${(props) =>
    props.fullWidth &&
    `
    display: block;
    width: 100%;
  `}

  ${(props) => props.width && `width: ${props.width};`}

  ${(props) => props.padding && `padding: ${props.padding};`}

  ${(props) => props.margin && `margin: ${props.margin};`}

  font-size: ${(props) =>
    props.size === "small"
      ? "12px"
      : props.size === "medium"
      ? "14px"
      : props.size === "large"
      ? "16pxrem"
      : props.size};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ bg, variant, disabled }) => {
      if (disabled) {
        return variant === "secondary" ? "" : theme.neutralColor.textQuaternary;
      } else {
        return (
          bg ||
          (variant === "primary"
            ? theme.brandColor.primaryActive
            : variant === "secondary"
            ? ""
            : "#007aff")
        );
      }
    }};
  }

  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
`;

const ButtonUnderlined = styled(Button)`
  text-decoration: underline;
`;
export { ButtonUnderlined };
export default Button;
