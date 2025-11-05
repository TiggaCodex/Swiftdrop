import React, { useEffect, useState } from "react";
import { listOrders, updateOrderStatus } from "../services/api";
import { Link } from "react-router-dom";

export default function Orders({ orders: propOrders, setOrders }) {
  const [loading, setLoading] = useState(false);
  const [orders, setLocalOrders] = useState(propOrders || []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const l = await listOrders();
      setLocalOrders(l);
      setLoading(false);
      if (setOrders) setOrders(l);
    }
    load();
  }, []);

  useEffect(() => setLocalOrders(propOrders || []), [propOrders]);

  const advance = async (id) => {
    const o = orders.find(x => x.id === id);
    if (!o) return;
    const flow = ["Created", "Assigned", "Picked", "On the way", "Delivered"];
    const idx = flow.indexOf(o.status);
    const next = flow[Math.min(idx + 1, flow.length - 1)];
    if (next === o.status) return;
    await updateOrderStatus(id, next);
    const l = await listOrders();
    setLocalOrders(l);
    if (setOrders) setOrders(l);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Link to="/create" className="px-3 py-2 bg-indigo-600 text-white rounded">Create Order</Link>
      </div>

      {loading ? (
        <div className="p-6 bg-white dark:bg-gray-800 rounded">Loading…</div>
      ) : (
        <div className="grid gap-4">
          {orders.length === 0 && <div className="p-6 bg-white dark:bg-gray-800 rounded">No orders yet</div>}
          {orders.map(o => (
            <div key={o.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{o.item} <span className="text-xs text-gray-500">#{o.id.slice(0,8)}</span></div>
                  <div className="text-sm text-gray-500">{o.pickup} → {o.dropoff}</div>
                  <div className="text-xs text-gray-400 mt-1">{o.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{o.status}</div>
                  <div className="text-xs text-gray-400">{new Date(o.updatedAt).toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => advance(o.id)} className="px-2 py-1 border rounded text-sm">Advance Status</button>
                <Link to={`/track/${o.id}`} className="px-2 py-1 border rounded text-sm">Track</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}