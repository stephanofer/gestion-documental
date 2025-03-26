import axios from "axios";
import { Usuario } from "@/store/UsuarioStore";

const API_URL = "http://localhost:8080/usuarios";

const getAuthToken = () => localStorage.getItem("token");

export const usuarioService = {
  obtenerTodos: async (): Promise<Usuario[]> => {
    const token = getAuthToken();
    const response = await axios.get<Usuario[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  crearUsuario: async (usuario: Omit<Usuario, "departamento" | "rol"> & { contrasena: string; idDepartamento: number; idRol: number }): Promise<Usuario> => {
    const token = getAuthToken();
    const response = await axios.post<Usuario>(API_URL, usuario, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  actualizarUsuario: async (id: number, usuarioActualizado: Partial<Usuario>): Promise<Usuario> => {
    const token = getAuthToken();
    const response = await axios.put<Usuario>(`${API_URL}/${id}`, usuarioActualizado, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  cambiarEstadoUsuario: async (id: number): Promise<Usuario> => {
    const token = getAuthToken();
    const response = await axios.put<Usuario>(`${API_URL}/${id}/estado`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  
};