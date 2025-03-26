import { Departamento } from './documento';
import  { Usuario } from './documento';


export interface MovimientoDocumento {
    idMovimiento: number;
    fechaMovimiento: string;
    comentarios: string;
    departamentoOrigen: Departamento;
    departamentoDestino: Departamento;
    usuarioEnvia: Usuario;
    usuarioRecibe: Usuario;
  }
  