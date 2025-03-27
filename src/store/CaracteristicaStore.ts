import { create } from "zustand";
import { caracteristicaService, Caracteristica, CrearCaracteristicaDTO } from "@/services/caracteristicaService";

interface CaracteristicaState {
  caracteristicas: Caracteristica[];
  cargando: boolean;
  obtenerCaracteristicas: () => Promise<void>;
  crearCaracteristica: (nuevaCaracteristica: CrearCaracteristicaDTO) => Promise<void>;
  eliminarCaracteristica: (id: number) => Promise<void>;
}

export const useCaracteristicaStore = create<CaracteristicaState>((set) => ({
  caracteristicas: [],
  cargando: false,

  obtenerCaracteristicas: async () => {
    set({ cargando: true });
    try {
      const data = await caracteristicaService.obtenerTodas();
      set({ caracteristicas: data });
    } finally {
      set({ cargando: false });
    }
  },

  crearCaracteristica: async (nuevaCaracteristica: CrearCaracteristicaDTO) => {
    set({ cargando: true });
    try {
      const nueva = await caracteristicaService.crearCaracteristica(nuevaCaracteristica);
      set((state) => ({
        caracteristicas: [
          ...state.caracteristicas,
          {
            idCaracteristica: nueva.idCaracteristica,
            nombreCaracteristica: nueva.nombreCaracteristica ?? "Sin nombre",
            valores: nueva.valores ?? [],
          },
        ],
      }));
    } finally {
      set({ cargando: false });
    }
  },
  


  eliminarCaracteristica: async (id: number) => {
    set({ cargando: true });
    try {
      await caracteristicaService.eliminarCaracteristica(id);
      set((state) => ({
        caracteristicas: state.caracteristicas.filter((c) => c.idCaracteristica !== id),
      }));
    } finally {
      set({ cargando: false });
    }
  },
}));
