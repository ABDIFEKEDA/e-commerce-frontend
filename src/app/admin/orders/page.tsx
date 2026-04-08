"use client";

import useCartStore from "../../stores/stores";

export default function AdminOrdersPage() {
  const { cart } = useCartStore();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Orders</h1>
      <p className="text-sm text-gray-500 mb-8">{cart.length} item(s) currently in carts</p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Color</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cart.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 capitalize text-gray-500">{item.selectColor}</td>
                <td className="px-4 py-3 text-gray-500">{item.selectSize}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                <td className="px-4 py-3 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {cart.length === 0 && <p className="text-center text-gray-400 py-12">No orders yet.</p>}
      </div>
    </div>
  );
}
