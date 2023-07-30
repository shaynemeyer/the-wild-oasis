import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuest';
import { guestItem } from '../../types/guests';

export function useGuests() {
  const {
    data: guests,
    isLoading,
    error,
  } = useQuery<Array<guestItem>>({
    queryKey: ['guests'],
    queryFn: getGuests,
  });

  return { isLoading, error, guests };
}