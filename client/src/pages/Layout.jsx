import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useAuthStore } from "../store/authStore";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useMyStore } from "../store/store";
import Navbar from "../component/Navbar";

function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const setToggle = useMyStore((state) => state.setToggle);

  return (
    <div className="relative bg-slate-950 text-white min-h-full overflow-x-hidden">
      <nav className="p-4 bg-slate-900 flex items-center justify-between px-5">
        <div className="flex items-center gap-5">
          <div className="text-2xl cursor-pointer" onClick={() => setToggle("navbar")}>
            <AiOutlineMenuUnfold />
          </div>
          <h1 className="font-bold">Expense Tracker</h1>
        </div>
        <Button
          onClick={() => {
            logout();
            navigate(`/login`);
          }}
        >
          Logout
        </Button>
      </nav>
      <Navbar />

      <main className="p-4 overflow-y-auto">
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
