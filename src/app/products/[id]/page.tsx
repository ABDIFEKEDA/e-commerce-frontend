"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { products } from "@/app/data/products";
import useProductStore from "@/app/stores/productStore";
import useCartStore from "@/app/stores/stores";

const ProductPage = () => {
  const params = useParams();
  const productId = Number(params.id);
  const { products } = useProductStore();
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useCartStore();

  const [selectedColor, setSelectedColor] = useState<string>(
    product ? Object.keys(product.image)[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.size[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p className="p-8 text-center">Product not found</p>;

  const imageSrc =
    product.image[selectedColor] || Object.values(product.image)[0];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectSize: selectedSize,
      selectColor: selectedColor,
    });
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="flex justify-center items-center bg-gray-50 rounded-xl">
        <div className="relative w-80 h-80">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.shortDescription}</p>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-400 capitalize">
          Category: {product.category}
        </p>

        {/* Color */}
        <div>
          <h3 className="font-semibold mb-2">Color: <span className="font-normal capitalize">{selectedColor}</span></h3>
          <div className="flex gap-3">
            {Object.keys(product.image).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                title={c}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === c ? "border-black scale-110" : "border-gray-300"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <h3 className="font-semibold mb-2">Size:</h3>
          <div className="flex gap-2">
            {product.size.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1 rounded border text-sm transition-colors ${
                  selectedSize === s
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <h3 className="font-semibold mb-2">Quantity:</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 mt-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
