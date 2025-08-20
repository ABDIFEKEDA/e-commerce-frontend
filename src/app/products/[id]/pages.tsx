"use client";

import { useState } from "react";
import Image from "next/image";
import ProductInteraction from "@/app/components/ProductInteraction";
import { ProductType } from "@/app/types";
import { useParams } from "next/navigation";

// Example products (you can import from a file)
const products: ProductType[] = [
  {
    id: 1,
    name: "adidas-coreFit t-shirt",
    shortDescription: "The product you are always really on!",
    description:
      "Whatever you think about our products, we aim to achieve satisfaction from every item.",
    price: 59.9,
    size: ["xs", "s", "m", "xl"],
    color: ["gray", "purple", "green"],
    image: {
      gray: "/products/lg.png",
      purple: "/products/lp.png",
      green: "/products/lgr.png",
    },
    category: "jackets",
  },
  // Add more products here
];

const ProductPage = () => {
  const params = useParams(); // Get product ID from URL
  const productId = Number(params.id);

  const product = products.find((p) => p.id === productId);

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.color[0] || "gray"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.size[0] || "m"
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <Image
          src={product.image[selectedColor]}
          alt={product.name}
          width={320}
          height={320}
          className="object-contain rounded-xl shadow-md"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-2">{product.shortDescription}</p>
        <p className="mt-4">{product.description}</p>
        <h2 className="text-2xl font-semibold">
          ${product.price.toFixed(2)}
        </h2>

        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />

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

        {/* Add to Cart */}
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
