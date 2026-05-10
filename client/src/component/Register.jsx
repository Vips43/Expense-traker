import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Register() {
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    await register(formObj);
  };
 
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary-800 p-4">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <input
            type="submit"
            disabled={loading}
            value={loading ? "Registering..." : "Register"}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
          />
        </div>
        <p className="text-xs mt-3 ">
          Already have account use{" "}
          <Link className="underline text-cyan-800" to={`/login`}>
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
