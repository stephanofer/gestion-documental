import axios from "axios";
import { Departamento } from "@/store/UsuarioStore";

const API_URL = "http://localhost:8080/departamentos";

const getAuthToken = () => localStorage.getItem("token");

export const departamentoService = {
  obtenerTodos: async (): Promise<Departamento[]> => {
    const token = getAuthToken();
    const response = await axios.get<Departamento[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
