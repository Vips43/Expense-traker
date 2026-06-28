import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../store/api/axiosInstance";
import { queryClient } from "../main.jsx";

export function useExpenses(currentPage = 1, limit = 15) {
  return useQuery({
    queryKey: ["expense", currentPage, limit],
    queryFn: async () => {
      const res = await api.get(`/expense?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });
}

export function useRemoveTxn() {

  return useMutation({
    mutationFn: async ({ id, type }) => {
      const res = await api.delete(`txn/${id}?type=${type}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
}

export function useFilterTxn() {
  return useMutation({
    mutationFn: async ({ query, page = 1, limit = 10 }) => {
      if (query === "all") {
        const { data } = await api.get(`/expense?page=${page}&limit=${limit}`);
        return data;
      }

      const { data } = await api.post(`/expense?page=${page}&limit=${limit}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
}

export function useChartData() {
  return useQuery({
    queryKey: ["expense", "chart"],
    queryFn: async () => {
      const { data } = await api.get("/chartData");
      return data;
    },
  });
}

export function useTotals() {
  return useQuery({
    queryKey: ["expense"],
    queryFn: async () => {
      const res = await api.get("/totalExp");
      return res.data;
    },
  });
}

export function useAddEarning() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (earningData) => {
      const res = await api.post("/earning", earningData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
}

export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expenseData) => {
      const res = await api.post("/expense", expenseData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
}
