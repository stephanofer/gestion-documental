import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: {
    id: number | null;
    username: string | null;
    role: string | null;
  };
  login: (userData: { token: string; id: number; username: string; role: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  user: {
    id: null,
    username: null,
    role: null,
  },
  login: ({ token, id, username, role }) => {
    localStorage.setItem("token", token);
    set({ token, user: { id, username, role } });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: { id: null, username: null, role: null } });
  },
}));
