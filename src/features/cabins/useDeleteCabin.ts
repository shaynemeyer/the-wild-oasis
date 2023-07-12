import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: async () => {
      toast.success('Cabin deleted');
      await queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: { message: string }) => toast.error(err?.message),
  });

  return { isDeleting, deleteCabin };
}
