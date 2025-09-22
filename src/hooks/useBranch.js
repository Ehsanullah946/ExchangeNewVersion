import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBranch, getBranch } from '../api/branchApi';

export const useBranch = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['branches', search, phone, limit, page],
    queryFn: () => getBranch({ search, phone, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('Error fetching branches', error);
    },
  });
};

export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries(['branches']);
    },
  });
};
