import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getSingleEmployee,
  updateEmployee,
} from '../api/employeeApi';

export const useEmployee = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['employees', search, phone, limit, page],
    queryFn: () => getEmployee({ search, phone, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch Employee', error);
    },
  });
};
export const useSingleEmployee = (id) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => getSingleEmployee(id),
    onError: (error) => {
      console.log('failed to fetch  single employee', error);
    },
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });
};
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });
};
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });
};
