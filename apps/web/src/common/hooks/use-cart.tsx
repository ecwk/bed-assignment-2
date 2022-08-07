import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect
} from 'react';
import { useLocalStorage } from '@mantine/hooks';

import { type CartItem } from '@common/types';
import { useAuth } from '@modules/auth';
import { useRouter } from 'next/router';

interface CartContext {
  cart: CartItem[];
  addToCart: (item: CartItem) => boolean;
  increaseQuantity: (itemId: string, increment?: number) => void;
  decreaseQuantity: (itemId: string, decrement?: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContext>({} as CartContext);

const MAX_QUANTITY = 10;

const useCartProvider = (): CartContext => {
  const router = useRouter();
  const [cart, setCart] = useLocalStorage<CartItem[]>({
    key: 'cart',
    defaultValue: []
  });

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find(({ id }) => id === item.id);
    const existingItemIndex = cart.findIndex(({ id }) => id === item.id);
    if (item.quantity + (existingItem?.quantity || 0) > MAX_QUANTITY) {
      return false;
    } else if (existingItem) {
      setCart((prevCart) => {
        const newCart = JSON.parse(JSON.stringify(prevCart));
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      });
    } else {
      setCart([...cart, item]);
    }
    return true;
  };
  const increaseQuantity = (itemId: string, increment: number = 1) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (prevItem) => prevItem.id === itemId
      );
      if (itemIndex === -1) {
        return prevCart;
      }
      const newCart = JSON.parse(JSON.stringify(prevCart));
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
      const newCart = JSON.parse(JSON.stringify(prevCart));
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
