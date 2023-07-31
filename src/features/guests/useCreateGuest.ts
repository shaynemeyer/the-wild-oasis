import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { createGuestApi } from '../../services/apiGuest';

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreatingGuest } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: async () => {
      toast.success("New guest created successfully");
      await queryClient.invalidateQueries({
        queryKey: ['guests']
      });
    }, 
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    isCreatingGuest,
    createGuest
  }
}