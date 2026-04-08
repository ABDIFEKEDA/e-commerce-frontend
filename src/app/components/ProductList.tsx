"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import useProductStore from "../stores/productStore";

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

  const { products } = useProductStore();

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
      
      {params === "HomePage" && (
        <Link
          href={category ? `/products/?category=${category}` : "/products/"}
          className="text-blue-600 hover:underline justify-end flex mt-4"
        >
          View all products
        </Link>
      )}
    </div>
  );
};

export default ProductList;