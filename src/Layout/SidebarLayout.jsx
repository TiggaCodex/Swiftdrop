import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function SidebarLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 🧭 Sidebar Section */}
      <aside className="w-64 bg-white shadow-md border-r">
        <Sidebar />
      </aside>

      {/* 📦 Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}