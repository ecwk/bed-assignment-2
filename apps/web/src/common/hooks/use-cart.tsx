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
    setCart((prevCart) => [...prevCart, item]);
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
