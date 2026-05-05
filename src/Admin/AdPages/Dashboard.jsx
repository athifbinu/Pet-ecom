import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiArrowUpRight, FiTrendingUp } from "react-icons/fi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import ProductIcon from "../../assets/adminicons/product.png";
import OrderIcon from "../../assets/adminicons/order (1).png";
import Carresicon from "../../assets/adminicons/carreer.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./test.css";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Products",
    value: "1,248",
    subtitle: "Active catalog items",
    icon: <img src={ProductIcon} className="w-5" alt="Products" />,
    color: "from-sky-500 to-indigo-600",
  },
  {
    title: "Orders",
    value: "842",
    subtitle: "Completed this week",
    icon: <img src={OrderIcon} className="w-5" alt="Orders" />,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Customers",
    value: "3,120",
    subtitle: "Returning buyers",
    icon: <FiUsers className="w-5 h-5" />,
    color: "from-emerald-500 to-lime-500",
  },
  {
    title: "Categories",
    value: "24",
    subtitle: "Active categories",
    icon: <BiSolidCategoryAlt className="w-5 h-5" />,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Careers",
    value: "18",
    subtitle: "Open roles",
    icon: <img src={Carresicon} className="w-5" alt="Careers" />,
    color: "from-lime-500 to-emerald-500",
  },
];

const chartData = [
  { name: "Mon", revenue: 5200, orders: 68 },
  { name: "Tue", revenue: 7300, orders: 85 },
  { name: "Wed", revenue: 6200, orders: 72 },
  { name: "Thu", revenue: 8500, orders: 96 },
  { name: "Fri", revenue: 9800, orders: 112 },
  { name: "Sat", revenue: 7700, orders: 88 },
  { name: "Sun", revenue: 10200, orders: 121 },
];

const activityItems = [
  {
    label: "Low stock alert",
    description: "4 products need restocking",
    badge: "Urgent",
  },
  {
    label: "New vendor request",
    description: "3 partner approvals pending",
    badge: "Review",
  },
  {
    label: "Conversion boost",
    description: "Sales are +18% over last week",
    badge: "Trending",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <main className="main-container">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-[2rem] bg-slate-950/95 border border-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">
              Mtm Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Welcome back, Mtm Vet
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Monitor product performance, orders, customers, and business
              health from a single elegant dashboard. Everything you need to
              manage the shop is here.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Logout
            </button>
            <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-sky-400">
              Generate report
              <FiArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-6 py-8 xl:grid-cols-[repeat(3,minmax(0,1fr))]">
        {stats.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className={`group overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${item.color} p-6 text-white shadow-2xl shadow-slate-950/30 transition hover:-translate-y-1 hover:shadow-sky-500/20`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-100/80">
                  {item.title}
                </p>
                <p className="mt-3 text-3xl font-semibold">{item.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-slate-950/10">
                {item.icon}
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-100/80">{item.subtitle}</p>
          </motion.article>
        ))}
      </section>

      <section className="charts">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-slate-200/10 bg-white p-6 shadow-2xl shadow-slate-950/10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Weekly revenue
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                $56,320
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Revenue growth has improved by 18% compared to last week.
              </p>
            </div>
            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <FiTrendingUp className="mr-2 h-4 w-4 text-sky-500" />
              +18.4%
            </div>
          </div>

          <div className="mt-6 h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tick={{ fill: "#64748B" }}
                />
                <YAxis tickLine={false} tick={{ fill: "#64748B" }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#84cc16"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 rounded-[2rem] border border-slate-200/10 bg-slate-950 p-6 shadow-2xl shadow-slate-950/20 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Quick overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Actions & alerts
              </h2>
            </div>
            <button className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700">
              View all
            </button>
          </div>

          <div className="rounded-[1.5rem] bg-slate-900/90 p-5 text-slate-300 shadow-inner shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Important note
            </p>
            <p className="mt-3 text-base leading-7">
              Keep stock levels balanced and prioritize offers for best-selling
              products to maintain a high conversion rate.
            </p>
          </div>

          <div className="space-y-4">
            {activityItems.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-sky-400/30 hover:bg-slate-800/70"
              >
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {item.description}
                  </p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Dashboard;
