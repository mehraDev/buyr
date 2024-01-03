import { IProductFood } from "app/interfaces";
import { IVariant } from "app/interfaces/Shop/product";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  sellerId: string | null;
  items: CartItem[];
}

interface FoodCartProviderProps {
  children: React.ReactNode;
  sellerId: string;
}
interface FoodCartContextValue {
  cart: Cart;
  addItemCart: (item: IProductFood, variant?: IVariant) => void;
  removeCartItem: (itemId: string) => void;
  clearCart: () => void;
  getItemTotalByVariant: (itemId: string, variantID: string) => number;
  getItemTotal: (itemId: string) => number;
  incrementCartItem: (itemId: string, variantId?: string) => void;
  decrementCartItem: (itemId: string, variantId?: string) => void;
}

const FoodCartContext = createContext<FoodCartContextValue>({
  cart: { sellerId: null, items: [] },
  addItemCart: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
  getItemTotalByVariant: () => 0,
  getItemTotal: () => 0,
  decrementCartItem: () => {},
  incrementCartItem: () => {},
});

export const FoodCartProvider: React.FC<FoodCartProviderProps> = ({
  children,
  sellerId,
}) => {
  const [cart, setCart] = useState<Cart>(() => {
    const storedCart = localStorage.getItem("foodCart");
    return storedCart ? JSON.parse(storedCart) : { sellerId, items: [] };
  });

  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cart));
  }, [cart]);

  const validateItem = (item: IProductFood, variant?: IVariant) => {
    if (item.variants && !variant) {
      throw new Error(
        "Variant ID and price are required when a variant is provided."
      );
    } else {
      if (!item.price || !item.id) {
        throw new Error(
          "Item ID and price are required when no variant is provided."
        );
      }
    }
  };

  const createCartItem = (item: IProductFood, variant?: IVariant): CartItem => {
    validateItem(item, variant);
    if (variant) {
      return {
        id: `${item.id}-${variant.variantId}`,
        name: `${item.name} - ${variant.name}`,
        price: variant.price,
        quantity: 1,
      };
    } else {
      return {
        id: `${item.id}`,
        name: item.name,
        price: item.price || 0,
        quantity: 1,
      };
    }
  };

  const addOrUpdateCartItem = (newItem: CartItem, prevCart: Cart) => {
    const existingItem = prevCart.items.find(
      (cartItem) => cartItem.id === newItem.id
    );

    if (existingItem) {
      return {
        ...prevCart,
        items: prevCart.items.map((cartItem) =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };
    } else {
      return {
        ...prevCart,
        items: [...prevCart.items, newItem],
      };
    }
  };

  const addItemCart = (item: IProductFood, variant?: IVariant) => {
    if (cart.sellerId !== sellerId) {
      clearCart();
    }
    validateItem(item, variant);
    const newItem = createCartItem(item, variant);
    setCart((prevCart) => addOrUpdateCartItem(newItem, prevCart));
  };

  const incrementCartItem = (itemId: string, variantId?: string) => {
    const targetId = variantId ? `${itemId}-${variantId}` : itemId;

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item
      );

      return { ...prevCart, items: updatedItems };
    });
  };

  const decrementCartItem = (itemId: string, variantId?: string) => {
    const targetId = variantId ? `${itemId}-${variantId}` : itemId;

    setCart((prevCart) => {
      const itemIndex = prevCart.items.findIndex(
        (item) => item.id === targetId
      );

      if (itemIndex > -1) {
        const item = prevCart.items[itemIndex];
        if (item.quantity > 1) {
          const updatedItems = [...prevCart.items];
          updatedItems[itemIndex] = { ...item, quantity: item.quantity - 1 };
          return { ...prevCart, items: updatedItems };
        } else {
          const updatedItems = prevCart.items.filter(
            (item) => item.id !== targetId
          );
          return { ...prevCart, items: updatedItems };
        }
      }
      return prevCart;
    });
  };

  const removeCartItem = (itemId: string) => {
    setCart({
      ...cart,
      items: cart.items.filter((item) => item.id !== itemId),
    });
  };

  const getItemTotalByVariant = (itemId: string, variantId: string) => {
    const searchId = `${itemId}-${variantId}`;
    const itemWithId = cart.items.find((item) => item.id === searchId);
    return itemWithId ? itemWithId.quantity : 0;
  };

  const getItemTotal = (itemId: string) => {
    let totalCount = 0;
    cart.items.forEach((item) => {
      if (item.id.startsWith(itemId)) {
        totalCount += item.quantity;
      }
    });
    return totalCount;
  };

  const clearCart = () => {
    setCart({ sellerId, items: [] });
  };

  return (
    <FoodCartContext.Provider
      value={{
        cart,
        addItemCart,
        removeCartItem,
        clearCart,
        getItemTotalByVariant,
        getItemTotal,
        incrementCartItem,
        decrementCartItem,
      }}
    >
      {children}
    </FoodCartContext.Provider>
  );
};

export const useFoodCart = (): FoodCartContextValue => {
  const context = useContext(FoodCartContext);
  if (context === undefined) {
    throw new Error("useFoodCart must be used within a FoodCartProvider");
  }
  return context;
};
