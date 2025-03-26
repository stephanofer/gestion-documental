import { create } from "zustand";
import { usuarioService } from "@/services/usuarioService";
import { departamentoService } from "@/services/departamentoService";
import { rolService } from "@/services/rolService";

export interface Empresa {
  idEmpresa: number;
  nombreEmpresa: string;
}

export interface Departamento {
  idDepartamento: number;
  nombreDepartamento: string;
  empresa?: Empresa;
}

export interface Permiso {
  idPermiso: number;
  nombrePermiso: string;
}


export interface Rol {
  idRol: number;
  nombreRol: string;
  permisos?: Permiso[];
}

export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  nombreCompleto: string;
  email: string;
  departamento?: Departamento;
  rol?: Rol;
  activo: boolean;
}

interface UsuarioStore {
  usuarios: Usuario[];
  departamentos: Departamento[];
  roles: Rol[];
  cargarUsuarios: () => Promise<void>;
  cargarDepartamentos: () => Promise<void>;
  cargarRoles: () => Promise<void>;
  agregarUsuario: (usuario: Omit<Usuario, "departamento" | "rol"> & { contrasena: string; idDepartamento: number; idRol: number }) => Promise<void>;
  actualizarUsuario: (usuarioActualizado: Usuario) => Promise<void>;
  cambiarEstadoUsuario: (id: number) => Promise<void>;
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuarios: [],
  departamentos: [],
  roles: [],

  cargarUsuarios: async () => {
    const usuarios = await usuarioService.obtenerTodos();
    set({ usuarios });
  },

  cargarDepartamentos: async () => {
    const departamentos = await departamentoService.obtenerTodos();
    set({ departamentos });
  },

  cargarRoles: async () => {
    const roles = await rolService.obtenerTodos();
    set({ roles });
  },

  agregarUsuario: async (usuario) => {
    const nuevoUsuario = await usuarioService.crearUsuario(usuario);
    set((state) => ({ usuarios: [...state.usuarios, nuevoUsuario] }));
  },

  actualizarUsuario: async (usuarioActualizado) => {
    if (!usuarioActualizado.idUsuario) {
        console.error("Error: El ID del usuario es inválido", usuarioActualizado);
        return;
    }

    const usuarioModificado = await usuarioService.actualizarUsuario(usuarioActualizado.idUsuario, usuarioActualizado);
    set((state) => ({
        usuarios: state.usuarios.map((usuario) =>
            usuario.idUsuario === usuarioActualizado.idUsuario ? usuarioModificado : usuario
        ),
    }));
},

cambiarEstadoUsuario: async (id) => {
    if (!id) {
        console.error("Error: El ID del usuario es inválido");
        return;
    }

    const usuarioActualizado = await usuarioService.cambiarEstadoUsuario(id);
    set((state) => ({
        usuarios: state.usuarios.map((usuario) =>
            usuario.idUsuario === usuarioActualizado.idUsuario ? usuarioActualizado : usuario
        ),
    }));
},

}));
