import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash, PlusCircle } from "lucide-react";
import { permisoService, Permiso } from "@/services/permisoService";
import { toast } from "sonner";

const PermisosTable = () => {
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [nombrePermiso, setNombrePermiso] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const data = await permisoService.obtenerTodos();
        setPermisos(data);
      } catch (error) {
        console.error("Error al obtener permisos:", error);
      }
    };
    fetchPermisos();
  }, []);

  const eliminarPermiso = async (id: number) => {
    try {
      await permisoService.eliminarPermiso(id);
      setPermisos((prevPermisos) => prevPermisos.filter((permiso) => permiso.idPermiso !== id));
      toast.success("Permiso eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el permiso:", error);
      toast.error("Error al eliminar el permiso.");
    }
  };

  const agregarPermiso = async () => {
    if (!nombrePermiso.trim()) {
      toast.error("El nombre del permiso no puede estar vacío.");
      return;
    }

    try {
      const nuevoPermiso = await permisoService.crearPermiso({ nombrePermiso });
      setPermisos((prev) => [...prev, nuevoPermiso]);
      setNombrePermiso("");
      setOpen(false);
      toast.success("Permiso agregado correctamente.");
    } catch (error) {
      console.error("Error al agregar permiso:", error);
      toast.error("Error al agregar el permiso.");
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Gestión de Permisos</h2>

      <div className="flex justify-between mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" /> Agregar Permiso
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Permiso</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Nombre del permiso"
              value={nombrePermiso}
              onChange={(e) => setNombrePermiso(e.target.value)}
            />
            <DialogFooter>
              <Button onClick={agregarPermiso}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permisos.map((permiso) => (
              <TableRow key={permiso.idPermiso}>
                <TableCell>{permiso.idPermiso}</TableCell>
                <TableCell>{permiso.nombrePermiso}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="icon" onClick={() => eliminarPermiso(permiso.idPermiso)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PermisosTable;
