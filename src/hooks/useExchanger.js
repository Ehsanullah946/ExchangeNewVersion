import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExchanger,
  deleteExchanger,
  getExchanger,
  updateExchanger,
} from '../api/exchangerApi';

export const useExchanger = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['exchangers', search, phone, limit, page],
    queryFn: () => getExchanger({ search, phone, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch exchanger', error);
    },
  });
};

export const useSingleExchanger = (id) => {
  return useQuery({
    queryKey: ['exchangers', id],
    queryFn: () => getExchanger(id),
    onError: (error) => {
      console.log('failed to fetch exchanger', error);
    },
  });
};

export const useCreateExchanger = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExchanger,
    onSuccess: () => {
      queryClient.invalidateQueries(['exchangers']);
    },
  });
};
export const useUpdateExchanger = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExchanger,
    onSuccess: () => {
      queryClient.invalidateQueries(['exchangers']);
    },
  });
};

export const useDeleteExchanger = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExchanger,
    onSuccess: () => {
      queryClient.invalidateQueries(['exchangers']);
    },
  });
};
