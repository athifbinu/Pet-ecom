import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Cart";
import ProductDetailes from "../Pages/ProductDetailes";
import Checkout from "../Pages/Checkout";
import Watchlist from "../Pages/Watchlist";
import Contact from "../Pages/Contact";
import Help from "../Pages/Help";
import Carrers from "../Pages/Carrers";
import Blog from "../Pages/Blog";
import ThankYou from "../Pages/ThankYou";
import DoctorsHome from "../Pages/DoctorsHome";
import DoctorListing from "../Pages/DoctorListing";
import DoctorCheckout from "../Pages/DoctorCheckout";

import Dashboard from "../Admin/AdPages/Dashboard";
import AddProduct from "../Admin/AdPages/AddProduct";
import AddCarrers from "../Admin/AdPages/AddCarrers";
import ListProducts from "../Admin/AdPages/ListProducts";
import ListOrders from "../Admin/AdPages/ListOrders";

import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import AdminLogin from "../Admin/AdComponents/AdminLogin/AdLogin";

import PrivateAdminRoute from "../Admin/AdComponents/AdminLogin/PrivateAdminRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="details" element={<ProductDetailes />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="watchList" element={<Watchlist />} />
      <Route path="contact" element={<Contact />} />
      <Route path="help" element={<Help />} />
      <Route path="careers" element={<Carrers />} />
      <Route path="blog" element={<Blog />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route path="Doctor" element={<DoctorsHome />} />
      <Route path="DoctorsList" element={<DoctorListing />} />
      <Route path="DoctorsCheckout" element={<DoctorCheckout />} />

      <Route path="/thank-you" element={<ThankYou />} />

      {/* Admin login route (public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <PrivateAdminRoute>
            <Dashboard />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/addProduct"
        element={
          <PrivateAdminRoute>
            <AddProduct />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/addCarrers"
        element={
          <PrivateAdminRoute>
            <AddCarrers />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <PrivateAdminRoute>
            <ListProducts />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <PrivateAdminRoute>
            <ListOrders />
          </PrivateAdminRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
