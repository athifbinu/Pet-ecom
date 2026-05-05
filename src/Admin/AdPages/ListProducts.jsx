import React, { useEffect, useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient";
import { ImSpinner } from "react-icons/im";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      console.log("Fetched products:", data);
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalCategories = new Set(
    products.map((product) => product.category).filter(Boolean),
  ).size;

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return [
      product.name,
      product.category,
      product.subcategory,
      product.description,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(query));
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Error deleting product:", error.message);
      alert("Error deleting product");
    } else {
      alert("Product deleted successfully");
      fetchProducts();
    }
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("products")
      .update(editForm)
      .eq("id", editProduct.id);

    if (error) {
      console.error("Error updating product:", error.message);
      alert("Error updating product");
    } else {
      alert("Product updated successfully");
      setEditProduct(null);
      fetchProducts();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 shadow-xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Admin Product Catalog
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Browse, search, and manage your inventory with a modern admin
            interface.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Total products
            </p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {totalProducts}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Visible
            </p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {filteredProducts.length}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Categories
            </p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {totalCategories}
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Product search
                </p>
                <p className="mt-2 text-slate-500 text-sm">
                  Find items by name, category, subcategory or description.
                </p>
              </div>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="mt-5 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-200"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Quick tip
            </p>
            <p className="mt-3 text-slate-600 text-sm leading-6">
              Use the search field to narrow down results instantly. Select a
              card to edit or delete items directly from the catalog.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ImSpinner className="animate-spin text-4xl text-orange-500" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-600 shadow-sm">
            <p className="text-xl font-semibold">No matching products found.</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different keyword or clear the search box.
            </p>
          </div>
        ) : (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white shadow-lg">
                    ₹{product.price}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 max-h-16 overflow-hidden text-sm text-slate-500 text-ellipsis">
                    {product.description || "No description available."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {product.category || "Uncategorized"}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {product.subcategory || "General"}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Product Name"
                required
              />
              <input
                name="price"
                type="number"
                value={editForm.price}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Price"
                required
              />
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Category"
                required
              />
              <input
                name="subcategory"
                value={editForm.subcategory}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Subcategory"
                required
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Description"
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProducts;
