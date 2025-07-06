import React, { useEffect, useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient";
import { ImSpinner } from "react-icons/im";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

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
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ImSpinner className="animate-spin text-3xl text-orange-500" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white flex flex-col"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-orange-500 font-semibold text-lg">
                ₹ {product.price}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {product.category} / {product.subcategory}
              </p>
              <p className="text-sm text-gray-700 flex-grow">
                {product.description}
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openEditModal(product)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
