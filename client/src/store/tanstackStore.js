import { create } from "zustand";
import {
  fetchExpenses,
  creatExpense,
  createEarning,
  deleteTransaction,
  fetchTotals,
} from "./api/services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUiStore = create((set) => ({
  succSignal: false,
  triggerSuccess: () => {
    set({ succSignal: true });
    setTimeout(() => set({ succSignal: false }), 1500);
  },
}));

export const useExpenseData = (page = 1, limit = 15, query = "all") => {
  const queryClient = useQueryClient();
  const { triggerSuccess } = useUiStore();

  const expensesQuery = useQuery({
    queryKey: ["expenses", { page, limit, query }],
    queryFn: () => fetchExpenses({ page, limit, query }),
    keepPreviousData: true,
  });

  const totalQuery = useQuery({
    queryKey: ["totals"],
    queryFn: fetchTotals,
  });

  const refreshAllData = () => {
    queryClient.invalidateQueries({ queryKey: ["expenses"] });
    queryClient.invalidateQueries({ queryKey: ["totals"] });
  };
};
const addExpenseMutation = useMutation({
  mutationFn: creatExpense,
  onSuccess: () => {
    refreshAllData();
    triggerSuccess();
  },
});
const addEarningMutation = useMutation({
  mutationFn: createEarning,
  onSuccess: () => {
    refreshAllData();
    triggerSuccess();
  },
});
const removeTransactionMutation = useMutation({
  mutationFn: deleteTransaction,
  onSuccess: () => refreshAllData(),
});
return {
  expenses: expensesQuery.data || {
    allTransaction: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    totals: totalQuery.data || [],
    isLoading: expensesQuery.isLoading || totalQuery.isLoading,
    isError: expensesQuery.isError || totalQuery.isError,

    addExpense: addExpenseMutation.mutate,
    isAddingExpense: addExpenseMutation.isLoading,

    addEarning: addEarningMutation.mitate,
    isAddingExpense: addEarningMutation.isLoading,

    removeExpense: removeTransactionMutation.mutate,
  },
};
