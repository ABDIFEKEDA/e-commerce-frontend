"use client";

import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "t-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "jackets",
    icon: <Hand className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "hoodies",
    icon: <Hand className="w-4 h-4" />,
    slug: "hoodies",
  },
];

const Categories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 bg-gray-100 rounded-lg shadow-sm mb-4 text-sm">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => handleChange(category.slug)}
          className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition-colors duration-200 ${
            category.slug === selectedCategory
              ? "bg-white text-black shadow"
              : "text-gray-500 hover:bg-gray-200"
          }`}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
