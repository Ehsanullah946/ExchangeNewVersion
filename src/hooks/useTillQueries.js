// hooks/queries/useTillQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  closeTill,
  getTillDetail,
  getTillHistory,
  getTodayTill,
  updateTotals,
} from '../api/tillApi';

// Query keys
export const tillKeys = {
  all: ['till'],
  today: () => [...tillKeys.all, 'today'],
  history: (filters) => [...tillKeys.all, 'history', filters],
  detail: (id) => [...tillKeys.all, 'detail', id],
};

// Queries
export const useTodayTill = () => {
  return useQuery({
    queryKey: tillKeys.today(),
    queryFn: () => getTodayTill().then((res) => res.data.data),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useTillHistory = (filters = {}) => {
  return useQuery({
    queryKey: tillKeys.history(filters),
    queryFn: () => getTillHistory(filters).then((res) => res.data),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTillDetail = (id) => {
  return useQuery({
    queryKey: tillKeys.detail(id),
    queryFn: () => getTillDetail(id).then((res) => res.data.data),
    enabled: !!id,
  });
};

// Mutations
export const useCloseTill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (closeData) => closeTill(closeData),
    onSuccess: () => {
      // Invalidate and refetch today's till
      queryClient.invalidateQueries({ queryKey: tillKeys.today() });
      // Invalidate history as well
      queryClient.invalidateQueries({ queryKey: ['till', 'history'] });
    },
  });
};

export const useUpdateTillTotals = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateTotals(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tillKeys.today() });
    },
  });
};
