import { create } from "zustand";
import { movimientoService } from "@/services/movimientoService";
import { MovimientoDocumento } from "@/types/movimientoDocumento";

interface MovimientoState {
  movimientos: MovimientoDocumento[];
  cargarMovimientos: (idDocumento: number) => Promise<void>;
}

export const useMovimientoStore = create<MovimientoState>((set) => ({
  movimientos: [],
  cargarMovimientos: async (idDocumento) => {
    try {
      const movimientos = await movimientoService.obtenerMovimientosPorDocumento(idDocumento);
      set({ movimientos });
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
      set({ movimientos: [] });
    }
  },
}));
