import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MenuItem } from "@/types";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  clearOrder: () => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.item.id === item.id
          );
          if (existingItem) {
            // If item exists, increase quantity
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.item.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            // If item doesn't exist, add it to cart
            return { cart: [...state.cart, { item, quantity: 1 }] };
          }
        }),

      removeItem: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.item.id !== itemId),
        })),

      clearOrder: () =>
        set(() => ({
          cart: [],
        })),

      increaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.item.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        })),

      decreaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart
            .map((cartItem) =>
              cartItem.item.id === itemId
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
            .filter((cartItem) => cartItem.quantity > 0), // Remove item if quantity reaches 0
        })),

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage", // name of item in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
