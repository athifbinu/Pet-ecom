import React, { useState, useRef } from "react";
import { ImSpinner } from "react-icons/im";
import { supabase } from "../../components/supabase/supabaseClient.js";

const tabs = [
  "General",
  "Pricing",
  "Inventory",
  "Images",
  "SEO",
  "Discount",
  "Preview",
];

const AddOfferProduct = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [loading, setLoading] = useState(false);

  // General
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");

  // Pricing
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [taxPercent, setTaxPercent] = useState(0);

  // Inventory
  const [stock, setStock] = useState(0);
  const [manageStock, setManageStock] = useState(true);

  // Images
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const imagesRef = useRef(null);

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Discount
  const [discountType, setDiscountType] = useState("percent"); // percent | fixed
  const [discountValue, setDiscountValue] = useState(0);
  const [activeOffer, setActiveOffer] = useState(true);

  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const discountPercentComputed =
    discountType === "percent" && discountValue
      ? Number(discountValue)
      : discountType === "fixed" && originalPrice
        ? Math.round(
            ((Number(originalPrice) - Number(price || originalPrice)) /
              Number(originalPrice)) *
              100,
          )
        : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images (if any)
      const uploadedUrls = [];
      for (const file of images) {
        const ext = file.name.split(".").pop();
        const fileName = `offers/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
        uploadedUrls.push(data.publicUrl);
      }

      // Prepare record
      const record = {
        name,
        sku: sku || null,
        category: category || null,
        subcategory: subcategory || null,
        description: description || null,
        price: price ? Number(price) : null,
        originalPrice: originalPrice ? Number(originalPrice) : null,
        taxPercent: taxPercent ? Number(taxPercent) : 0,
        stock: manageStock ? Number(stock) : null,
        images: uploadedUrls,
        seo: {
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
        },
        discount: activeOffer
          ? {
              type: discountType,
              value: Number(discountValue),
              percent: discountPercentComputed,
            }
          : null,
        is_offer: activeOffer,
        created_at: new Date(),
      };

      const { error: insertError } = await supabase
        .from("products")
        .insert([record]);
      if (insertError) throw insertError;

      alert("Offer product added successfully.");

      // reset
      setName("");
      setSku("");
      setCategory("");
      setSubcategory("");
      setDescription("");
      setPrice("");
      setOriginalPrice("");
      setTaxPercent(0);
      setStock(0);
      setImages([]);
      setImagePreviews([]);
      if (imagesRef.current) imagesRef.current.value = null;
      setMetaTitle("");
      setMetaDescription("");
      setDiscountType("percent");
      setDiscountValue(0);
      setActiveOffer(true);
      setActiveTab("General");
    } catch (err) {
      console.error(err);
      alert("Failed to add offer product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500">
              Offers
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Create Offer Product
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill all tabs and preview before publishing.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex gap-2 overflow-auto">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === t ? "bg-orange-500 text-white" : "bg-slate-50 text-slate-700"}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === "General" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Product Name
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>
                  <label>
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
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
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
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50 h-32"
                    />
                  </label>
                </div>
              )}

              {activeTab === "Pricing" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Price
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
                      Original Price
                    </span>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Tax %
                    </span>
                    <input
                      type="number"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50"
                    />
                  </label>
                </div>
              )}

              {activeTab === "Inventory" && (
                <div className="grid gap-4 sm:grid-cols-2">
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
                        <span className="text-sm">Enable</span>
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

              {activeTab === "Images" && (
                <div>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                      Upload Images
                    </span>
                    <input
                      multiple
                      accept="image/*"
                      ref={imagesRef}
                      onChange={handleImageFiles}
                      type="file"
                      className="mt-2"
                    />
                  </label>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {imagePreviews.length ? (
                      imagePreviews.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`preview-${i}`}
                          className="h-28 w-full object-cover rounded-md"
                        />
                      ))
                    ) : (
                      <div className="col-span-3 rounded-md border border-dashed p-8 text-center text-slate-400">
                        No images selected
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "SEO" && (
                <div>
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
                  <label className="block mt-3">
                    <span className="text-sm font-medium text-slate-700">
                      Meta Description
                    </span>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-4 py-3 bg-slate-50 h-28"
                    />
                  </label>
                </div>
              )}

              {activeTab === "Discount" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Offer Active
                    </span>
                    <div className="mt-2">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={activeOffer}
                          onChange={(e) => setActiveOffer(e.target.checked)}
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
                      <p className="text-sm text-slate-500">Computed</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {discountPercentComputed
                          ? `${discountPercentComputed}%`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Preview" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    {imagePreviews[0] ? (
                      <img
                        src={imagePreviews[0]}
                        alt="preview"
                        className="h-56 w-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="h-56 flex items-center justify-center rounded-md border-dashed border">
                        Image preview
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {name || "Product name"}
                    </h3>
                    <p className="text-lg font-bold mt-1">
                      {price ? `₹ ${price}` : "₹ 0"}
                    </p>
                    {originalPrice && Number(originalPrice) > Number(price) && (
                      <p className="text-sm text-green-600">
                        Original ₹{originalPrice} —{" "}
                        {discountPercentComputed
                          ? `${discountPercentComputed}% off`
                          : ""}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-slate-700">
                      {description || "Short description"}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
                >
                  {loading ? (
                    <ImSpinner className="animate-spin" />
                  ) : (
                    "Publish Offer Product"
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-lg font-semibold">Quick Info</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>
                <strong>Name:</strong> {name || "-"}
              </p>
              <p>
                <strong>Price:</strong> {price ? `₹ ${price}` : "-"}
              </p>
              <p>
                <strong>Offer:</strong> {activeOffer ? "Yes" : "No"}
              </p>
              <p>
                <strong>Discount:</strong>{" "}
                {discountType === "percent"
                  ? `${discountValue}%`
                  : discountType === "fixed"
                    ? `₹ ${discountValue}`
                    : "-"}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AddOfferProduct;
