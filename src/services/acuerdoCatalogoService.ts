import axios from "axios";
import { AcuerdoMarco } from "@/types/acuerdoMarco";
import { CatalogoElectronico } from "@/types/catalogoElectronico";

const API_URL_ACUERDO = "http://localhost:8080/acuerdos";
const API_URL_CATALOGO = "http://localhost:8080/catalogos";

const getAuthToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getAuthToken()}`, "Content-Type": "application/json" },
});

export const AcuerdoMarcoService = {
  async obtenerAcuerdosMarco(): Promise<AcuerdoMarco[]> {
    const response = await axios.get<AcuerdoMarco[]>(API_URL_ACUERDO, authHeaders());
    return response.data;
  },
  async crearAcuerdo(acuerdo: AcuerdoMarco): Promise<AcuerdoMarco> {
    const response = await axios.post<AcuerdoMarco>(API_URL_ACUERDO, acuerdo, authHeaders());
    return response.data;
  },
  async actualizarAcuerdo(id: number, acuerdo: AcuerdoMarco): Promise<AcuerdoMarco> {
    const response = await axios.put<AcuerdoMarco>(`${API_URL_ACUERDO}/${id}`, acuerdo, authHeaders());
    return response.data;
  },
  async eliminarAcuerdo(id: number): Promise<void> {
    await axios.delete(`${API_URL_ACUERDO}/${id}`, authHeaders());
  },
};

export const CatalogoService = {
  async obtenerCatalogosPorAcuerdo(idAcuerdo: number): Promise<CatalogoElectronico[]> {
    const response = await axios.get<CatalogoElectronico[]>(`${API_URL_CATALOGO}/acuerdo/${idAcuerdo}`, authHeaders());
    return response.data;
  },
  async obtenerTodosLosCatalogos(): Promise<CatalogoElectronico[]> { // ✅ Nueva función
    const response = await axios.get<CatalogoElectronico[]>(API_URL_CATALOGO, authHeaders());
    return response.data;
  },
  async crearCatalogo(catalogo: CatalogoElectronico): Promise<CatalogoElectronico> {
    const response = await axios.post<CatalogoElectronico>(API_URL_CATALOGO, catalogo, authHeaders());
    return response.data;
  },
  async actualizarCatalogo(id: number, catalogo: CatalogoElectronico): Promise<CatalogoElectronico> {
    const response = await axios.put<CatalogoElectronico>(`${API_URL_CATALOGO}/${id}`, catalogo, authHeaders());
    return response.data;
  },
  async eliminarCatalogo(id: number): Promise<void> {
    await axios.delete(`${API_URL_CATALOGO}/${id}`, authHeaders());
  },
};
