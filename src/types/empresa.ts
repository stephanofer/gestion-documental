export interface EmpresaDTO {
    idEmpresa: number;
    nombreEmpresa: string;
    ruc: string;
    direccion: string;
    telefono: string;
    email: string;
    fechaCreacion: string; // Usamos string porque Date en JSON se maneja como string
    activo: boolean;
  }
  