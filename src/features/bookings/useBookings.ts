import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { bookingApiResult } from '../../types/bookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { bookings, count },
    isLoading,
    error,
  } = useQuery<{ bookings: Array<bookingApiResult>; count: number }>({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    void queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    void queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
