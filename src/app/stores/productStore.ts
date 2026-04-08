import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "../types";
import { products as seedProducts } from "../data/products";

type ProductStoreState = {
  products: ProductType[];
};

type ProductStoreActions = {
  addProduct: (product: ProductType) => void;
  updateProduct: (product: ProductType) => void;
  deleteProduct: (id: number) => void;
};

const useProductStore = create<ProductStoreState & ProductStoreActions>()(
  persist(
    (set) => ({
      products: seedProducts,

      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === product.id ? product : p)),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore;
