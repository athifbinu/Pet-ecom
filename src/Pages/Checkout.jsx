import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { supabase } from "../components/supabase/supabaseClient";

import gp from "../assets/icons/google-pay.png";
import pt from "../assets/icons/Paytm-Logo.wine.svg";
import pn from "../assets/icons/PhonePe-Logo.wine.svg";
import ms from "../assets/icons/Amazon_Pay-Logo.wine.svg";
import bhim from "../assets/icons/bhim.svg";
import mc from "../assets/icons/Mastercard-Logo.wine.svg";
import vs from "../assets/icons/Visa_Inc.-Logo.wine.svg";

const Checkout = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/shop");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const adminPhone = "7594013460";

    const productList = cartItems.map((item) => ({
      name: item.productName,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    const message = `🛒 *New Order Received!*

👤 *Customer Details*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.landmark}, ${formData.city}, ${
      formData.pincode
    }, ${formData.country}

📦 *Order Summary*
${productList
  .map(
    (p, i) => `${i + 1}. ${p.name} - ₹${p.price} x ${p.quantity} = ₹${p.total}`
  )
  .join("\n")}

🧾 Subtotal: ₹${totalAmount}
🚚 Shipping: ₹10
💰 Total: ₹${totalAmount + 10}`;

    try {
      const { error } = await supabase.from("orders").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          country: formData.country,
          pincode: formData.pincode,
          items: productList,
          subtotal: totalAmount,
          shipping: 10,
          total: totalAmount + 10,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        alert("Failed to place order. Please try again.");
        return;
      }

      window.open(
        `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      alert("Order placed successfully!");
      navigate("/thank-you");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4">
      <section className="mt-24">
        <h1 className="text-2xl font-bold mb-5">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 mb-5">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 w-full border rounded-md"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 w-full border rounded-md"
                placeholder="Last Name"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 mb-5 w-full border rounded-md"
              placeholder="Email"
              required
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 mb-5 w-full border rounded-md"
              placeholder="Phone Number"
              required
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 mb-5 w-full border rounded-md"
              placeholder="Address"
              required
            />

            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="p-2 mb-5 w-full border rounded-md"
              placeholder="Landmark"
            />

            <div className="flex gap-3 mb-5">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-2 w-full border rounded-md"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="p-2 w-full border rounded-md"
                placeholder="Country"
                required
              />
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="p-2 w-full border rounded-md"
                placeholder="Pincode"
                required
              />
            </div>

            <div className="flex justify-between mt-10 mb-14">
              <div
                className="flex items-center text-gray-600 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <MdArrowBackIosNew />
                <p>Return</p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 uppercase"
              >
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              {[gp, pt, pn, ms, bhim, mc, vs].map((icon, i) => (
                <img key={i} className="w-12" src={icon} alt="pay icon" />
              ))}
            </div>
          </form>

          {/* Right Summary */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-5 mb-4 border-b pb-2"
                >
                  <img
                    src={item.imgUrl}
                    className="w-16 h-16 object-cover rounded"
                    alt={item.productName}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))
            )}

            <div className="mt-5">
              <div className="flex justify-between mb-2">
                <p className="font-medium">Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium">Shipping</p>
                <p>₹10</p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>₹{totalAmount + 10}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
