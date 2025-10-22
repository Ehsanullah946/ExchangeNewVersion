// hooks/useRate.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteRate,
  getRates,
  createRate,
  updateRate,
  getRateById,
} from '../api/rateApi';

export const useRates = (page = 1, limit = 50, filters = {}) => {
  return useQuery({
    queryKey: ['rates', page, limit, filters],
    queryFn: () => getRates({ page, limit, ...filters }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching rates:', error);
    },
  });
};

export const useDeleteRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRate,
    onSuccess: () => {
      queryClient.invalidateQueries(['rates']);
    },
  });
};

export const useCreateRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRate,
    onSuccess: () => {
      queryClient.invalidateQueries(['rates']);
    },
  });
};

export const useUpdateRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => updateRate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['rates']);
    },
  });
};

export const useRate = (id) => {
  return useQuery({
    queryKey: ['rate', id],
    queryFn: () => getRateById(id),
    enabled: !!id,
  });
};
