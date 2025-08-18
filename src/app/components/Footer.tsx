import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 p-8 mt-16 rounded justify-between text-gray-400">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        
        {/* Column 1 */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="trend"
              width={36}
              height={36}
              className="w-6 h-6 md:w-9 md:h-9"
            />
            <p className="text-sm">TRENDS</p>
          </Link>
          <p className="text-sm">2025 trends!</p>
          <p className="text-sm">ALL right Reserved!</p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center md:items-start gap-2">
               <p className="text-white">Links</p>
          <Link href="/" className="hover:text-gray-200">Home page</Link>
          <Link href="/contacts" className="hover:text-gray-200">Contacts</Link>
          <Link href="/terms" className="hover:text-gray-200">Terms of Services</Link>
          <Link href="/privacy" className="hover:text-gray-200">Privacy Policy</Link>
          <Link href="/" className="hover:text-gray-200">Home</Link>
        </div>
        <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-white">Products</p>
          <Link href="/" className="hover:text-gray-200">All products</Link>
          <Link href="/contacts" className="hover:text-gray-200">New Arrivals</Link>
          <Link href="/terms" className="hover:text-gray-200">Best Sellers</Link>
          <Link href="/privacy" className="hover:text-gray-200">Services</Link>
          <Link href="/" className="hover:text-gray-200">Home</Link>
        </div>
        <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-white">Company</p>
          <Link href="/" className="hover:text-gray-200">About </Link>
          <Link href="/contacts" className="hover:text-gray-200">Contacts</Link>
          <Link href="/terms" className="hover:text-gray-200">Blogs</Link>
          <Link href="/privacy" className="hover:text-gray-200">Affiliate Programs</Link>
          <Link href="/" className="hover:text-gray-200">Home</Link>
        </div>

      </div>
    </div>
  );
};

export default Footer;
