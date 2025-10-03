import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createConsumption,
  deleteConsumption,
  getConsumption,
  getSingleConsumption,
  updateConsumption,
} from '../api/consumptionApi';
import { use } from 'react';

export const useConsumption = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['consumption', search, limit, page],
    queryFn: () => getConsumption({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('Error fetching consumption', error);
    },
  });
};

export const useSingleConsumption = (id) => {
  return useQuery({
    queryKey: ['consumption', id],
    queryFn: () => getSingleConsumption(id),
    onError: (error) => {
      console.log('Error fetching single consumption', error);
    },
  });
};

export const useCreateConsumption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries(['consumption']);
    },
  });
};

export const useUpdateConsumption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries(['consumption']);
    },
  });
};

export const useDeleteConsumption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries(['consumption']);
    },
  });
};
