import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.jpg";

import Whatsapp from "../../assets/icons/whatsapp.png";
import Facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram (1).png";
import Twitter from "../../assets/icons/twitter.png";
import Telegram from "../../assets/icons/telegram.png";
import { FaCartArrowDown } from "react-icons/fa6";
import {
  FaHeart,
  FaUser,
  FaUserLock,
  FaHome,
  FaPhone,
  FaShoppingBag,
  FaComments,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { totellikeQuantity } = useSelector((state) => state.like);

  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="mb-6">
          <div className="mb-6 md:mb-0">
            <Link to="#" className="flex items-center gap-3">
              <img src={logo} className="h-14 rounded-full shadow" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-900">
                Mtm Petshop
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-1 p-4 bg-slate-50/80 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
              Contact Us
            </h2>
            <div className="text-slate-700 mb-3 space-y-2">
              <p className="font-medium">Mtm Veterinary Medicels & PetShop</p>
              <p>
                Pookotumpadam <br />
                Kerala <br />
                India
              </p>
            </div>
            <div className="text-slate-700 space-y-1">
              <p className="font-medium">test@gmail.com</p>
              <p>8089371919</p>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
              Account
            </h2>
            <ul className="text-slate-500 font-medium space-y-3">
              <li>
                <Link
                  to="/login"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Signup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
              Company
            </h2>
            <ul className="text-slate-500 font-medium space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
              Resources
            </h2>
            <ul className="text-slate-500 font-medium space-y-3">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-teal-700 transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-slate-200 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-slate-500 sm:text-center">
            © 2023{" "}
            <a
              href="https://flowbite.com/"
              className="hover:underline text-slate-700"
            >
              Mtm ™
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 sm:mt-0">
            {[Whatsapp, instagram, Facebook, Telegram, Twitter].map(
              (icon, idx) => (
                <Link
                  to="#"
                  key={idx}
                  className="transition transform hover:-translate-y-0.5 hover:scale-105"
                >
                  <img src={icon} className="w-5" alt="social icon" />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      {/* floating mobile nav */}
      <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
        <div className="rounded-3xl border border-white/60 bg-white/95 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-md ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/home"
              className="group flex-1 rounded-2xl bg-slate-50 p-3 text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 hover:shadow-lg"
            >
              <div className="flex items-center justify-center text-2xl">
                <FaHome />
              </div>
              <p className="text-[11px] mt-1 font-semibold uppercase tracking-[0.2em]">
                Home
              </p>
            </Link>

            <Link
              to="/shop"
              className="group flex-1 rounded-2xl bg-slate-50 p-3 text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 hover:shadow-lg"
            >
              <div className="flex items-center justify-center text-2xl">
                <FaShoppingBag />
              </div>
              <p className="text-[11px] mt-1 font-semibold uppercase tracking-[0.2em]">
                Shop
              </p>
            </Link>

            <Link
              to="/contact"
              className="group flex-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-white shadow-lg shadow-teal-500/30 transition-transform duration-200 hover:-translate-y-1 hover:scale-105"
            >
              <div className="flex items-center justify-center text-2xl">
                <FaPhone />
              </div>
              <p className="text-[11px] mt-1 font-semibold uppercase tracking-[0.2em]">
                Call
              </p>
            </Link>

            <Link
              to="/watchList"
              className="group flex-1 rounded-2xl bg-slate-50 p-3 text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 hover:shadow-lg relative"
            >
              {totellikeQuantity > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-pink-500 px-1.5 text-[10px] font-bold text-white">
                  {totellikeQuantity}
                </span>
              )}
              <div className="flex items-center justify-center text-2xl">
                <FaHeart />
              </div>
              <p className="text-[11px] mt-1 font-semibold uppercase tracking-[0.2em]">
                Faves
              </p>
            </Link>

            <Link
              to="/cart"
              className="group flex-1 rounded-2xl bg-slate-50 p-3 text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 hover:shadow-lg relative"
            >
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[10px] font-bold text-white">
                  {totalQuantity}
                </span>
              )}
              <div className="flex items-center justify-center text-2xl">
                <FaCartArrowDown />
              </div>
              <p className="text-[11px] mt-1 font-semibold uppercase tracking-[0.2em]">
                Cart
              </p>
            </Link>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-900/95 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-inner shadow-slate-900/10 animate-pulse">
            Quick access to shop, contact, favorites and cart
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
