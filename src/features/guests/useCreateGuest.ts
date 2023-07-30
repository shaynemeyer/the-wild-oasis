import { useQueryClient } from "@tanstack/react-query";


export function useCreateGuest() {
  const queryClient = useQueryClient();

  return {
    isLoading: false,

  }
}