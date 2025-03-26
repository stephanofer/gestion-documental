import axios from "axios";
import { Rol } from "@/store/UsuarioStore";

const API_URL = "http://localhost:8080/roles";

const getAuthToken = () => localStorage.getItem("token");

export const rolService = {
  obtenerTodos: async (): Promise<Rol[]> => {
    const token = getAuthToken();
    const response = await axios.get<Rol[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  crearRol: async (nuevoRol: { nombreRol: string; permisos: number[] }): Promise<Rol> => {
    const token = getAuthToken();
    const response = await axios.post<Rol>(API_URL, nuevoRol, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  },

  eliminarRol: async (id: number): Promise<void> => {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  actualizarRol: async (id: number, data: { permisos: number[] }): Promise<Rol> => {
    const token = getAuthToken();
    const response = await axios.put<Rol>(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  },
};
