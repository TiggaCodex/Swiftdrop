import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyDeliveries() {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please log in to view your deliveries.");
      navigate("/login");
      return;
    }

    setCurrentUser(user);

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(
      (order) => order.createdBy === user.email
    );
    setOrders(userOrders);
  }, [navigate]);

  const handleDelete = (trackingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this delivery?"
    );
    if (!confirmDelete) return;

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = allOrders.filter(
      (order) => order.trackingId !== trackingId
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setOrders((prev) => prev.filter((order) => order.trackingId !== trackingId));
  };

  const handleStatusChange = (trackingId, newStatus) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = allOrders.map((order) =>
      order.trackingId === trackingId ? { ...order, status: newStatus } : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setOrders((prev) =>
      prev.map((order) =>
        order.trackingId === trackingId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
          My Deliveries
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t created any deliveries yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm md:text-base">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Tracking ID</th>
                  <th className="px-4 py-2 text-left">Receiver</th>
                  <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.trackingId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 font-semibold text-red-600">
                      {order.trackingId}
                    </td>
                    <td className="px-4 py-2">{order.receiver}</td>
                    <td className="px-4 py-2">{order.receiverAddress}</td>
                    <td className="px-4 py-2">{order.deliveryCategory}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.trackingId, e.target.value)
                        }
                        className={`border p-1 rounded-md ${
                          order.status === "Delivered"
                            ? "text-green-600 border-green-400"
                            : order.status === "In Transit"
                            ? "text-blue-600 border-blue-400"
                            : order.status === "Cancelled"
                            ? "text-red-600 border-red-400"
                            : "text-yellow-600 border-yellow-400"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{order.date}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(order.trackingId)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}