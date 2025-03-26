import axios from "axios";
import { ProductoDTO } from "@/types/producto";

const API_URL = "http://localhost:8080/productos";

const getAuthToken = () => localStorage.getItem("token");

export const ProductoService = {
  async obtenerProductos(): Promise<ProductoDTO[]> {
    const token = getAuthToken();
    const response = await axios.get<ProductoDTO[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async obtenerProductoPorId(id: number): Promise<ProductoDTO> {
    const token = getAuthToken();
    const response = await axios.get<ProductoDTO>(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async crearProducto(producto: ProductoDTO): Promise<ProductoDTO> {
    const token = getAuthToken();
    const response = await axios.post<ProductoDTO>(API_URL, producto, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  },

  async actualizarProducto(id: number, producto: ProductoDTO): Promise<ProductoDTO> {
    const token = getAuthToken();
    const response = await axios.put<ProductoDTO>(`${API_URL}/${id}`, producto, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  },

  async eliminarProducto(id: number): Promise<void> {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async obtenerProductosPorCatalogo(idCatalogo: number): Promise<ProductoDTO[]> {
    const token = getAuthToken();
    const response = await axios.get<ProductoDTO[]>(`${API_URL}/catalogo/${idCatalogo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async obtenerProductosPorMarca(idMarca: number): Promise<ProductoDTO[]> {
    const token = getAuthToken();
    const response = await axios.get<ProductoDTO[]>(`${API_URL}/marca/${idMarca}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async obtenerProductosPorCatalogoYMarca(idCatalogo: number, idMarca: number): Promise<ProductoDTO[]> {
    const token = getAuthToken();
    const response = await axios.get<ProductoDTO[]>(`${API_URL}/catalogo/${idCatalogo}/marca/${idMarca}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  
};