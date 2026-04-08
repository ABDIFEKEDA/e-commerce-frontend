"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import useProductStore from "../../stores/productStore";
import { ProductType } from "../../types";
import { categories } from "../../components/Categories";

const EMPTY_FORM: Omit<ProductType, "id"> & { colorInput: string; sizeInput: string } = {
  name: "",
  shortDescription: "",
  description: "",
  price: 0,
  category: "t-shirts",
  color: [],
  size: [],
  image: {},
  colorInput: "",
  sizeInput: "",
};

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageEntries, setImageEntries] = useState<{ color: string; url: string }[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const openAdd = () => { setEditingId(null); setForm(EMPTY_FORM); setImageEntries([]); setShowForm(true); };

  const openEdit = (product: ProductType) => {
    setEditingId(product.id);
    setForm({ ...product, colorInput: "", sizeInput: "" });
    setImageEntries(Object.entries(product.image).map(([color, url]) => ({ color, url })));
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); setImageEntries([]); };

  const addColor = () => {
    const val = form.colorInput.trim().toLowerCase();
    if (val && !form.color.includes(val)) {
      setForm((f) => ({ ...f, color: [...f.color, val], colorInput: "" }));
      setImageEntries((prev) => [...prev, { color: val, url: "" }]);
    }
  };

  const removeColor = (c: string) => {
    setForm((f) => ({ ...f, color: f.color.filter((x) => x !== c) }));
    setImageEntries((prev) => prev.filter((e) => e.color !== c));
  };

  const addSize = () => {
    const val = form.sizeInput.trim();
    if (val && !form.size.includes(val)) {
      setForm((f) => ({ ...f, size: [...f.size, val], sizeInput: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const image = Object.fromEntries(imageEntries.map((e) => [e.color, e.url]));
    if (editingId !== null) {
      updateProduct({ ...form, id: editingId, image });
    } else {
      const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
      addProduct({ ...form, id: newId, image });
    }
    closeForm();
  };

  const categoryOptions = categories.filter((c) => c.slug !== "all");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">{products.length} total products</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Colors</th>
              <th className="px-4 py-3 text-left">Sizes</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => {
              const firstImage = Object.values(product.image)[0];
              return (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {firstImage ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={firstImage} alt={product.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 capitalize text-gray-500">{product.category}</td>
                  <td className="px-4 py-3 font-medium">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {product.color.map((c) => (
                        <span key={c} className="w-5 h-5 rounded-full border border-gray-200 inline-block" style={{ backgroundColor: c }} title={c} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{product.size.join(", ")}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <button onClick={() => openEdit(product)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {deleteConfirmId === product.id ? (
                        <div className="flex gap-1 items-center">
                          <span className="text-xs text-red-500">Sure?</span>
                          <button onClick={() => { deleteProduct(product.id); setDeleteConfirmId(null); }} className="p-1.5 rounded hover:bg-red-100 text-red-500">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirmId(null)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirmId(product.id)} className="p-1.5 rounded hover:bg-red-100 text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center text-gray-400 py-12">No products yet.</p>}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">{editingId !== null ? "Edit Product" : "Add Product"}</h2>
              <button onClick={closeForm} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Name</label>
                <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Short Description</label>
                <input required value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Price ($)</label>
                  <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Category</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                    {categoryOptions.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              {/* Colors */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Colors</label>
                <div className="flex gap-2">
                  <input value={form.colorInput} onChange={(e) => setForm((f) => ({ ...f, colorInput: e.target.value }))} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addColor(); } }} placeholder="e.g. red" className="border rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-black" />
                  <button type="button" onClick={addColor} className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Add</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {form.color.map((c) => (
                    <span key={c} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                      <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c }} />{c}
                      <button type="button" onClick={() => removeColor(c)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
              {/* Image URLs */}
              {imageEntries.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Image URLs</label>
                  {imageEntries.map((entry) => (
                    <div key={entry.color} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full border border-gray-300 shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs w-16 capitalize shrink-0">{entry.color}</span>
                      <input value={entry.url} onChange={(e) => setImageEntries((prev) => prev.map((x) => x.color === entry.color ? { ...x, url: e.target.value } : x))} placeholder="/products/image.png" className="border rounded-lg px-3 py-1.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                  ))}
                </div>
              )}
              {/* Sizes */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Sizes</label>
                <div className="flex gap-2">
                  <input value={form.sizeInput} onChange={(e) => setForm((f) => ({ ...f, sizeInput: e.target.value }))} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSize(); } }} placeholder="e.g. Small" className="border rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-black" />
                  <button type="button" onClick={addSize} className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Add</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {form.size.map((s) => (
                    <span key={s} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                      {s}<button type="button" onClick={() => setForm((f) => ({ ...f, size: f.size.filter((x) => x !== s) }))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-black text-white rounded-lg py-2 text-sm hover:bg-gray-800 transition-colors">{editingId !== null ? "Save Changes" : "Add Product"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
