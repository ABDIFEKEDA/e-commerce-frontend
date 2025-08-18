"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { ProductType } from "../types";
import { useRouter } from "next/navigation";
import useCartStore from "../stores/stores";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ProductCardProps {
  Product: ProductType;
}

const ProductCard = ({ Product }: ProductCardProps) => {
  const [productType, setProductType] = useState({
    size: Product.size[0],
    color: Product.color[0],
  });
  
  const { addToCart } = useCartStore();
  const router = useRouter();

  const handleProductTypeChange = (type: "size" | "color", value: string) => {
    setProductType((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const currentColorKey = productType.color.toLowerCase();
  const imageSrc =
    currentColorKey && Product.image[currentColorKey as keyof typeof Product.image]
      ? Product.image[currentColorKey as keyof typeof Product.image]
      : "/fallback-image.png";

  const handleAddToCart = () => {
    const cartItem = {
      ...Product,
      quantity: 1,
      selectSize: productType.size,
      selectColor: productType.color
    };
    
    addToCart(cartItem);
    toast.success(`${Product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer />
      
      <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <Link href={`/products/${Product.id}`} className="block">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={imageSrc}
              alt={Product.name}
              fill
              className="object-cover hover:opacity-90 transition-opacity"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        </Link>

        <div className="p-4 space-y-3">
          <h1 className="font-medium text-lg">{Product.name}</h1>
          <p className="text-sm text-green-600 line-clamp-2">
            {Product.shortDescription}
          </p>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-xs">Size</span>
              <select
                name="size"
                id="size"
                className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleProductTypeChange("size", e.target.value)}
                value={productType.size}
              >
                {Product.size?.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-xs">Color</span>
              <div className="flex gap-2">
                {Product.color?.map((color) => (
                  <button
                    key={color}
                    className={`w-5 h-5 rounded-full border ${
                      productType.color === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductTypeChange("color", color);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="font-bold text-lg">${Product.price.toFixed(2)}</div>
            <button
              className="flex items-center gap-1 ring-1 ring-gray-200 shadow-lg rounded-md px-3 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-colors duration-200"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;