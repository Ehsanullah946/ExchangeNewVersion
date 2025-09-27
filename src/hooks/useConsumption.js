import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createConsumption, getConsumption } from '../api/consumptionApi';
import { use } from 'react';

export const useConsumption = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['consumption', search, limit, page],
    queryFn: () => getConsumption({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('Error fetching consumption', error);
    },
  });
};

export const useCreateConsumption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries['consumption'];
    },
  });
};
