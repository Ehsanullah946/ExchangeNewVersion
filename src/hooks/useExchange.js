import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createExchange, getExchange } from '../api/exchangeApi';

export const useExchange = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['exchange', search, limit, page],
    queryFn: () => getExchange({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch Employee', error);
    },
  });
};

export const useCreateExchange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExchange,
    onSuccess: () => {
      queryClient.invalidateQueries['exchange'];
    },
  });
};
