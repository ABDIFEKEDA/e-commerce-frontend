"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Home, ShoppingBag, LogOut, LogIn, LayoutDashboard, User } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import useAuthStore from "../stores/authStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { role, email, logout } = useAuthStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image src="/logo.png" alt="Trends Logo" width={40} height={40} className="w-6 h-6 md:w-9 md:h-9" priority />
        <p className="hidden md:block text-lg font-semibold tracking-wider text-gray-800">TRENDS</p>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4">
        <SearchBar />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Home">
          <Home className="w-5 h-5 text-gray-700" />
        </Link>

        <Link href="/products" className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Products">
          <ShoppingBag className="w-5 h-5 text-gray-700" />
        </Link>

        <ShoppingCartIcon />

        {/* Always show Login button until hydrated */}
        {!hydrated && (
          <Link href="/login" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors">
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        )}

        {/* Not logged in */}
        {hydrated && role === null && (
          <Link href="/login" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors">
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        )}

        {/* Logged in as user */}
        {hydrated && role === "user" && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 hidden sm:block max-w-[120px] truncate">{email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}

        {/* Logged in as admin */}
        {hydrated && role === "admin" && (
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
