import React, { useEffect, useState } from "react";
import { BsPersonFillAdd, BsFillCartCheckFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { AiOutlineMenu, AiOutlineLogin } from "react-icons/ai";
import logo from "../../assets/icons/pet-shop.png";
import { Link } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaHireAHelper } from "react-icons/fa";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

const Header = () => {
  const [openDrop, setOpenDrop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const { totellikeQuantity } = useSelector((state) => state.like);

  const handleOpen = () => setOpenDrop(!openDrop);
  const closeDropDown = () => setOpenDrop(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-20 ${
        isScrolled ? "shadow-lg" : ""
      } bg-white`}
    >
      <nav className="px-4 lg:px-6 py-3.5">
        <div className="flex flex-wrap mx-auto max-w-screen-xl justify-between items-center">
          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <img src={logo} className="mr-3 h-7" alt="Logo" />
            <span className="self-center text-xl font-semibold text-black">
              Mtm <span className="text-orange-400">Petshop</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden lg:flex space-x-8">
            <Link to="/home" className="hover:text-orange-400">
              Home
            </Link>
            <Link to="/shop" className="hover:text-orange-400">
              Shop
            </Link>
            <Link to="/cart" className="hover:text-orange-400">
              Cart
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex gap-4 items-center">
            {/* Wishlist */}
            <Link to="/watchList">
              <span className="relative cursor-pointer">
                <FiHeart className="text-red-500" size={22} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1 rounded-full">
                  {totellikeQuantity}
                </span>
              </span>
            </Link>

            {/* Cart */}
            <div
              className="bg-orange-300 px-3 py-1 rounded-xl"
              onClick={closeDropDown}
            >
              <div className="flex items-center gap-2 text-black">
                <BsFillCartCheckFill size={20} />
                <div>
                  <p className="text-sm">{totalQuantity} items</p>
                  <p className="text-sm">₹{totalAmount}</p>
                </div>
              </div>
            </div>

            {/* Profile dropdown */}
            <div
              onClick={handleOpen}
              className="w-16 h-10 border border-gray-600 rounded-xl cursor-pointer hover:shadow-md relative"
            >
              <div className="flex justify-between m-2">
                <BsPersonFillAdd size={20} />
                <AiOutlineMenu size={20} />
              </div>
              {openDrop && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-300 rounded-lg shadow-md p-3 leading-10">
                  <ul>
                    <Link to="/signup">
                      <li className="flex items-center justify-between">
                        Signup <SiGnuprivacyguard className="ml-1" />
                      </li>
                    </Link>
                    <Link to="/login">
                      <li className="flex items-center justify-between">
                        Login <AiOutlineLogin className="ml-1" />
                      </li>
                    </Link>
                    <hr className="my-2" />
                    <Link to="/admin/login">
                      <li className="flex items-center justify-between">
                        Admin <LiaBusinessTimeSolid className="ml-1" />
                      </li>
                    </Link>
                    <Link to="/help">
                      <li className="flex items-center justify-between">
                        Help <FaHireAHelper className="ml-1" />
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
