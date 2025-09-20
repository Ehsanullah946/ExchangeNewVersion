import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBranch, getBranch } from '../api/branchApi';

export const useBranch = (search = '', phone = '', limit, page) => {
  return useQuery({
    queryKey: ['branches', search, phone, limit, page],
    queryFn: () => getBranch({ search, phone, limit, page }),
    staleTime: 1000 * 60 * 5,
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
