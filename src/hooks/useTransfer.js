import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTransfer,
  deleteTransfer,
  getSingleTransfer,
  getTransfer,
  updateTransfer,
} from '../api/transferApi';

export const useTransfer = (
  search = '',
  number = '',
  moneyType = '',
  branch = '',
  fromDate = '',
  toDate = '',
  limit = 10,
  page = 1
) => {
  return useQuery({
    queryKey: [
      'transfer',
      search,
      number,
      moneyType,
      branch,
      fromDate,
      toDate,
      limit,
      page,
    ],
    queryFn: () =>
      getTransfer({
        search,
        number,
        moneyType,
        branch,
        fromDate,
        toDate,
        limit,
        page,
      }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching transfer:', error);
    },
  });
};
export const useSingleTransfer = (id) => {
  return useQuery({
    queryKey: ['transfer', id],
    queryFn: () => getSingleTransfer(id),
    onError: (error) => {
      console.error('Error fetching transfer:', error);
    },
  });
};

export const useCreateTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries(['transfer']);
    },
  });
};
export const useUpdateTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries(['transfer']);
    },
  });
};
export const useDeleteTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries(['transfer']);
    },
  });
};
