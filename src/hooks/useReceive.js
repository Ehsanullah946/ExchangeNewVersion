import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createReceive, getReceive } from '../api/receiveApi';

export const useReceive = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['receive', search, limit, page],
    queryFn: () => getReceive({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching receive:', error);
    },
  });
};

export const useCreateReceive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReceive,
    onSuccess: () => {
      queryClient.invalidateQueries(['receive']);
    },
  });
};
