import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExchange,
  deleteExchange,
  getExchange,
  getSingleExchange,
  updateExchange,
} from '../api/exchangeApi';

export const useExchange = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['exchange', search, limit, page],
    queryFn: () => getExchange({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch exchange', error);
    },
  });
};
export const useSingleExchange = (id) => {
  return useQuery({
    queryKey: ['exchange', id],
    queryFn: () => getSingleExchange(id),
    onError: (error) => {
      console.log('failed to fetch exchange', error);
    },
  });
};

export const useCreateExchange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExchange,
    onSuccess: () => {
      queryClient.invalidateQueries(['exchange']);
    },
  });
};
export const useUpdateExchange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExchange,
    onSuccess: () => {
      queryClient.invalidateQueries(['exchange']);
    },
  });
};

export const useDeleteExchange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExchange,
    onSuccess: () => {
      queryClient.invalidateQueries(['exchange']);
    },
  });
};
