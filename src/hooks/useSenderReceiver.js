import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createSenderReceiver,
  deleteSenderReceiver,
  getSenderReceiver,
  getSingleSenderReceiver,
  updateSenderReceiver,
} from '../api/senderReceiverApi';

export const useSenderReceiver = (
  search = '',
  phone = '',
  limit = 10,
  page = 1
) => {
  return useQuery({
    queryKey: ['senderReceivers', search, phone, limit, page],
    queryFn: () => getSenderReceiver({ search, phone, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch exchanger', error);
    },
  });
};
export const useSingleSenderReceiver = (id) => {
  return useQuery({
    queryKey: ['senderReceivers', id],
    queryFn: () => getSingleSenderReceiver(id),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch senderReceiver', error);
    },
  });
};

export const useCreateSenderReceiver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSenderReceiver,
    onSuccess: () => {
      queryClient.invalidateQueries(['senderReceivers']);
    },
  });
};
export const useUpdateSenderReceiver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSenderReceiver,
    onSuccess: () => {
      queryClient.invalidateQueries(['senderReceivers']);
    },
  });
};
export const useDeleteSenderReceiver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSenderReceiver,
    onSuccess: () => {
      queryClient.invalidateQueries(['senderReceivers']);
    },
  });
};
