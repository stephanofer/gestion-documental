import { Pencil, Ban, CheckCircle } from "lucide-react";
import { Usuario } from "@/store/UsuarioStore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UsuariosTable = ({
  usuarios,
  onEditarUsuario,
  onToggleActivo,
}: {
  usuarios: Usuario[];
  onEditarUsuario: (usuario: Usuario) => void;
  onToggleActivo: (usuario: Usuario) => void;
}) => {
  const handleToggle = (usuario: Usuario) => {
    if (!usuario.idUsuario) {
        console.error("Error: El usuario no tiene un ID válido", usuario);
        return;
    }

    const mensaje = usuario.activo
        ? `¿Seguro que quieres desactivar a ${usuario.nombreUsuario}?`
        : `¿Seguro que quieres activar a ${usuario.nombreUsuario}?`;

    if (window.confirm(mensaje)) {
        onToggleActivo(usuario);
    }
};

  return (
    <div className="overflow-x-auto rounded-lg border shadow-md bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.idUsuario} className="hover:bg-gray-100 transition">
              <TableCell>{usuario.nombreUsuario}</TableCell>
              <TableCell>{usuario.nombreCompleto}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.departamento?.empresa?.nombreEmpresa || "N/A"}</TableCell>
              <TableCell>{usuario.departamento?.nombreDepartamento || "N/A"}</TableCell>
              <TableCell>{usuario.rol?.nombreRol || "N/A"}</TableCell>
              <TableCell className={usuario.activo ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {usuario.activo ? "Activo" : "Inactivo"}
              </TableCell>
              <TableCell className="space-x-2 flex">
                {/* Botón Editar */}
                <Button variant="outline" size="icon" onClick={() => onEditarUsuario(usuario)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                
                {/* Botón Activar/Desactivar con confirmación */}
                <Button
                  variant={usuario.activo ? "destructive" : "default"}
                  size="icon"
                  onClick={() => handleToggle(usuario)} // <-- Ahora usa la función correcta
                >
                  {usuario.activo ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 text-green-500" />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsuariosTable;
