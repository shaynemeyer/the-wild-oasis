import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useEditingCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: async () => {
      toast.success('Cabin successfully edited');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
