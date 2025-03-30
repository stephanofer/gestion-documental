import { apiClient } from '@/services/apiClient';
import { useMutation } from '@tanstack/react-query';
import { LoginDTO, LoginResponse } from '../types/loginDTO';
import { AxiosError } from 'axios';

const login = async (login: LoginDTO): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('auth/login', login);
  return response.data;
};

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
