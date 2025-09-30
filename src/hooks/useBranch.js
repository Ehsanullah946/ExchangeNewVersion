import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBranch,
  deleteBranch,
  getBranch,
  getSingleBranch,
  updateBranch,
} from '../api/branchApi';

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

export const useSingleBranch = (id) => {
  return useQuery({
    queryKey: ['branches', id],
    queryFn: () => getSingleBranch(id),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('Error fetching branche', error);
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

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBranch,
    onSuccess: () => {
      queryClient.invalidateQueries(['branches']);
    },
  });
};
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries(['branches']);
    },
  });
};
