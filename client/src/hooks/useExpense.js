import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../store/api/axiosInstance";
import { queryClient } from "../queryClient";

export function useExpenses(currentPage = 1, limit, value) {
  return useQuery({
    queryKey: ["expense", currentPage, limit, value],
    queryFn: async () => {
      const res = await api.get(
        `/expense/${value}?page=${currentPage}&limit=${limit}`,
      );
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

export function useFilterTxn(query = "all", page = 1) {
  return useQuery({
    queryKey: ["expense", "filtered", query, page],
    queryFn: async () => {
      const endpoint = `/expense/filter/${query}?page=${page}&limit=${limit}`;
      const { data } = await api.get(endpoint);
      return data;
    },
    enabled: Boolean(query && query !== "NA"),
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
