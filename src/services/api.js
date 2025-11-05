// src/services/api.js
// Loads initial mock JSON from /mock/orders.json (public), then persists to localStorage.
// Exposes functions to read/write/update orders.

const STORAGE_KEY = "dm_orders_v1";

// fetch seed mock file (only once if localStorage empty)
export async function loadOrdersFromStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed parse local orders", e);
    }
  }
  // fallback: fetch public mock json
  try {
    const res = await fetch("/mock/orders.json");
    if (!res.ok) throw new Error("failed to fetch mock");
    const json = await res.json();
    // save to localStorage for mutability
    localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
    return json;
  } catch (e) {
    console.error(e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function makeId() {
  return "o-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

export async function createOrder({ item, description, pickup, dropoff, phone, notes }) {
  const now = new Date().toISOString();
  const id = makeId();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const order = {
    id,
    item,
    description,
    pickup,
    dropoff,
    phone,
    notes,
    status: "Created",
    history: [{ status: "Created", ts: now }],
    otp,
    proof: null,
    createdAt: now,
    updatedAt: now
  };
  const list = readAll();
  list.unshift(order);
  writeAll(list);
  return order;
}

export async function listOrders() {
  return readAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getOrder(id) {
  return readAll().find((o) => o.id === id) || null;
}

export async function updateOrderStatus(id, newStatus, extra = {}) {
  const list = readAll();
  const idx = list.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error("Order not found");
  const now = new Date().toISOString();
  list[idx].status = newStatus;
  list[idx].updatedAt = now;
  if (!list[idx].history) list[idx].history = [];
  list[idx].history.push({ status: newStatus, ts: now });
  if (extra.proof) list[idx].proof = extra.proof;
  writeAll(list);
  return list[idx];
}