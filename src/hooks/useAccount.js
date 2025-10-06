import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  getAllAccountTransaction,
  getSingleAccount,
  updateAccount,
} from '../api/accountApi';

export const useAccount = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['accounts', search, limit, page],
    queryFn: () => getAccounts({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('something went worng:', error);
    },
  });
};
export const useSingleAccount = (id) => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => getSingleAccount(id),
    onError: (error) => {
      console.log('something went single Account worng:', error);
    },
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts']);
    },
  });
};

export const useAllAccountTransaction = (accountId, limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['accounts', accountId, 'transactions', limit, page],
    queryFn: () => {
      if (!accountId) {
        console.error('No customerId provided to useAllTransaction');
        return Promise.resolve({ data: [], total: 0 });
      }
      return getAllAccountTransaction(accountId, { limit, page });
    },
    enabled: !!accountId && !isNaN(accountId),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching all transaction account:', error);
    },
    onSuccess: (data) => {
      console.log('Query successful - data received:', data);
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts']);
    },
  });
};
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts']);
    },
  });
};
