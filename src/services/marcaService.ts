import axios from "axios";
import { MarcaDTO } from "@/types/marca";

const API_URL = "http://localhost:8080/marcas";

const getAuthToken = () => localStorage.getItem("token");

export const MarcaService = {
  async obtenerMarcas(): Promise<MarcaDTO[]> {
    const token = getAuthToken();
    const response = await axios.get<MarcaDTO[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
