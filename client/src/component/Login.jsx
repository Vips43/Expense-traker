import { Button, Label, TextInput } from "flowbite-react";
import { useUserLogin } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Login() {
  const navigate = useNavigate();

  const { mutateAsync, isSuccess, isPending, isError, error } = useUserLogin();
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = new FormData(e.target);
    const formData = Object.fromEntries(obj);

    await mutateAsync(formData);
  };
  if (isError) console.error(error);
  
  console.log(user);
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);
  return (
    <div className="h-dvh flex items-center justify-center bg-linear-30 from-neutral-900 via-neutral-800 to-neutral-950 w-full p-4 selection:bg-fuchsia-500 selection:text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xs p-6 space-y-5 bg-white/80 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/40 dark:border-neutral-800 rounded-2xl shadow-[0_20px_50px_rgba(217,70,239,0.15)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(217,70,239,0.25)] hover:border-white/60"
      >
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Welcome back
          </h3>
          <p className="text-xs text-neutral-500 font-medium">
            Login to your Expense Tracker
          </p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            value="Email address"
            className="text-xs text-neutral-600 font-semibold tracking-wide uppercase"
          />
          <TextInput
            sizing="sm"
            name="email"
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="[&_input]:rounded-xl [&_input]:border-neutral-300/70 [&_input]:bg-white/50 [&_input]:focus:ring-fuchsia-500 [&_input]:focus:border-fuchsia-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              value="Password"
              className="text-xs text-neutral-600 font-semibold tracking-wide uppercase"
            />
            <a
              href="#"
              className="text-xs text-fuchsia-600 hover:text-fuchsia-700 font-medium hover:underline transition-all"
            >
              Forgot?
            </a>
          </div>
          <TextInput
            sizing="sm"
            name="password"
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="[&_input]:rounded-xl [&_input]:border-neutral-300/70 [&_input]:bg-white/50 [&_input]:focus:ring-fuchsia-500 [&_input]:focus:border-fuchsia-500 transition-all"
          />
        </div>

        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="w-full bg-linear-30 bg-grad-fuschia font-medium border-none shadow-md shadow-fuchsia-500/20 active:scale-[0.98] transition-all duration-150"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

export default Login;
