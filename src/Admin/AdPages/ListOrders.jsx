import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient";
import { ImSpinner2 } from "react-icons/im";
import {
  Trash2,
  CheckCircle,
  Package,
  CalendarClock,
  User,
  MapPin,
  CreditCard,
  Search,
  RefreshCcw,
} from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err.message || err);
      Swal.fire({
        icon: "error",
        title: "Fetch failed",
        text: err.message || "Could not fetch orders",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString();
  };

  const handleToggleExpand = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const handleMarkCompleted = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Mark order as Completed?",
      text: "This will update the order status to Completed.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, mark Completed",
    });

    if (!confirm.isConfirmed) return;

    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: "Completed" })
        .eq("id", orderId);

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Order marked as Completed",
        confirmButtonColor: "#f97316",
      });

      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err.message || "Could not update order",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!orderId) {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: "Order ID is missing.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Delete order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      didOpen: () => {
        const confirmBtn = document.querySelector(".swal2-confirm");
        const cancelBtn = document.querySelector(".swal2-cancel");
        if (confirmBtn) {
          confirmBtn.style.cursor = "pointer";
          confirmBtn.onmouseenter = null;
          confirmBtn.onmouseleave = null;
        }
        if (cancelBtn) {
          cancelBtn.style.cursor = "pointer";
          cancelBtn.onmouseenter = null;
          cancelBtn.onmouseleave = null;
        }
        const style = document.createElement("style");
        style.textContent = `
          .swal2-confirm:hover { filter: none !important; opacity: 1 !important; }
          .swal2-cancel:hover { filter: none !important; opacity: 1 !important; }
        `;
        document.head.appendChild(style);
      },
    });

    if (!confirm.isConfirmed) return;
    setActionLoading(true);

    try {
      const { data, error } = await supabase
        .from("orders")
        .delete()
        .match({ id: orderId })
        .select("id");

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("No matching order was deleted.");
      }

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Order deleted successfully",
        confirmButtonColor: "#f97316",
      });

      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: err.message || "Could not delete order",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const orderCounts = useMemo(() => {
    const summary = {
      all: orders.length,
      pending: 0,
      completed: 0,
      cancelled: 0,
    };
    orders.forEach((order) => {
      if (order.status === "Completed") summary.completed += 1;
      else if (order.status === "Cancelled") summary.cancelled += 1;
      else summary.pending += 1;
    });
    return summary;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        filterStatus === "All" || order.status === filterStatus;
      const keyword = searchTerm.trim().toLowerCase();
      const matchesSearch = keyword
        ? [
            String(order.id),
            order.customer_name,
            order.customer_email,
            order.customer_phone,
          ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(keyword))
        : true;
      return matchesStatus && matchesSearch;
    });
  }, [orders, filterStatus, searchTerm]);

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-slate-50 via-slate-100 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <section className="mb-6 rounded-[2rem] border border-slate-200/60 bg-white/90 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                All Orders
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                A polished admin view for orders with full customer details,
                smart filtering, and animated detail cards.
              </p>
            </div>
            <button
              onClick={fetchOrders}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700"
            >
              <RefreshCcw className="w-4 h-4" />
              Reload orders
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Total orders",
                value: orderCounts.all,
                accent: "from-slate-900 to-slate-700",
                icon: Package,
              },
              {
                label: "Pending",
                value: orderCounts.pending,
                accent: "from-amber-500 to-orange-500",
                icon: CalendarClock,
              },
              {
                label: "Completed",
                value: orderCounts.completed,
                accent: "from-emerald-500 to-teal-600",
                icon: CheckCircle,
              },
            ].map((card) => (
              <div
                key={card.label}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                      {card.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`rounded-3xl bg-gradient-to-br ${card.accent} p-3 text-white`}
                  >
                    <card.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-500" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by order ID, customer name or email"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Filter status
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["All", "Pending", "Completed", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      filterStatus === status
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <ImSpinner2 className="animate-spin text-5xl text-cyan-600" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-12 text-center text-slate-500 shadow-sm">
            <p className="text-lg font-semibold text-slate-700">
              No matching orders found
            </p>
            <p className="mt-2 text-sm">
              Try clearing the search or selecting a different filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              let items = [];
              try {
                items = Array.isArray(order.items)
                  ? order.items
                  : JSON.parse(order.items || "[]");
              } catch (e) {
                items = [];
              }

              return (
                <article
                  key={order.id}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-300/10 transition duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-3">
                        <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 shadow-sm">
                          #{String(order.id).slice(-5)}
                        </span>
                        <h2 className="text-xl font-semibold text-slate-900">
                          {order.customer_name || "Unknown Customer"}
                        </h2>
                        <p className="text-sm text-slate-500">
                          {order.customer_email || "—"} •{" "}
                          {order.customer_phone || "—"}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-3 text-right md:items-end">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                            order.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.status === "Cancelled"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                        <p className="text-3xl font-bold text-orange-500">
                          ₹{order.total ?? 0}
                        </p>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <div className="flex items-center gap-2 text-slate-900 font-semibold mb-2">
                          <User className="w-4 h-4" /> Customer
                        </div>
                        <p>{order.customer_name || "—"}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {order.customer_email || "—"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.customer_phone || "—"}
                        </p>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <div className="flex items-center gap-2 text-slate-900 font-semibold mb-2">
                          <MapPin className="w-4 h-4" /> Delivery
                        </div>
                        <p>
                          {order.shipping_address ||
                            order.customer_address ||
                            "—"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                          {items.length} item{items.length === 1 ? "" : "s"}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                          {order.payment_method || "Payment unknown"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleToggleExpand(order.id)}
                        className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
                      >
                        {isExpanded ? "Hide details" : "View details"}
                      </button>
                    </div>

                    {isExpanded && (
                      <section className="mt-6 space-y-4">
                        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                          <div className="flex items-center gap-2 text-slate-900 font-semibold mb-3">
                            <Package className="w-4 h-4" /> Ordered items
                          </div>
                          <div className="space-y-3">
                            {items.length === 0 ? (
                              <p className="text-sm text-slate-500">
                                No items attached to this order.
                              </p>
                            ) : (
                              items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-sm"
                                >
                                  <div className="min-w-0">
                                    <p className="font-semibold text-slate-800">
                                      {item.name || "Product"}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                      Qty {item.qty ?? 1}
                                    </p>
                                  </div>
                                  <p className="text-sm font-semibold text-slate-700">
                                    ₹{(item.qty || 1) * (item.price || 0)}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-slate-900 font-semibold mb-3">
                              <CreditCard className="w-4 h-4" /> Payment
                              information
                            </div>
                            <div className="text-sm text-slate-600 space-y-2">
                              <p>
                                <span className="font-medium text-slate-800">
                                  Method:
                                </span>{" "}
                                {order.payment_method || "—"}
                              </p>
                              <p>
                                <span className="font-medium text-slate-800">
                                  Transaction:
                                </span>{" "}
                                {order.transaction_id || "Not available"}
                              </p>
                              <p>
                                <span className="font-medium text-slate-800">
                                  Amount:
                                </span>{" "}
                                ₹{order.total ?? 0}
                              </p>
                            </div>
                          </div>
                          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-slate-900 font-semibold mb-3">
                              <MapPin className="w-4 h-4" /> Shipping & notes
                            </div>
                            <div className="text-sm text-slate-600 space-y-2">
                              <p>
                                <span className="font-medium text-slate-800">
                                  Address:
                                </span>{" "}
                                {order.shipping_address ||
                                  order.customer_address ||
                                  "—"}
                              </p>
                              <p>
                                <span className="font-medium text-slate-800">
                                  Delivery ETA:
                                </span>{" "}
                                {order.delivery_eta ||
                                  order.expected_delivery ||
                                  "Not specified"}
                              </p>
                              <p>
                                <span className="font-medium text-slate-800">
                                  Notes:
                                </span>{" "}
                                {order.notes ||
                                  order.order_note ||
                                  "No notes provided."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>

                  <footer className="border-t border-slate-100 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-slate-500">
                        Order #{order.id} · Full customer detail view
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleMarkCompleted(order.id)}
                          disabled={
                            actionLoading || order.status === "Completed"
                          }
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                            order.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700 cursor-default"
                              : "bg-emerald-600 text-white"
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          {order.status === "Completed"
                            ? "Completed"
                            : "Complete"}
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </footer>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOrders;
