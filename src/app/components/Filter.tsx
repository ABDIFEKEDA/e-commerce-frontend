"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = () => {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();
  const handleFilter = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams );
    if (value ) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };
  return (
    <div>
      <span className="text-sm font-semibold mr-2">Sort by:</span>
      <select
        onChange={(e) => handleFilter(e.target.value)}
        name="sort"
        id="sort"
        className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="ascending">Price: low to high</option>
        <option value="descending">High to low</option>
      </select>
    </div>
  );
};

export default Filter;
