import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useAuthStore } from "../store/authStore";

function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="bg-slate-950 text-white min-h-full">
      <nav className="p-4 bg-slate-900 flex items-center justify-between px-5">
        <h1 className="font-bold">Expense Tracker</h1>
        <Button
          onClick={() => {
            logout();
            navigate(`/login`);
          }}
        >
          Logout
        </Button>
      </nav>

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
