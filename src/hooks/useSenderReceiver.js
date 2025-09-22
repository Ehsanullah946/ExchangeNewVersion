import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createSenderReceiver,
  getSenderReceiver,
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

export const useCreateSenderReceiver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSenderReceiver,
    onSuccess: () => {
      queryClient.invalidateQueries(['senderReceivers']);
    },
  });
};
