import { useQuery } from '@tanstack/react-query';
import { getEmployee } from '../api/employeeApi';

export const useEmployee = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['employees', search, phone, limit, page],
    queryFn: () => getEmployee({ search, phone, limit, page }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    onError: (error) => {
      console.log('fail to fetch Employee', error);
    },
  });
};
