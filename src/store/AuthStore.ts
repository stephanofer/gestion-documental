import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  role: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (isAuth: boolean, userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('access_token') ? true : false,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setAuth: (isAuth, userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ isAuthenticated: isAuth, user: userData });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  },
}));
