import { apiClient } from '@/services/apiClient';
import { useMutation } from '@tanstack/react-query';
import { LoginDTO, LoginResponse } from '../types/loginDTO';

const login = async (login: LoginDTO): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('auth/login', login);
  return response.data;
};

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.token)
    }
  });
}
