import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTransferToAccount,
  getTransferToAccount,
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

export const useCreateTransferToAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransferToAccount,
    onSuccess: () => {
      queryClient.invalidateQueries['transferToAccount'];
    },
  });
};
