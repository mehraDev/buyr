import { IProductFood, IVariant } from "app/interfaces/Shop/product";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { Row, Text } from "ui/basic";
import { useFoodCart } from "./FoodCartContext";
import { useAuth } from "app/contexts/auth/useAuth";

interface CartItemUpdateButtonProps {
  item: IProductFood;
  variant?: IVariant;
  openVariantSelector?: () => void;
}

const CartItemUpdateButton: React.FC<CartItemUpdateButtonProps> = ({
  item,
  variant,
  openVariantSelector = () => {},
}) => {
  const theme = useTheme();
  const [count, setCount] = useState(0);
  const { isAuthenticated, checkAuthAndShowModal } = useAuth();
  const {
    getItemTotal,
    getItemTotalByVariant,
    addItemCart,
    incrementCartItem,
    decrementCartItem,
  } = useFoodCart();
  useEffect(() => {
    const itemTotal = variant
      ? getItemTotalByVariant(item.id, variant.variantId)
      : getItemTotal(item.id);
    setCount(itemTotal);
  }, [getItemTotal, getItemTotalByVariant, item.id, variant]);

  const bg = count ? "" : theme.brandColor.primaryBg;

  const handleAdd = () => {
    if (isAuthenticated) {
      const hasMultipleVariants = item.variants && item.variants.length > 1;
      const defaultVariant = item.variants ? item.variants[0] : undefined;

      if (hasMultipleVariants) {
        if (!variant) {
          openVariantSelector();
        } else {
          addItemCart(item, variant);
        }
      } else {
        addItemCart(item, defaultVariant);
      }
    } else {
      checkAuthAndShowModal();
    }
  };

  const handleIncrement = () => {
    const hasMultipleVariants = item.variants && item.variants.length > 1;
    const defaultVariant = item.variants ? item.variants[0] : undefined;
    if (hasMultipleVariants) {
      if (!variant) {
        openVariantSelector();
      } else {
        incrementCartItem(item.id, variant.variantId);
      }
    } else {
      incrementCartItem(item.id, defaultVariant?.variantId);
    }
  };

  const handleDecrement = () => {
    const hasMultipleVariants = item.variants && item.variants.length > 1;
    const defaultVariant = item.variants ? item.variants[0] : undefined;
    if (hasMultipleVariants) {
      if (!variant) {
        openVariantSelector();
      } else {
        decrementCartItem(item.id, variant.variantId);
      }
    } else {
      decrementCartItem(item.id, defaultVariant?.variantId);
    }
  };

  if (!count) {
    return (
      <Button
        width="100%"
        variant={count ? "primary" : "secondary"}
        bg={bg}
        padding="0"
      >
        <Row p="0.75rem 1rem" j="center" onClick={handleAdd}>
          <Text s="16">ADD</Text>
        </Row>
      </Button>
    );
  }
  return (
    <Button
      width="100%"
      variant={count ? "primary" : "secondary"}
      bg={bg}
      padding="0"
    >
      <Row a="center" j="between">
        <Row p="0.75rem 1rem" onClick={handleDecrement} j="center">
          <Text s="16">-</Text>
        </Row>
        <Text s="16">{count}</Text>
        <Row p="0.75rem 1rem" onClick={handleIncrement} j="center">
          <Text s="16">+</Text>
        </Row>
      </Row>
    </Button>
  );
};

export default CartItemUpdateButton;
