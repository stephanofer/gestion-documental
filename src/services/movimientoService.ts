import axios from "axios";
import { MovimientoDocumento } from "@/types/movimientoDocumento";

const API_URL = "http://localhost:8080/movimientos";

const getAuthToken = () => localStorage.getItem("token");

export const movimientoService = {
  obtenerMovimientosPorDocumento: async (idDocumento: number): Promise<MovimientoDocumento[]> => {
    const token = getAuthToken();
    const response = await axios.get<MovimientoDocumento[]>(`${API_URL}/${idDocumento}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
