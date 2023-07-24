import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user); // set query cache
      navigate('/dashboard');
    },
    onError: (err) => {
      console.log('ERROR:', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoginLoading };
}
