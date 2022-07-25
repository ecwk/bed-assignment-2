import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect
} from 'react';
import { useLocalStorage } from '@mantine/hooks';

import { type CartItem } from '@common/types';

interface CartContext {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (itemId: string, increment?: number) => void;
  decreaseQuantity: (itemId: string, decrement?: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContext>({} as CartContext);

const useCartProvider = (): CartContext => {
  const [cart, setCart] = useLocalStorage<CartItem[]>({
    key: 'cart',
    defaultValue: []
  });

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // check if item id already exists then increment
      const itemIndex = prevCart.findIndex(
        (prevItem) => prevItem.id === item.id
      );
      if (itemIndex !== -1) {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prevCart, item];
    });
  };
  const increaseQuantity = (itemId: string, increment: number = 1) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (prevItem) => prevItem.id === itemId
      );
      if (itemIndex === -1) {
        return prevCart;
      }
      const newCart = [...prevCart];
      newCart[itemIndex].quantity += increment;
      return newCart;
    });
  };

  const decreaseQuantity = (itemId: string, decrement: number = 1) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (prevItem) => prevItem.id === itemId
      );
      if (itemIndex === -1) {
        return prevCart;
      }
      const newCart = [...prevCart];
      newCart[itemIndex].quantity -= decrement;
      if (newCart[itemIndex].quantity <= 0) {
        newCart.splice(itemIndex, 1);
      }
      return newCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const context = useCartProvider();

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
