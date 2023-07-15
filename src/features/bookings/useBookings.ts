import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { bookingApiResult } from '../../types/bookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : {field:'status', value: filterValue};  

  // sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {field, direction};


  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<Array<bookingApiResult>>({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  });

  return { isLoading, error, bookings };
}
