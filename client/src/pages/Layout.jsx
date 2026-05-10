import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useAuthStore } from "../store/authStore";

function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-5 sticky top-0 z-999">
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

      <main className="p-4">
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
