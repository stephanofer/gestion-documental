import { create } from "zustand";
import { ProductoService } from "../services/productoService";
import { ProductoDTO } from "@/types/producto";

interface ProductoState {
  productos: ProductoDTO[];
  productoSeleccionado: ProductoDTO | null;
  cargarProductosPorCatalogo: (idCatalogo: number) => Promise<void>;
  cargarProductosPorMarca: (idMarca: number) => Promise<void>;
  cargarProductosPorCatalogoYMarca: (idCatalogo: number, idMarca: number | null) => Promise<void>;
  limpiarProductos: () => void;
  eliminarProducto: (id: number) => Promise<void>;
  seleccionarProducto: (producto: ProductoDTO | null) => void;
}

export const useProductoStore = create<ProductoState>((set) => ({
  productos: [],
  productoSeleccionado: null,

  cargarProductosPorCatalogo: async (idCatalogo: number) => {
    console.log("🔍 Cargando productos para catálogo ID:", idCatalogo);
    const productos = await ProductoService.obtenerProductosPorCatalogo(idCatalogo);
    console.log("✅ Productos recibidos:", productos);
    set({ productos });
  },

  cargarProductosPorMarca: async (idMarca: number) => {
    console.log("🔍 Cargando productos para marca ID:", idMarca);
    const productos = await ProductoService.obtenerProductosPorMarca(idMarca);
    console.log("✅ Productos recibidos:", productos);
    set({ productos });
  },

  async cargarProductosPorCatalogoYMarca(idCatalogo, idMarca) {
    let productos = [];
    if (idMarca) {
      productos = await ProductoService.obtenerProductosPorCatalogoYMarca(idCatalogo, idMarca);
    } else {
      productos = await ProductoService.obtenerProductosPorCatalogo(idCatalogo);
    }
    set({ productos });
  },

  limpiarProductos: () => {
    set({ productos: [] });
  },

  eliminarProducto: async (id) => {
    await ProductoService.eliminarProducto(id);
    set((state) => ({ productos: state.productos.filter((p) => p.idProducto !== id) }));
  },

  seleccionarProducto: (producto) => set({ productoSeleccionado: producto }),
}));
