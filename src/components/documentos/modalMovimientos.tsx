import { useMovimientoStore } from "@/store/MovimientoStore";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalMovimientosProps {
  idDocumento: number;
  isOpen: boolean;
  onClose: () => void;
}

const ModalMovimientos = ({ idDocumento, isOpen, onClose }: ModalMovimientosProps) => {
  const { movimientos, cargarMovimientos } = useMovimientoStore();

  useEffect(() => {
    if (isOpen) {
      cargarMovimientos(idDocumento);
    }
  }, [isOpen, idDocumento, cargarMovimientos]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Movimientos del Documento</DialogTitle>
        </DialogHeader>
        <div className="max-h-60 overflow-y-auto">
          {movimientos.length > 0 ? (
            movimientos.map((mov, index) => (
              <div key={index} className="border-b py-2">
                <p><strong>Origen:</strong> {mov.departamentoOrigen?.nombreDepartamento || "N/A"}</p>
                <p><strong>Destino:</strong> {mov.departamentoDestino?.nombreDepartamento || "N/A"}</p>
                <p><strong>Fecha:</strong> {new Date(mov.fechaMovimiento).toLocaleString()}</p>
                <p><strong>Comentario:</strong> {mov.comentarios || "Sin comentarios"}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay movimientos registrados.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMovimientos;