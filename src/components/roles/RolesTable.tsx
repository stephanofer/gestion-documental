import { useEffect, useState } from "react";
import { rolService } from "@/services/rolService";
import { permisoService } from "@/services/permisoService";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Rol } from "@/store/UsuarioStore";
import { Permiso } from "@/services/permisoService";

const RolesTable = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [rolSeleccionado, setRolSeleccionado] = useState<Rol | null>(null);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogCrearOpen, setDialogCrearOpen] = useState(false);
  const [nuevoRol, setNuevoRol] = useState("");

  useEffect(() => {
    cargarRoles();
    cargarPermisos();
  }, []);

  const cargarRoles = async () => {
    try {
      const data = await rolService.obtenerTodos();
      setRoles(data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  const cargarPermisos = async () => {
    try {
      const data = await permisoService.obtenerTodos();
      setPermisos(data);
    } catch (error) {
      console.error("Error al obtener permisos:", error);
    }
  };

  const eliminarRol = async (id: number) => {
    try {
      await rolService.eliminarRol(id);
      cargarRoles();
      toast.success("Rol eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar rol:", error);
      toast.error("Error al eliminar el rol.");
    }
  };

  const abrirDialogo = (rol: Rol) => {
    setRolSeleccionado(rol);
    setPermisosSeleccionados(rol.permisos?.map((p) => p.idPermiso) || []);
    setDialogOpen(true);
  };

  const manejarCambioPermiso = (idPermiso: number) => {
    setPermisosSeleccionados((prev) =>
      prev.includes(idPermiso) ? prev.filter((id) => id !== idPermiso) : [...prev, idPermiso]
    );
  };

  const actualizarPermisos = async () => {
    if (rolSeleccionado) {
      try {
        await rolService.actualizarRol(rolSeleccionado.idRol, { permisos: permisosSeleccionados });
        cargarRoles();
        setDialogOpen(false);
        toast.success("Permisos actualizados correctamente.");
      } catch (error) {
        console.error("Error al actualizar permisos:", error);
        toast.error("Error al actualizar permisos.");
      }
    }
  };

  const crearRol = async () => {
    if (!nuevoRol.trim()) {
      toast.error("El nombre del rol no puede estar vacío.");
      return;
    }

    try {
      const nuevo = await rolService.crearRol({
        nombreRol: nuevoRol,
        permisos: permisosSeleccionados,
      });

      setRoles((prev) => [...prev, nuevo]);
      setNuevoRol("");
      setPermisosSeleccionados([]);
      setDialogCrearOpen(false);
      toast.success("Rol creado correctamente.");
    } catch (error) {
      console.error("Error al crear rol:", error);
      toast.error("Error al crear el rol.");
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión de Roles</h2>

      <div className="flex justify-between mb-4">
        <Dialog open={dialogCrearOpen} onOpenChange={setDialogCrearOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" /> Agregar Rol
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Crear Nuevo Rol</DialogTitle>
            <Input
              placeholder="Nombre del rol"
              value={nuevoRol}
              onChange={(e) => setNuevoRol(e.target.value)}
            />
            <div className="flex flex-col gap-2 mt-4">
              {permisos.map((permiso) => (
                <label key={permiso.idPermiso} className="flex items-center gap-2">
                </label>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={crearRol}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>

      <CardContent className="px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Permisos</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((rol) => (
              <TableRow key={rol.idRol}>
                <TableCell>{rol.idRol}</TableCell>
                <TableCell>{rol.nombreRol}</TableCell>
                <TableCell>
                  {rol.permisos?.map((p) => p.nombrePermiso).join(", ") || "Sin permisos"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => abrirDialogo(rol)} size="sm" variant="outline">
                    Editar Permisos
                  </Button>
                  <Button onClick={() => eliminarRol(rol.idRol)} size="sm" variant="destructive" className="ml-2">
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      
      {/* Dialogo de edición de permisos */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>Editar Permisos</DialogTitle>
          <div className="flex flex-col gap-2">
            {permisos.map((permiso) => (
              <label key={permiso.idPermiso} className="flex items-center gap-2">
                <Checkbox
                  checked={permisosSeleccionados.includes(permiso.idPermiso)}
                  onCheckedChange={() => manejarCambioPermiso(permiso.idPermiso)}
                />
                {permiso.nombrePermiso}
              </label>
            ))}
          </div>
          <Button onClick={actualizarPermisos} className="mt-4">
            Guardar Cambios
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
    
  );
};

export default RolesTable;
