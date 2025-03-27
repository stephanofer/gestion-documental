import { create } from "zustand";
import { valorService, ValorCaracteristica } from "@/services/valorService";

interface CrearValorDTO {
    valor: string;
    idCaracteristica: number;
    nombreCaracteristica: string; // 🔹 Se agregó para coincidir con ValorCaracteristica
  }
  
interface ActualizarValorDTO {
    idValorCaracteristica: number;
    valor?: string;
    idCaracteristica?: number;
  }
  

interface ValorState {
  valores: ValorCaracteristica[];
  cargando: boolean;
  obtenerValores: () => Promise<void>;
  crearValor: (nuevoValor: CrearValorDTO) => Promise<void>;
  actualizarValor: (valorActualizado: ActualizarValorDTO) => Promise<void>;
  eliminarValor: (id: number) => Promise<void>;
}

export const useValorStore = create<ValorState>((set) => ({
    valores: [],
    cargando: false,
  
    obtenerValores: async () => {
      set({ cargando: true });
      try {
        const data = await valorService.obtenerTodos();
        set({ valores: data });
      } finally {
        set({ cargando: false });
      }
    },
  
    crearValor: async (nuevoValor: CrearValorDTO) => {
        set({ cargando: true });
        try {
          const valorCreado = await valorService.crearValor(nuevoValor);
          set((state) => ({ valores: [...state.valores, valorCreado] }));
        } finally {
          set({ cargando: false });
        }
      },
      
  
    actualizarValor: async (valorActualizado: ActualizarValorDTO) => {
      set({ cargando: true });
      try {
        const valorEditado = await valorService.actualizarValor(
          valorActualizado.idValorCaracteristica, // Se usa el nuevo ID correcto
          valorActualizado
        );
        set((state) => ({
          valores: state.valores.map((valor) => 
            valor.idValorCaracteristica === valorEditado.idValorCaracteristica ? valorEditado : valor
          ),
        }));
      } finally {
        set({ cargando: false });
      }
    },
  
    eliminarValor: async (id: number) => {
      set({ cargando: true });
      try {
        await valorService.eliminarValor(id);
        set((state) => ({
          valores: state.valores.filter((valor) => valor.idValorCaracteristica !== id),
        }));
      } finally {
        set({ cargando: false });
      }
    },
  }));
  