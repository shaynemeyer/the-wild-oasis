import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { bookingApiResult } from '../../types/bookings';

export function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<Array<bookingApiResult>>({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}
