"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import useCartStore from "../stores/stores";

const ShoppingCartIcon = () => {
  // Correctly get cart and hashHydrated from the store
  const cart = useCartStore((state) => state.cart);
  const hashHydrated = useCartStore((state) => state.cart); // Zustand persist internal flag

  if (!hashHydrated) return null;

  return (
    <div className="relative">
      <Link 
        href="/cart" 
        className="relative flex items-center" 
        aria-label="Shopping Cart"
      >
        <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors" />
        <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
          {cart.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </Link>
    </div>
  );
};

export default ShoppingCartIcon;
