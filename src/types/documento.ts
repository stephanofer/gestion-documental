export interface Documento {
    idDocumento: number;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaDocumento: string;
    rutaArchivo: string;
    departamentoActual: Departamento;
    usuarioActual: Usuario;
  }
  
  export interface Departamento {
    idDepartamento: number;
    nombreDepartamento: string;
  }
  
  export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    nombreCompleto: string;
    email: string;
    activo: boolean;
    departamento?: Departamento;
  }
  