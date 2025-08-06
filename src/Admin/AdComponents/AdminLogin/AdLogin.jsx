import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/adminicons/adminImgs/ryan-miglinczy-02n9_v-d1yY-unsplash.jpg";

const AdLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminUser = {
    name: "admin",
    password: "admin123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === adminUser.name && password === adminUser.password) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <section className="min-h-fit flex items-center justify-center mt-12">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Admin Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">Please log in as admin</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              placeholder="Admin name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={logo} alt="Login Visual" />
        </div>
      </div>
    </section>
  );
};

export default AdLogin;
