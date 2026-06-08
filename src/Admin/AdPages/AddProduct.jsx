import React, { useState, useRef } from "react";
import { ImSpinner } from "react-icons/im";
import { supabase } from "../../components/supabase/supabaseClient.js";

const categoryOptions = {
  Foods: [
    "Dog Food Treats",
    "Cat Food",
    "Cat Treats",
    "Fish Food",
    "Rabbit Food",
    "Bird Food",
    "Turtle Food",
  ],
  Pharmacy: [
    "Dog Medicine",
    "Cat Medicine",
    "Supplements",
    "Vitamins",
    "Antibiotics",
    "Antifungal",
    "Antiviral",
    "Weight Booster",
    "Pain Relief & Anti-inflammatory",
    "Deworming",
    "Flea & Tick Control",
    "Digestive Health",
    "Skin care",
    "Flea & Tick Control",
    "Joint Care",
    "Stomach care",
    "Liver & Kidney Support",
    "Respiratory Medicines",
    "Wound & First Aid",
    "Eye & Ear Care",
    "Hormonal & Reproductive Care",
    "Oral Care",
  ],
  Polutry: [
    "Antibiotics & Antimicrobials",
    "Coccidiostats",
    "Vitamins & Supplements",
    "Probiotics & Gut Health",
    "Liver & Kidney Support",
    "Respiratory Medicines",
    "Egg Production & Reproductive Support",
    "Water Sanitizers & Disinfectants",
    "Specialty Medicines",
    "Performance Enhancers",
  ],
  Toys: [
    "Chew Toys",
    "Interactive Toys",
    "Balls",
    "Rope Toys",
    "Plush & Soft Toys",
    "Squeaky Toys",
    "Tug Toys",
    "Fetch Toys (Frisbees, Sticks)",
    "Puzzle Toys & Treat Dispensers",
    "Teething Toys (Puppy/Cat Kitten)",
    "Catnip Toys (for Cats)",
    "Laser Toys (for Cats)",
    "Scratching Toys & Posts",
    "Floating Toys (Water Play)",
    "Durable Rubber Toys (Kong type)",
    "Dental Toys (for cleaning teeth)",
  ],

  CagesAndBagsBeds: [
    // 🐶 Dog
    "Dog Cages (Metal/Wire)",
    "Foldable Dog Crates",
    "Travel Dog Carriers",
    "Dog Bags",
    "Dog Beds (Soft, Orthopedic, Cooling)",
    "Dog Houses (Indoor/Outdoor)",

    // 🐱 Cat
    "Cat Cages",
    "Cat Carriers (Plastic/Soft)",
    "Cat Travel Bags",
    "Cat Beds & Cushions",
    "Cat Hammocks",
    "Cat Tents & Hideouts",
  ],

  CollerAndLeash: [
    "Dog Collars",
    "Cat Collars",
    "Leashes",
    "Dog Leashes",
    "Cat Leashes",
    "Full BodyBelt",
    "Chain",
    "Choke Chain",
  ],
  Feeders: [
    "Dog Steel Feeding bowl",
    "Cat steel feeding bowl",
    "Dog plastic feeding bowl",
    "Cat plastic feeding bowl",
    "Bird Feeding bowl,",
    "Rabbit Feeding bowl",
    "Poultry Drinker",
    "Poultry Feeder",
  ],
  Grooming: [
    "Shampoos",
    "Conditioners",
    "Powders",
    "Sprays & Deodorizers",
    "Oils & Serums",
    "Cleansers (Dry/Wet wipes)",
    "Soaps",
    "Combs & Brushes",
    "Tick & Flea Combs",
    "Nail Cutters & Grinders",
    "Fur Trimmers & Clippers",
    "Ear Cleaners",
    "Eye Wipes & Tear Stain Removers",
    "Toothbrush & Pet Toothpaste",
    "Paw & Nose Balms",
    "Massage Tools",
    "Grooming Gloves",
    "Hair Dryers & Towels",
    "Shedding Control Tools",
    "Grooming Kits & Sets",
  ],

  CatLittersitems: [
    "Cat Litter 5 kg",
    "Cat Litter 10 kg",
    "Multi-Cat Formula Litter",
    "Dust-Free Cat Litter",
    "Litter Deodorizers & Fresheners",
    "Litter Mats (Trap Litter Spills)",
    "Litter Scoops",
    "Disposable Litter Trays",
    "Covered & Open Litter Boxes",
    "Self-Cleaning Litter Boxes",
    "Portable Travel Litter Boxes",
    "Training Litter (for Kittens)",
    "Odor Control Sprays & Powders",
    "Others",
  ],

  AquaticCare: [
    "Fish Tanks & Aquariums",
    "Aquarium Filters & Pumps",
    "Air Pumps & Stones",
    "Water Conditioners",
    "Aquarium Heaters & Thermometers",
    "Fish Tank Lighting",
    "Gravel, Sand & Substrates",
    "Aquarium Decorations (Plants, Rocks, Ornaments)",
    "Aquarium Glass Cleaners & Brushes",
    "Nets & Handling Tools",
    "Fish Medicines & Tonics",
    "Salt & Mineral Additives",
    "Automatic Fish Feeders",
    "Aquarium Stands & Covers",
    "Protein Skimmers (for marine tanks)",
    "CO2 Systems (for planted tanks)",
  ],
  BirdCare: [
    "Bird Seeds & Mixes",
    "Pellets & Formulated Diets",
    "Bird Treats & Supplements",
    "Cuttlebone & Mineral Blocks",
    "Grit & Calcium Supplements",
  ],
};

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload an image.");
    setLoading(true);

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("products").insert([
        {
          name: productName,
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : null,
          category,
          subcategory: subCategory,
          description,
          image_url: publicUrlData.publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("Product added successfully!");

      setProductName("");
      setPrice("");
      setCategory("");
      setSubCategory("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset file input
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const discountPercent =
    originalPrice && price && Number(originalPrice) > Number(price)
      ? Math.round(
          ((Number(originalPrice) - Number(price)) / Number(originalPrice)) *
            100,
        )
      : null;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 shadow-xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-500">
            Product Management
          </p>
          <h2 className="mt-4 text-4xl font-bold text-slate-900 tracking-tight">
            Add a New Product
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Enter product details, upload a compelling image, and preview the
            product before submission.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Product Name
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Premium Dog Food"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Price
                  </span>
                  <div className="mt-2 grid gap-3">
                    <input
                      type="number"
                      placeholder="₹ 0.00"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />

                    <input
                      type="number"
                      placeholder="Original price (optional)"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none text-sm transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Main Category
                  </span>
                  <select
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubCategory("");
                    }}
                    required
                  >
                    <option value="">Select a category</option>
                    {Object.keys(categoryOptions).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Subcategory
                  </span>
                  <select
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    required
                    disabled={!category}
                  >
                    <option value="">Choose a subcategory</option>
                    {category &&
                      categoryOptions[category]?.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Product Description
                </span>
                <textarea
                  placeholder="Write a short description of the product"
                  className="mt-2 h-36 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>

              <div className="space-y-3">
                <span className="text-sm font-medium text-slate-700">
                  Product Image
                </span>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="inline-flex cursor-pointer items-center rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                      ref={fileInputRef}
                      required
                    />
                  </label>
                  <span className="text-sm text-slate-500">
                    {imageFile ? imageFile.name : "PNG, JPG or GIF, max 5MB"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-6 py-4 text-lg font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <ImSpinner className="animate-spin inline-block mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                Preview
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                Product preview
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Review your product information before saving it to the catalog.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-64 w-full rounded-3xl object-cover"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-3xl border-dashed border border-slate-300 bg-white text-slate-400">
                    Image preview will appear here
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Product</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {productName || "Product name"}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {price ? `₹ ${price}` : "₹ 0"}
                    </p>
                    {originalPrice && Number(originalPrice) > Number(price) && (
                      <div className="mt-2">
                        <p className="text-sm text-green-600">
                          Offer price shown; original ₹{originalPrice}
                        </p>
                        {discountPercent ? (
                          <p className="text-sm text-red-600">
                            {discountPercent}% off
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {category || "Main category"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Subcategory</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {subCategory || "Subcategory"}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Description</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {description || "A short description will appear here."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
