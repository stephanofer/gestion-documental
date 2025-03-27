import axios from "axios";

const API_URL = "http://localhost:8080/valores-caracteristicas";

const getAuthToken = () => localStorage.getItem("token");

export interface ValorCaracteristica {
  idValorCaracteristica: number;
  valor: string;
  idCaracteristica: number;
  nombreCaracteristica: string;
}


export const valorService = {
  obtenerTodos: async (): Promise<ValorCaracteristica[]> => {
    const token = getAuthToken();
    const response = await axios.get<ValorCaracteristica[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<ValorCaracteristica> => {
    const token = getAuthToken();
    const response = await axios.get<ValorCaracteristica>(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  crearValor: async (valor: Omit<ValorCaracteristica, "idValorCaracteristica">): Promise<ValorCaracteristica> => {
    const token = getAuthToken();
    const response = await axios.post<ValorCaracteristica>(API_URL, valor, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },  

  actualizarValor: async (id: number, valorActualizado: Partial<ValorCaracteristica>): Promise<ValorCaracteristica> => {
    const token = getAuthToken();
    const response = await axios.put<ValorCaracteristica>(`${API_URL}/${id}`, valorActualizado, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  eliminarValor: async (id: number): Promise<void> => {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
