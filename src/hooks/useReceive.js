import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createReceive,
  deleteReceive,
  getReceive,
  getSingleReceive,
  rejectReceive,
  updateReceive,
  UpdateReceiveReceiver,
  UpdateReceiveSender,
} from '../api/receiveApi';

export const useReceive = (
  search = '',
  number = '',
  moneyType = '',
  branch = '',
  fromDate = '',
  toDate = '',
  limit = 10,
  page = 1
) => {
  return useQuery({
    queryKey: [
      'receive',
      search,
      number,
      moneyType,
      branch,
      fromDate,
      toDate,
      limit,
      page,
    ],
    queryFn: () =>
      getReceive({
        search,
        number,
        moneyType,
        branch,
        fromDate,
        toDate,
        limit,
        page,
      }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching receive:', error);
    },
  });
};

export const useSingleReceive = (id) => {
  return useQuery({
    queryKey: ['receive', id],
    queryFn: () => getSingleReceive(id),
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
export const useUpdateReceiveSender = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateReceiveSender,
    onSuccess: () => {
      queryClient.invalidateQueries(['receive']);
    },
  });
};

export const useUpdateReceiveReceiver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateReceiveReceiver,
    onSuccess: () => {
      queryClient.invalidateQueries(['receive']);
    },
  });
};

export const useUpdateReceive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReceive,
    onSuccess: () => {
      queryClient.invalidateQueries(['receive']);
    },
  });
};
export const useDeleteReceive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReceive,
    onSuccess: () => {
      queryClient.invalidateQueries(['receive']);
    },
  });
};
export const useRejectReceive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectReceive,
    onSuccess: () => {
      queryClient.invalidateQueries(['receive']);
    },
  });
};
