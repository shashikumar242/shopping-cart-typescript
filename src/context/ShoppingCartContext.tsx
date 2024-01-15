import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: cartItem[];
};

type cartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItemes] = useState<cartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function getItemQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);

    return item?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    console.log("increase is calling", id);
    console.log("carItmes", cartItems);
    setCartItemes((prevState) => {
      const existingItem = prevState.find((item) => item.id == id);

      if (!existingItem) {
        return [...prevState, { id: id, quantity: 1 }];
      }
      console.log("inside of else in increaseCartQuantity");

      return prevState.map((item) => {
        return item.id === id ? { ...item, quantity: item.quantity + 1 } : item;
      });
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItemes((prevState) => {
      const existingItem = prevState.find((item) => item.id === id);

      if (!existingItem) {
        return prevState; // No item found, return the current array
      }

      if (existingItem.quantity === 1) {
        // If the quantity is 1, remove the item from the array
        return prevState.filter((item) => item.id !== id);
      }

      // If the quantity is greater than 1, decrement the quantity
      return prevState.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }

  function removeFromCart(id: number) {
    setCartItemes((currentItems) => {
      return currentItems?.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
