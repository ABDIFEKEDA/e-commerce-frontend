import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStoreStateType, CartStoreActionType, CartItemType } from "../types";

const useCartStore = create<CartStoreStateType & CartStoreActionType>()(
  persist(
    (set) => ({
      cart: [] as CartItemType[],

      addToCart: (product: CartItemType) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectSize === product.selectSize &&
              p.selectColor === product.selectColor
          );

          if (existingIndex !== -1) {
            const updatedCart = state.cart.map((p, index) =>
              index === existingIndex
                ? { ...p, quantity: p.quantity + (product.quantity || 1) }
                : p
            );
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...product, quantity: product.quantity || 1 }] };
          }
        });
      },

      removeFromCart: (product: CartItemType) => {
        set((state) => ({
          cart: state.cart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectSize === product.selectSize &&
                p.selectColor === product.selectColor
              )
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
