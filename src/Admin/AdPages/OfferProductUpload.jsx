import React, { useState, useRef } from "react";
import { ImSpinner } from "react-icons/im";

const TABS = [
  "General",
  "Pricing",
  "Inventory",
  "Images",
  "SEO",
  "Discount Price",
  "Preview",
];

export default function OfferProductUpload() {
  const [active, setActive] = useState("General");

  // General
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");

  // Pricing
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");

  // Inventory
  const [manageStock, setManageStock] = useState(true);
  const [stock, setStock] = useState(0);

  // Images (UI only)
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileRef = useRef(null);

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  // Discount Price tab
  const [discountActive, setDiscountActive] = useState(true);
  const [discountType, setDiscountType] = useState("percent");
  const [discountValue, setDiscountValue] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleFiles = (e) => {
    const arr = Array.from(e.target.files || []);
    setFiles(arr);
    setPreviews(arr.map((f) => URL.createObjectURL(f)));
  };

  const computedDiscountPercent = (() => {
    if (!originalPrice || !price) return null;
    const o = Number(originalPrice);
    const p = Number(price);
    if (!o || o <= p) return null;
    return Math.round(((o - p) / o) * 100);
  })();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // UI-only demo: just reset and simulate success
      setLoading(false);
      alert("Offer product (UI) submitted — this is a demo preview.");
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 border">
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-500">
              Offers — Admin
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
              Create Offer Product
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              A beautiful UI for adding promotional products (preview only).
            </p>
          </div>
          <div className="text-right text-sm text-slate-600">
            Tabs: {TABS.length}
          </div>
        </div>

        <div className="lg:flex">
          <main className="lg:flex-1 p-6">
            <div className="mb-4 flex gap-2 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-shadow ${
                    active === t
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-slate-50 text-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {active === "General" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                      Product Name
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50 focus:ring-amber-200"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                      SKU (optional)
                    </span>
                    <input
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>

                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Category
                    </span>
                    <input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Subcategory
                    </span>
                    <input
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">
                      Description
                    </span>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50 h-36"
                    />
                  </label>
                </div>
              )}

              {active === "Pricing" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Offer Price
                    </span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Original Price (for discount calculation)
                    </span>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                    {computedDiscountPercent && (
                      <p className="mt-2 text-sm text-amber-600 font-semibold">
                        {computedDiscountPercent}% off
                      </p>
                    )}
                  </label>
                </div>
              )}

              {active === "Inventory" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Manage Stock
                    </span>
                    <div className="mt-2">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={manageStock}
                          onChange={(e) => setManageStock(e.target.checked)}
                        />
                        <span className="text-sm text-slate-700">
                          Enable stock tracking
                        </span>
                      </label>
                    </div>
                  </label>
                  {manageStock && (
                    <label>
                      <span className="text-sm font-medium text-slate-700">
                        Stock Quantity
                      </span>
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                      />
                    </label>
                  )}
                </div>
              )}

              {active === "Images" && (
                <div>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Upload Images
                    </span>
                    <input
                      ref={fileRef}
                      multiple
                      accept="image/*"
                      type="file"
                      onChange={handleFiles}
                      className="mt-2"
                    />
                  </label>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {previews.length > 0 ? (
                      previews.map((s, i) => (
                        <img
                          key={i}
                          src={s}
                          alt={`p-${i}`}
                          className="h-28 w-full object-cover rounded-md shadow-sm"
                        />
                      ))
                    ) : (
                      <div className="col-span-3 p-8 rounded-md border-dashed border text-center text-slate-400">
                        No images selected
                      </div>
                    )}
                  </div>
                </div>
              )}

              {active === "SEO" && (
                <div className="space-y-3">
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Meta Title
                    </span>
                    <input
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Meta Description
                    </span>
                    <textarea
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50 h-28"
                    />
                  </label>
                </div>
              )}

              {active === "Discount Price" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Offer Active
                    </span>
                    <div className="mt-2">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={discountActive}
                          onChange={(e) => setDiscountActive(e.target.checked)}
                        />
                        <span className="text-sm">Active</span>
                      </label>
                    </div>
                  </label>

                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Discount Type
                    </span>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    >
                      <option value="percent">Percent</option>
                      <option value="fixed">Fixed amount</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Discount Value
                    </span>
                    <input
                      type="number"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>

                  <div className="flex items-end">
                    <div>
                      <p className="text-sm text-slate-500">
                        Computed discount
                      </p>
                      <p className="mt-1 text-lg font-semibold text-amber-600">
                        {computedDiscountPercent
                          ? `${computedDiscountPercent}%`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {active === "Preview" && (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden bg-white border p-4">
                    {previews[0] ? (
                      <img
                        src={previews[0]}
                        alt="main"
                        className="w-full h-56 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-56 flex items-center justify-center rounded-md border-dashed text-slate-400">
                        Image preview
                      </div>
                    )}
                    <div className="mt-4">
                      <h2 className="text-xl font-bold text-slate-900">
                        {name || "Product name"}
                      </h2>
                      <p className="text-lg font-extrabold text-amber-600 mt-1">
                        {price ? `₹ ${price}` : "₹ 0"}
                      </p>
                      {originalPrice &&
                        Number(originalPrice) > Number(price) && (
                          <p className="text-sm text-slate-600">
                            Original: ₹{originalPrice} •{" "}
                            {computedDiscountPercent}% off
                          </p>
                        )}
                      <p className="mt-3 text-sm text-slate-700">
                        {description || "Short description of the product."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-3xl bg-amber-600 px-5 py-3 text-white font-semibold hover:bg-amber-500 disabled:opacity-60"
                >
                  {loading ? (
                    <ImSpinner className="animate-spin" />
                  ) : (
                    "Save (UI only)"
                  )}
                </button>
              </div>
            </form>
          </main>

          <aside className="w-full lg:w-96 p-6 border-l bg-slate-50">
            <div className="rounded-xl p-4 bg-white shadow-sm">
              <h3 className="text-lg font-semibold">Quick Summary</h3>
              <dl className="mt-3 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between">
                  <dt>Name</dt>
                  <dd>{name || "-"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Price</dt>
                  <dd>{price ? `₹ ${price}` : "-"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Offer</dt>
                  <dd>{discountActive ? "Yes" : "No"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Discount</dt>
                  <dd>
                    {discountType === "percent"
                      ? `${discountValue}%`
                      : discountType === "fixed"
                        ? `₹ ${discountValue}`
                        : "-"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Stock</dt>
                  <dd>{manageStock ? stock : "Not tracked"}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              This page is UI-only. To save products to the DB, integrate the
              submit handler with your backend or Supabase upload flow.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
