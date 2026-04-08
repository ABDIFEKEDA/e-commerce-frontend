"use client";

import { Package, ShoppingBag, DollarSign, Users } from "lucide-react";
import useProductStore from "../stores/productStore";
import useCartStore from "../stores/stores";
import Link from "next/link";

export default function AdminDashboard() {
  const { products } = useProductStore();
  const { cart } = useCartStore();

  const totalRevenue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOrders = cart.length;

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Cart Items", value: totalOrders, icon: ShoppingBag, color: "bg-green-50 text-green-600" },
    { label: "Revenue (cart)", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "bg-yellow-50 text-yellow-600" },
    { label: "Categories", value: [...new Set(products.map((p) => p.category))].length, icon: Users, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back, Admin</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent products */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Products</h2>
          <Link href="/admin/products" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {products.slice(0, 5).map((p) => (
            <div key={p.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-400 capitalize">{p.category}</p>
              </div>
              <p className="text-sm font-semibold">${p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
