import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editGuestApi } from '../../services/apiGuest';
import { toast } from 'react-hot-toast';
import { guestItem } from '../../types/guests';

export function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuest, isLoading: isEditingGuest } = useMutation({
    mutationFn: ({
      updateGuestData,
      id,
    }: {
      updateGuestData: guestItem;
      id: number;
    }) => editGuestApi({ updateGuestData, id }),
    onSuccess: async () => {
      toast.success('Cabin successfully edited');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { editGuest, isEditingGuest };
}
