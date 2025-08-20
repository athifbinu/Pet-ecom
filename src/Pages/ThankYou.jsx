import React from "react";
import { useLocation, Link } from "react-router-dom";

const ThankYou = () => {
  const { state } = useLocation();
  const { formData, productList, totalAmount } = state || {};

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold">No order details found</h1>
        <Link to="/shop" className="mt-5 bg-black text-white py-2 px-6 rounded">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-lg mb-8">
        Hi <span className="font-semibold">{formData.firstName}</span>, your
        order has been placed successfully.
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto text-left">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p>
          <strong>Name:</strong> {formData.firstName} {formData.lastName}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}, {formData.landmark},{" "}
          {formData.city}, {formData.pincode}, {formData.country}
        </p>

        <hr className="my-4" />

        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {productList.map((item, i) => (
          <div
            key={i}
            className="flex justify-between border-b py-2 text-gray-700"
          >
            <p>
              {item.name} x {item.quantity}
            </p>
            <p>₹{item.total}</p>
          </div>
        ))}

        <div className="flex justify-between text-lg font-bold mt-4">
          <p>Total</p>
          <p>₹{totalAmount}</p>
        </div>
      </div>

      <Link
        to="/shop"
        className="mt-4 inline-block bg-orange-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-orange-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
