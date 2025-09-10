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
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

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

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border rounded"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
          }}
          required
        >
          <option value="">Mane Category</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {category && categoryOptions[category] && (
          <select
            className="w-full p-3 border rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option value="">Select Subcategory</option>
            {categoryOptions[category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

        <textarea
          placeholder="Product Description"
          className="w-full p-3 border rounded h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
          required
          ref={fileInputRef}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold text-lg"
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
  );
};

export default AddProduct;
