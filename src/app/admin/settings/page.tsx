"use client";

import { useState } from "react";
import useAuthStore from "../../stores/authStore";

export default function AdminSettingsPage() {
  const { email } = useAuthStore();
  const [storeName, setStoreName] = useState("TRENDS");
  const [currency, setCurrency] = useState("USD");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your store preferences</p>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Admin Email</label>
          <input value={email || ""} disabled className="border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Store Name</label>
          <input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black">
            <option value="USD">USD — US Dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
          </select>
        </div>
        <button type="submit" className="bg-black text-white rounded-lg py-2 text-sm hover:bg-gray-800 transition-colors">
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
