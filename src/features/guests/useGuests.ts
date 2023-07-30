import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuest';
import { guestItem } from '../../types/guests';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGuests() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { guests, count } = {},
    isLoading,
    error,
  } = useQuery<{ guests: Array<guestItem>; count: number }>({
    queryKey: ['guests', page],
    queryFn: () => getGuests({ page }),
  });

  // pre-fetching
  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;

  if (page < pageCount) {
    void queryClient.prefetchQuery({
      queryKey: ['guests', page + 1],
      queryFn: () => getGuests({ page: page + 1 }),
    });
  }

  if (page > 1) {
    void queryClient.prefetchQuery({
      queryKey: ['guests', page - 1],
      queryFn: () => getGuests({ page: page - 1 }),
    });
  }

  return { isLoading, error, guests, count };
}
