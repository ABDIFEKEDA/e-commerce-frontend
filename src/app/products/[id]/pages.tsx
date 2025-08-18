"use client";

import { useState } from "react";
import { ProductType } from "@/app/types";

const product: ProductType = {
  id: 1,
  name: "adidas-coreFit tishirt",
  shortDescription: "The product you are always really on!",
  description:
    "Whatever you think about our products, we aim to achieve satisfaction from every item.",
  price: 59.9,
  size: ["xs", "s", "m", "xl"],
  color: ["gray", "purple", "green"],
  image: {
    gray: "products/lg.png",
    purple: "products/lp.png",
    green: "products/lgr.png",
  },
};

const ProductPages = () => {
  const [selectedColor, setSelectedColor] = useState<string>("gray");
  const [selectedSize, setSelectedSize] = useState<string>("m");

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <img
          src={product.image[selectedColor]}
          alt={product.name}
          className="w-80 h-80 object-contain rounded-xl shadow-md"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-2">{product.shortDescription}</p>
        <p className="mt-4">{product.description}</p>
        <p className="mt-4 text-2xl font-semibold">${product.price}</p>

        {/* Color Selection */}
        <div className="mt-6">
          <h3 className="font-semibold">Choose Color:</h3>
          <div className="flex gap-3 mt-2">
            {product.color.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === c ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-6">
          <h3 className="font-semibold">Choose Size:</h3>
          <div className="flex gap-3 mt-2">
            {product.size.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1 rounded border ${
                  selectedSize === s
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPages;
