"use client";

import React from "react";
import Image from "next/image";
import ProductList from "./ProductList";

const HomePage = () => {

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative aspect-[3/1] mb-12 rounded-lg overflow-hidden shadow-lg">
        <Image 
          src="/featured.png" 
          alt="Featured products" 
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          quality={85}
        />
      </div>

      {/* Filter and Product List Section */}
      <div className="flex flex-col gap-8">
        <ProductList params="HomePage" />
      </div>
    </div>
  );
};

export default HomePage;