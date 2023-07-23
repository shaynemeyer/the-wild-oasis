import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: async () => {
      toast.success('Booking deleted');
      await queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (err: { message: string }) => toast.error(err?.message),
  });

  return { isDeleting, deleteBooking };
}
