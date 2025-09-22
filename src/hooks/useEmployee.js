import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createEmployee, getEmployee } from '../api/employeeApi';
import { use } from 'react';

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

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });
};
