import { AcuerdoMarco } from "./acuerdoMarco";

export interface CatalogoElectronico {
  idCatalogo: number;
  codigoCatalogo: string;
  descripcionCatalogo: string;
  fechaCreacion: string;
  acuerdoMarco: AcuerdoMarco;
}
