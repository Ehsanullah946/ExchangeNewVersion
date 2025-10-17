import { useQuery } from '@tanstack/react-query';
import { getDayBook } from '../api/dayBook';

export const useDayBook = (filters) => {
  const queryParams = new URLSearchParams();

  if (filters.date) queryParams.append('date', filters.date);
  if (filters.startDate) queryParams.append('startDate', filters.startDate);
  if (filters.endDate) queryParams.append('endDate', filters.endDate);
  if (filters.page) queryParams.append('page', filters.page);
  if (filters.limit) queryParams.append('limit', filters.limit);

  return useQuery({
    queryKey: ['daybook', filters],
    queryFn: () => getDayBook(queryParams.toString()),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};
