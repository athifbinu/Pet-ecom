import React, { useEffect, useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient";
import { ImSpinner2 } from "react-icons/im";
import { Trash2, CheckCircle, Package, CalendarClock } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

/**
 * Assumptions:
 * - Your Supabase table is called "orders".
 * - Each order row contains fields such as:
 *   id, customer_name, customer_email, customer_phone,
 *   items (JSON array: [{ name, qty, price }, ...]),
 *   total (number), status (string), payment_method, created_at
 *
 * Adjust field names if different in your DB.
 */

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // id of order to expand
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // fetch orders, newest first
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
    return d.toLocaleString(); // you can customize locale/format
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
    const confirm = await Swal.fire({
      title: "Delete order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;
    setActionLoading(true);

    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);
      if (error) throw error;

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

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            <p className="text-sm text-gray-500">
              Manage all customer orders — view details, update status, or
              delete.
            </p>
          </div>
          <div>
            <button
              onClick={fetchOrders}
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
            >
              <Package className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <ImSpinner2 className="animate-spin text-4xl text-orange-500" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No orders found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              // items may be stored as JSON string or array
              let items = [];
              try {
                items = Array.isArray(order.items)
                  ? order.items
                  : JSON.parse(order.items || "[]");
              } catch (e) {
                items = [];
              }

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="p-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 font-semibold text-lg">
                        #{String(order.id).slice(-3)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {order.customer_name || "Unknown Customer"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.customer_email || "—"} •{" "}
                          {order.customer_phone || "—"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                          <CalendarClock className="w-3 h-3" />
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status || "Pending"}
                      </div>
                      <p className="text-xl font-bold text-orange-500 mt-2">
                        ₹{order.total ?? "0"}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Items preview */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-500">Items</p>
                      <button
                        onClick={() => handleToggleExpand(order.id)}
                        className="text-sm text-orange-500 hover:underline"
                      >
                        {isExpanded ? "Hide" : "View"}
                      </button>
                    </div>

                    {isExpanded ? (
                      <div className="space-y-3">
                        {items.length === 0 ? (
                          <p className="text-sm text-gray-400">
                            No items data.
                          </p>
                        ) : (
                          items.map((it, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-sm"
                            >
                              <div>
                                <p className="font-medium text-gray-800">
                                  {it.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Qty: {it.qty} • ₹{it.price}
                                </p>
                              </div>
                              <p className="text-sm font-semibold text-gray-700">
                                ₹{(it.qty || 1) * (it.price || 0)}
                              </p>
                            </div>
                          ))
                        )}

                        {/* More order details */}
                        <div className="pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Payment:</span>{" "}
                            {order.payment_method || "—"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Shipping:</span>{" "}
                            {order.shipping_address || "—"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">
                          {items
                            .slice(0, 2)
                            .map((it) => it.name)
                            .join(", ") || "—"}
                          {items.length > 2
                            ? ` + ${items.length - 2} more`
                            : ""}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMarkCompleted(order.id)}
                        disabled={actionLoading || order.status === "Completed"}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700 cursor-default"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {order.status === "Completed"
                          ? "Completed"
                          : "Mark Completed"}
                      </button>

                      <button
                        onClick={() => handleDelete(order.id)}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">Order ID</p>
                      <p className="text-sm font-mono text-gray-700">
                        #{order.id}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOrders;
