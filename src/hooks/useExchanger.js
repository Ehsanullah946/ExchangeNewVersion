import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createExchanger, getExchanger } from '../api/exchangerApi';

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

export const useCreateExchanger = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExchanger,
    onSuccess: () => {
      queryClient.invalidateQueries(['exchangers']);
    },
  });
};
