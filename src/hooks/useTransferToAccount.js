import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTransferToAccount,
  deleteTransferToAccount,
  getSingleTransferToAccount,
  getTransferToAccount,
  updateTransferToAccount,
} from '../api/transferToAccount';

export const useTransferToAccount = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['transferToAccount', search, limit, page],
    queryFn: () => getTransferToAccount({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch transferToAccount', error);
    },
  });
};
export const useSingleTransferToAccount = (id) => {
  return useQuery({
    queryKey: ['transferToAccount', id],
    queryFn: () => getSingleTransferToAccount(id),
    onError: (error) => {
      console.log('failed to fetch single transferToAccount', error);
    },
  });
};

export const useCreateTransferToAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransferToAccount,
    onSuccess: () => {
      queryClient.invalidateQueries['transferToAccount'];
    },
  });
};
export const useUpdateTransferToAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransferToAccount,
    onSuccess: () => {
      queryClient.invalidateQueries['transferToAccount'];
    },
  });
};
export const useDeleteTransferToAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransferToAccount,
    onSuccess: () => {
      queryClient.invalidateQueries['transferToAccount'];
    },
  });
};
