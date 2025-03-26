import { create } from "zustand";
import { AcuerdoMarcoService, CatalogoService } from "../services/acuerdoCatalogoService";
import { AcuerdoMarco } from "@/types/acuerdoMarco";
import { CatalogoElectronico } from "@/types/catalogoElectronico";


interface AcuerdoMarcoState {
  acuerdos: AcuerdoMarco[];
  idAcuerdo: number | null; // Agregado
  setIdAcuerdo: (id: number) => void; // Agregado
  cargarAcuerdos: () => Promise<void>;
}

export const useAcuerdoMarcoStore = create<AcuerdoMarcoState>((set) => ({
  acuerdos: [],
  idAcuerdo: null, // Inicializado
  setIdAcuerdo: (id) => set({ idAcuerdo: id }), // Setter
  cargarAcuerdos: async () => {
    const acuerdos = await AcuerdoMarcoService.obtenerAcuerdosMarco();
    set({ acuerdos });
  },
}));

interface CatalogoState {
  catalogos: CatalogoElectronico[];
  cargarCatalogos: (idAcuerdo: number) => Promise<void>;
  cargarTodosLosCatalogos: () => Promise<void>; // ✅ Nueva función
  limpiarCatalogos: () => void;
}

export const useCatalogoStore = create<CatalogoState>((set) => ({
  catalogos: [],
  cargarCatalogos: async (idAcuerdo) => {
    const catalogos = await CatalogoService.obtenerCatalogosPorAcuerdo(idAcuerdo);
    set({ catalogos });
  },
  cargarTodosLosCatalogos: async () => {
    const catalogos = await CatalogoService.obtenerTodosLosCatalogos(); // ✅ Debes tener un endpoint en tu backend
    set({ catalogos });
  },
  limpiarCatalogos: () => set({ catalogos: [] }),
}));