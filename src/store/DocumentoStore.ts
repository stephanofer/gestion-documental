import { create } from "zustand";
import { Documento } from "../types/documento";
import { documentoService } from "../services/documentoService";

interface DocumentoState {
  documentos: Documento[];
  cargarDocumentos: () => Promise<void>;
  subirDocumento: (formData: FormData) => Promise<void>;
  descargarDocumento: (idDocumento: number) => Promise<void>;
}

export const useDocumentoStore = create<DocumentoState>((set) => ({
  documentos: [],

  cargarDocumentos: async () => {
    try {
      const data = await documentoService.obtenerTodos();
      set({ documentos: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Error al cargar documentos:", error);
      set({ documentos: [] });
    }
  },

  subirDocumento: async (formData: FormData) => {
    try {
      await documentoService.subirDocumento(formData);
      await useDocumentoStore.getState().cargarDocumentos(); // Refrescar la lista
    } catch (error) {
      console.error("Error al subir documento:", error);
    }
  },

  descargarDocumento: async (idDocumento: number) => {
    try {
      const fileBlob = await documentoService.descargarDocumento(idDocumento) as Blob;

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `documento_${idDocumento}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error al descargar documento:", error);
    }
  },
}));
