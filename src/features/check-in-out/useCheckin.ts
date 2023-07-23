import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast:
        | {
            hasBreakfast: boolean;
            extrasPrice: number;
            totalPrice: number;
          }
        | object;
    }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} was successfully checked in`);
      void queryClient.invalidateQueries({ type: 'active' });
      navigate('/');
    },
    onError: () => toast.error('There was an error while checking in.'),
  });

  return { checkin, isCheckingIn };
}
