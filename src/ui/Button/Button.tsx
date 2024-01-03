import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";
import LoadingAnimation from "ui/LoadingAnimation/LoadingAnimation";
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
  loading?: boolean;
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
      loading = false,
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
        {loading && (
          <LoadingIcon
            iconType={true}
            p="0"
            width="1rem"
            height="1rem"
            bw="2px"
          />
        )}
      </ButtonWrapper>
    );
  }
);
const ButtonWrapper = styled.button<IButton>`
  background-color: ${({ bg, variant, disabled }) => {
    if (disabled) return theme.neutralColor.textTertiary;
    if (bg) return bg;
    if (variant === "primary") return theme.brandColor.primary;
    if (variant === "secondary") return theme.neutralColor.bgContainer;
  }};
  // disabled
  //   ? variant === "primary"
  //     ? theme.neutralColor.textTertiary
  //     : "transparent"
  //   : bg ||
  //     (variant === "primary" ? theme.brandColor.primary : "transparent")};

  color: ${({ color, variant, disabled }) => {
    if (disabled) return theme.neutralColor.textTertiary;
    if (color) return color;
    if (variant === "primary") return "#ffffff";
    if (variant === "secondary") return theme.brandColor.primary;
  }};

  border: ${({ color, border, variant, disabled }) => {
    if (border) {
      return border;
    } else if (variant === "primary") {
      return "none";
    } else if (variant === "secondary") {
      if (disabled) {
        return `1px solid ${theme.neutralColor.textTertiary}`;
      } else if (color) {
        return `1px solid ${color}`;
      } else {
        return "none";
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
  box-shadow: "0 0 2px #000000e";
`;

const ButtonUnderlined = styled(Button)`
  text-decoration: underline;
`;

const LoadingIcon = styled(LoadingAnimation)``;

export { ButtonUnderlined };
export default Button;
