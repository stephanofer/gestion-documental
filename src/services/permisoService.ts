import axios from "axios";

const API_PERMISOS = "http://localhost:8080/permisos";

const getAuthToken = () => localStorage.getItem("token");

export interface Permiso {
  idPermiso: number;
  nombrePermiso: string;
}

export interface CrearPermisoDTO {
  nombrePermiso: string;
}

export const permisoService = {
  obtenerTodos: async (): Promise<Permiso[]> => {
    const token = getAuthToken();
    const response = await axios.get<Permiso[]>(API_PERMISOS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  crearPermiso: async (nuevoPermiso: CrearPermisoDTO): Promise<Permiso> => {
    const token = getAuthToken();
    const response = await axios.post<Permiso>(API_PERMISOS, nuevoPermiso, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  eliminarPermiso: async (id: number): Promise<void> => {
    const token = getAuthToken();
    await axios.delete(`${API_PERMISOS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
