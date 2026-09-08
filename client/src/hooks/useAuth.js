import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (creds) => {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(creds),
        credentials: "include",
      });
      if (!res.ok) throw new Error("login error");

      return await res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("exp-user", JSON.stringify(data));
      useAuthStore.getState().setUser(data.user);
    },
  });
};
