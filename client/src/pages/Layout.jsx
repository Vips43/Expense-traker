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
    // changed h-full to fixed h-screen with absolute overflow block
    <div className="relative bg-slate-950 text-white flex flex-col h-dvh w-full overflow-hidden">
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

      <main className="flex-1 min-h-0 p-4 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

export function ProtectedRoute() {
  const { user } = useAuthStore();

  if (!user || !user.name) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
