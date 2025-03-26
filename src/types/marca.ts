import { EmpresaDTO } from "./empresa";

export interface MarcaDTO {
  idMarca: number;
  nombreMarca: string;
  descripcion: string;
  empresa: EmpresaDTO;
}