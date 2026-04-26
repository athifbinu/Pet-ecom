import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../components/supabase/supabaseClient";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Building2, Globe2, Hash, ArrowLeft, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import Swal from "sweetalert2";

import gp from "../assets/icons/google-pay.png";
import pt from "../assets/icons/Paytm-Logo.wine.svg";
import pn from "../assets/icons/PhonePe-Logo.wine.svg";
import ms from "../assets/icons/Amazon_Pay-Logo.wine.svg";
import bhim from "../assets/icons/bhim.svg";
import mc from "../assets/icons/Mastercard-Logo.wine.svg";
import vs from "../assets/icons/Visa_Inc.-Logo.wine.svg";

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative mb-5">
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
      <Icon className="w-5 h-5" />
    </div>
    <input
      {...props}
      className={`w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder-gray-400 ${props.className || ""}`}
    />
  </div>
);

const Checkout = () => {
  const { cartItems: reduxCartItems, totalAmount: reduxTotalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowProduct = location.state?.buyNowProduct;
  
  const cartItems = buyNowProduct ? [buyNowProduct] : reduxCartItems;
  const totalAmount = buyNowProduct ? (buyNowProduct.price * buyNowProduct.quantity) : reduxTotalAmount;

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
    if (!buyNowProduct && reduxCartItems.length === 0) {
      navigate("/shop");
    }
  }, [buyNowProduct, reduxCartItems.length, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const adminPhone = "918089371919";

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
Address: ${formData.address}, ${formData.landmark}, ${formData.city}, ${formData.pincode}, ${formData.country}

📦 *Order Summary*
${productList
  .map((p, i) => `${i + 1}. ${p.name} - ₹${p.price} x ${p.quantity} = ₹${p.total}`)
  .join("\n")}

🧾 Subtotal: ₹${totalAmount}
💰 Total: ₹${totalAmount}`;

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
          total: totalAmount,
        },
      ]);

      if (error) {
        throw error;
      }

      // Automatically Send Email via Vercel Serverless Function
      try {
        const emailRes = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData, productList, totalAmount })
        });
        
        if (!emailRes.ok) {
          console.error("Automated email failed to send with status:", emailRes.status);
        }
      } catch (emailError) {
        console.error("Automated email failed to send, but order was placed:", emailError);
      }

      await Swal.fire({
        title: "Order Placed Successfully!",
        text: "You will now be redirected to WhatsApp to confirm your order details securely.",
        icon: "success",
        confirmButtonText: "Continue to WhatsApp",
        confirmButtonColor: "#25D366",
        background: "#ffffff",
        customClass: { popup: "rounded-2xl shadow-xl" }
      });

      // Navigate with order details first behind the scenes
      navigate("/thank-you", {
        state: { formData, productList, totalAmount },
      });

      // Open WhatsApp Message for Admin
      window.open(
        `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

    } catch (err) {
      console.error("Unexpected error:", err);
      Swal.fire({
        title: "Oops!",
        text: "Failed to place your order. Please check your connection and try again.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-28 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Cart
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <p className="text-gray-500 mt-2">Please fill in your details to complete your order.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Form */}
          <motion.form 
            variants={formVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit} 
            className="lg:col-span-7 xl:col-span-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100"
          >
            
            <motion.div variants={formVariants} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <User className="w-5 h-5 text-blue-600" /> Contact Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <InputField icon={User} type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                <InputField icon={User} type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <InputField icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                <InputField icon={Phone} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
              </div>
            </motion.div>

            <motion.div variants={formVariants} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-blue-600" /> Shipping Address
              </h2>
              
              <InputField icon={MapPin} type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address (Flat, House no, Building)" required />
              <InputField icon={Building2} type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark (Optional)" />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
                <InputField icon={Building2} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                <InputField icon={Globe2} type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
                <InputField icon={Hash} type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required />
              </div>
            </motion.div>

            <motion.div variants={formVariants} className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                {[gp, pt, pn, ms, bhim, mc, vs].map((icon, i) => (
                  <img key={i} className="h-4 sm:h-5 object-contain" src={icon} alt="payment method" />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-[#25D366]/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" /> Place Order via WhatsApp
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Right Standard Order Summary (Sticky) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 mb-4 items-center">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-xl p-2 border border-gray-100">
                        <img
                          src={item.imgUrl}
                          className="w-full h-full object-contain mix-blend-multiply"
                          alt={item.productName}
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{item.productName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">₹{item.price} each</p>
                    </div>
                    <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 font-medium text-sm">
                  <p>Subtotal</p>
                  <p className="text-gray-900">₹{totalAmount}</p>
                </div>
                <div className="flex justify-between text-gray-500 font-medium text-sm">
                  <p className="flex items-center gap-1"><Truck className="w-4 h-4"/> Shipping</p>
                  <p className="text-emerald-600 font-bold">Free</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Total</p>
                    <p className="text-xs text-gray-400">Including all taxes</p>
                  </div>
                  <p className="text-3xl font-black text-gray-900">₹{totalAmount}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 py-3 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Secure Checkout
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
