import { create } from "zustand";
import { MarcaService } from "@/services/marcaService"; // Asegúrate de que el servicio maneje marcas
import { MarcaDTO } from "@/types/marca";

interface MarcaState {
  marcas: MarcaDTO[];
  cargarMarcas: () => Promise<void>;
}

export const useMarcaStore = create<MarcaState>((set) => ({
  marcas: [],

  cargarMarcas: async () => {
    try {
      const marcas = await MarcaService.obtenerMarcas(); // Asegúrate de implementar este método en el servicio
      set({ marcas });
    } catch (error) {
      console.error("❌ Error al cargar marcas:", error);
    }
  },
}));
