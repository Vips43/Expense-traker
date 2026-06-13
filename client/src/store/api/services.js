import { useAuthStore } from "../authStore";
import { useMyStore } from "../store";

const getAuthHeaders = () => {
  const token = useAuthStore.getState().user?.token;
  if (!token) throw new Error("No token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (res) => {
  if (res.status === 401) {
    useMyStore.getState().setAlert("Token Expired! logging out");
    useAuthStore.getState().logout();
    throw new Error("Unauthorised");
  }
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Server error: ${res.status}`);
  }
  return res.json();
};

export const fetchExpenses = async ({
  page = 1,
  limit = 15,
  query = "all",
}) => {
  const headers = getAuthHeaders();
  const url =
    query === "all"
      ? `/api/expense?page=${page}&limit=${limit}`
      : `api/filter/${query}?page=${page}&limit=${limit}`;

  const method = query === "all" ? "GET" : "POST";
  const res = await fetch(url, { method, headers });
  return handleResponse(res);
};

export const fetchTotals = async () => {
  const res = await fetch(`/api/totalExp`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
export const creatExpense = async (exp) => {
  const res = await fetch(`api/expense`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(exp),
  });
  return handleResponse(res);
};

export const createEarning = async (earning) => {
  const res = await fetch(`api/earning`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(earning),
  });
  return handleResponse(res);
};
export const deleteTransaction = async ({ id, type }) => {
  const res = await fetch(`api/txn/${id}?type=${type}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (res.status === 401) return handleResponse(res);
  if (!res.ok) throw new Error("Delete failed");

  return true;
};
