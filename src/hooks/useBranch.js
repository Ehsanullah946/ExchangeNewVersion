import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBranch, getBranch } from '../api/branchApi';

export const useBranch = (search = '', phone = '') => {
  return useQuery({
    queryKey: ['branches', search, phone],
    queryFn: () => getBranch({ search, phone }),
    staleTime: 1000 * 60 * 5,
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
