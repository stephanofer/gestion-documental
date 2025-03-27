import axios from "axios";

const API_CARACTERISTICAS = "http://localhost:8080/caracteristicas";

const getAuthToken = () => localStorage.getItem("token");

export interface ValorCaracteristica {
    idValorCaracteristica: number;  // Asegura que esta clave existe
    idCaracteristica: number;
    nombreCaracteristica: string;
    valor: string;
  }

export interface Caracteristica {
    idCaracteristica: number;
    nombreCaracteristica: string | null;
    valores: ValorCaracteristica[];
  }

export interface CrearCaracteristicaDTO {
  nombreCaracteristica: string;
}

export const caracteristicaService = {
  obtenerTodas: async (): Promise<Caracteristica[]> => {
    const token = getAuthToken();
    const response = await axios.get<Caracteristica[]>(API_CARACTERISTICAS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Caracteristica> => {
    const token = getAuthToken();
    const response = await axios.get<Caracteristica>(`${API_CARACTERISTICAS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  crearCaracteristica: async (nuevaCaracteristica: CrearCaracteristicaDTO): Promise<Caracteristica> => {
    const token = getAuthToken();
    const response = await axios.post<Caracteristica>(API_CARACTERISTICAS, nuevaCaracteristica, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  actualizarCaracteristica: async (id: number, caracteristica: CrearCaracteristicaDTO): Promise<Caracteristica> => {
    const token = getAuthToken();
    const response = await axios.put<Caracteristica>(`${API_CARACTERISTICAS}/${id}`, caracteristica, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  eliminarCaracteristica: async (id: number): Promise<void> => {
    const token = getAuthToken();
    await axios.delete(`${API_CARACTERISTICAS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
