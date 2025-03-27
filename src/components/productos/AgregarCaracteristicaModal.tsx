import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useProductoStore } from "@/store/ProductoStore";
import { ProductoDTO, ValorCaracteristicaDTO } from "@/types/producto";

interface AgregarCaracteristicaModalProps {
  producto: ProductoDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

const AgregarCaracteristicaModal = ({ producto, isOpen, onClose }: AgregarCaracteristicaModalProps) => {
  const { actualizarProducto } = useProductoStore();
  const [nombreCaracteristica, setNombreCaracteristica] = useState("");
  const [valorCaracteristica, setValorCaracteristica] = useState("");

  const handleAgregar = async () => {
    if (!producto || producto.idProducto === undefined) {
      console.error("Error: El producto no tiene un ID válido.");
      return;
    }
  
    const nuevaCaracteristica: ValorCaracteristicaDTO = {
      idValorCaracteristica: Math.floor(Math.random() * 1000000),
      idCaracteristica: Math.floor(Math.random() * 1000000),
      nombreCaracteristica,
      valor: valorCaracteristica,
    };
  
    const productoActualizado: ProductoDTO = {
      ...producto,
      caracteristicas: [...(producto.caracteristicas || []), nuevaCaracteristica],
    };
  
    await actualizarProducto(producto.idProducto, productoActualizado);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Característica</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Nombre de la característica"
            value={nombreCaracteristica}
            onChange={(e) => setNombreCaracteristica(e.target.value)}
          />
          <Input
            placeholder="Valor"
            value={valorCaracteristica}
            onChange={(e) => setValorCaracteristica(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleAgregar} disabled={!nombreCaracteristica || !valorCaracteristica}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgregarCaracteristicaModal;
