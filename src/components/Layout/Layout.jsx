import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import Routers from "../../Routers/Routers";
import AdminNav from "../../Admin/AdComponents/AdminNav/AdminNav";
import AdminFooter from "../../Admin/AdComponents/AdFooter/AdminFooter";
import DoctorHeader from "../DoctorHader/DoctorHeader";

const Layout = () => {
  const location = useLocation();
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  // ✅ Admin route check
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminLoginPage = location.pathname === "/admin/login";

  // ✅ Doctor route check
  const isDoctorRoute =
    location.pathname.startsWith("/Doctor") ||
    location.pathname.startsWith("/Doctors");

  return (
    <>
      {/* Header/Nav */}
      {isAdminRoute ? (
        isAdminLoggedIn && !isAdminLoginPage ? (
          <AdminNav />
        ) : null
      ) : isDoctorRoute ? (
        <DoctorHeader />
      ) : (
        <Header />
      )}

      {/* Main content */}
      <main className="">
        {/* 👆 Added pt-20 so content starts below fixed header */}
        <Routers />
      </main>

      {/* Footer */}
      {isAdminRoute ? (
        isAdminLoggedIn && !isAdminLoginPage ? (
          <AdminFooter />
        ) : null
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
