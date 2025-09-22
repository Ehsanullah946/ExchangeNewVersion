import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAccount, getAccounts } from '../api/accountApi';

export const useAccount = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['accounts', search, phone, limit, page],
    queryFn: () => getAccounts({ search, phone, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    onError: (error) => {
      console.log('some thing went worng:', error);
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
