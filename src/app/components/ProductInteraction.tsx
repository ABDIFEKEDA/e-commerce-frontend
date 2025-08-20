"use client";
import React from "react";
import { ProductType } from "../types";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* size */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Size</span>
        <div className="flex gap-2">
          {product.size.map((size) => (
            <div
              key={size}
              className={`cursor-pointer border px-3 py-1 rounded ${
                selectedSize === size ? "border-gray-600" : "border-gray-300"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* color */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex gap-2">
          {product.color.map((color) => (
            <div
              key={color}
              className={`cursor-pointer w-6 h-6 rounded-full border ${
                selectedColor === color ? "border-gray-600" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* quantity (you can add buttons later) */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <input
          type="number"
          min="1"
          defaultValue="1"
          className="w-20 border border-gray-300 rounded px-2 py-1"
        />
      </div>
    </div>
  );
};

export default ProductInteraction;
