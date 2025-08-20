"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import CartPage from "../cart/page";
import { ProductType } from "../types";

const products: ProductType[] = [
  {
    id: 1,
    name: "beatifull t-shirt",
    shortDescription: "This is a great product that you will love.",
    description: "This is a great product that you will love for buying from us always.",
    price: 29.99,
    size: ["Small", "Medium", "Large"],
    color: ["Red", "Blue", "Green"],
    image: {
      gray: "/products/1g.png",
      blue: "/products/1gr.png",
      pink: "/products/1p.png",
    },
    category: "t-shirts",
  },
  {
    id: 2,
    name: "shoes for everyone",
    shortDescription: "This product is perfect for your needs.",
    description: "This product is perfect for your needs and will help you achieve your goals.",
    price: 49.99,
    size: ["Small", "Medium", "Large"],
    color: ["Black", "White", "Gray"],
    image: {
      black: "/products/6g.png",
      white: "/products/6w.png",
      gray: "/products/7g.png",
    },
    category: "shoes",
  },
  {
    id: 3,
    name: "acceessories for everyone",
    shortDescription: "An amazing product that you can't miss.",
    description: "An amazing product that you can't miss, it will change your life.",
    price: 19.99,
    size: ["Small", "Medium", "Large"],
    color: ["Yellow", "Pink", "Purple"],
    image: {
      yellow: "/products/5bl.png",
      pink: "/products/5o.png",
      purple: "/products/5r.png",
    },
    category: "accessories",
  },
  {
    id: 4,
    name: "beautiful sweater",
    shortDescription: "A must-have product for everyone.",
    description: "A must-have product for everyone, it is versatile and useful in many situations.",
    price: 39.99,
    size: ["Small", "Medium", "Large"],
    color: ["Orange", "Brown", "Teal"],
    image: {
      orange: "/products/3b.png",
      brown: "/products/3bl.png",
      teal: "/products/3gr.png",
    },
    category: "sweaters",
  },
  {
    id: 5,
    name: "jacket for all seasons",
    shortDescription: "Another must-have product for everyone.",
    description: "Versatile and useful in many situations, you'll love this too.",
    price: 39.99,
    size: ["Small", "Medium", "Large"],
    color: ["Brown", "Green"],
    image: {
      brown: "/products/8b.png",
      green: "/products/8gr.png",
    },
    category: "jackets",
  },
  {
    id: 8,
    name: "best hoodie ever",
    shortDescription: "An amazing product that you can't miss.",
    description: "An amazing product that you can't miss, it will change your life.",
    price: 19.99,
    size: ["Small", "Medium", "Large"],
    color: ["Yellow", "Pink", "Purple"],
    image: {
      yellow: "/products/5o.png",
      pink: "/products/5r.png",
      purple: "/products/5bl.png",
    },
    category: "accessories",
  },
];

const ProductList = ({
  category = "",
  params,
}: {
  category?: string;
  params: "HomePage" | "products";
}) => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category") || category || "all";
  const pathname = usePathname();
  const router = useRouter();

  const handleCategoryChange = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams?.toString() || '');
    if (value && value !== "all") {
      newParams.set("category", value);
    } else {
      newParams.delete("category");
    }
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="w-full">
      <div className="flex justify-end items-center mb-4 rounded-sm p-2">
        {params === "products" && <Filter />}
      </div>
      
      <Categories
        selectedCategory={selectedCategory}
        onClick={handleCategoryChange}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <ProductCard Product={product} />
            
          </div>
        ))}
      </div>
      
      <Link
        href={category ? `/products/?category=${category}` : "/products/"}
        className="text-blue-600 hover:underline justify-end flex mt-4"
      >
        View all products
      </Link>
      
      {/* <CartPage /> */}
    </div>
  );
};

export default ProductList;