import axios from "axios";

const API_URL = "http://localhost:8080/documentos";

const getAuthToken = () => localStorage.getItem("token");

export const documentoService = {
  obtenerTodos: async () => {
    const token = getAuthToken();
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  subirDocumento: async (formData: FormData) => {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/subir`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  descargarDocumento: async (idDocumento: number) => {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/descargar/${idDocumento}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });
    return response.data;
  },
};
