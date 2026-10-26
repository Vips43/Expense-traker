import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useMyStore } from "../store/store";
import Navbar from "../component/Navbar";
import { Button } from "flowbite-react";
import { GrAnalytics } from "react-icons/gr";
import Analytics from "../component/Analytics";
import { Toaster } from "react-hot-toast";

function Layout() {
  const setToggle = useMyStore((state) => state.setToggle);

  return (
    <div className="bg-slate-950 text-white flex flex-col h-full w-full min-h-0">
      <nav className="p-4 bg-slate-900 flex items-center justify-between px-5 h-16 shrink-0">
        <div className="flex items-center gap-5">
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setToggle("navbar")}
          >
            <AiOutlineMenuUnfold />
          </div>
          <h1 className="font-bold">Expense Tracker</h1>
        </div>
        <Toaster />
        <Button
          color="alternative"
          className="text-2xl text-cyan-600!"
          onClick={() => setToggle("analytics")}
        >
          <GrAnalytics />
        </Button>
      </nav>

      <Navbar />
      <Analytics />

      {/* min-h-0 is mandatory in flexbox to allow overflow-y-auto to take effect */}
      <main className="flex-1 min-h-0 px-2 py-2 overflow-y-auto flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

export function ProtectedRoute() {
  const user = useAuthStore((state) => state?.user);

  if (!user?.name || !user?.id) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
