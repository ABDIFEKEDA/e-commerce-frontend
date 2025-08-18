"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingBag } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      {/* Left Section - Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image
          src="/logo.png"
          alt="Trends Logo"
          width={40}
          height={40}
          className="w-6 h-6 md:w-9 md:h-9"
          priority
        />
        <p className="hidden md:block text-lg font-semibold tracking-wider text-gray-800">
          TRENDS
        </p>
      </Link>

      {/* Middle Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <SearchBar />
      </div>

      {/* Right Section - Navigation Icons */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Home"
        >
          <Home className="w-5 h-5 text-gray-700" />
        </Link>
        
        <Link
          href="/notifications"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-700" />
        </Link>
        
        <ShoppingCartIcon />
        
        <Link
          href="/login"
          className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors font-medium bg-blue-300"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;