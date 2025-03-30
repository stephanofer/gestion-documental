import { useEffect, useState } from 'react';
import { useUsuarioStore } from '@/store/UsuarioStore';
import UsuariosTable from '@/components/usuarios/UsuariosTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Empresa, Usuario } from '@/store/UsuarioStore';
import { usuarioService } from '@/services/usuarioService';

const UsuariosPage = () => {
  const {
    usuarios,
    cargarUsuarios,
    agregarUsuario,
    cargarDepartamentos,
    cargarRoles,
    departamentos,
    roles,
  } = useUsuarioStore();

  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(''); // Estado para empresa
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombreUsuario: '',
    contrasena: '',
    nombreCompleto: '',
    email: '',
    idEmpresa: '',
    idDepartamento: '',
    idRol: '',
  });

  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  useEffect(() => {
    cargarUsuarios();
    cargarDepartamentos();
    cargarRoles();
  }, [cargarUsuarios, cargarDepartamentos, cargarRoles]);

  const departamentosFiltrados = usuarioEditando
    ? departamentos.filter(
        (dep) =>
          dep.empresa?.idEmpresa ===
          usuarioEditando.departamento?.empresa?.idEmpresa,
      )
    : departamentos.filter(
        (dep) => dep.empresa?.idEmpresa === Number(empresaSeleccionada),
      );

  const handleCrearUsuario = async () => {
    if (
      !nuevoUsuario.nombreUsuario ||
      !nuevoUsuario.contrasena ||
      !nuevoUsuario.idDepartamento ||
      !nuevoUsuario.idRol
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    await agregarUsuario({
      ...nuevoUsuario,
      idDepartamento: Number(nuevoUsuario.idDepartamento),
      idRol: Number(nuevoUsuario.idRol),
      activo: true,
      idUsuario: 1,
    });

    setNuevoUsuario({
      nombreUsuario: '',
      contrasena: '',
      nombreCompleto: '',
      email: '',
      idEmpresa: '',
      idDepartamento: '',
      idRol: '',
    });
    setEmpresaSeleccionada('');
  };

  // Función para editar usuario
  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
  };

  const handleGuardarEdicion = async () => {
    if (usuarioEditando && usuarioEditando.idUsuario) {
      console.log('Actualizando usuario con ID:', usuarioEditando.idUsuario);
      console.log('Datos enviados:', usuarioEditando);

      try {
        await usuarioService.actualizarUsuario(
          usuarioEditando.idUsuario,
          usuarioEditando,
        );
        setUsuarioEditando(null);
        cargarUsuarios();
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    } else {
      console.error('Error: idUsuario es null o undefined');
    }
  };

  // Función para activar/desactivar usuario
  const handleToggleActivo = async (usuario: Usuario) => {
    try {
      const usuarioActualizado = await usuarioService.cambiarEstadoUsuario(
        usuario.idUsuario,
      );

      useUsuarioStore.setState((state) => ({
        usuarios: state.usuarios.map((u) =>
          u.idUsuario === usuario.idUsuario
            ? { ...u, activo: Boolean(usuarioActualizado.activo) } // Convierte 0/1 a booleano
            : u,
        ),
      }));
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  console.log(process.env.API_URL);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Gestión de Usuarios
      </h1>

      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>Crear Nuevo Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Nombre de usuario"
            value={nuevoUsuario.nombreUsuario}
            onChange={(e) =>
              setNuevoUsuario({
                ...nuevoUsuario,
                nombreUsuario: e.target.value,
              })
            }
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={nuevoUsuario.contrasena}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, contrasena: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Nombre Completo"
            value={nuevoUsuario.nombreCompleto}
            onChange={(e) =>
              setNuevoUsuario({
                ...nuevoUsuario,
                nombreCompleto: e.target.value,
              })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={nuevoUsuario.email}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
            }
          />

          {/* Selector de Empresa */}
          <Select
            onValueChange={(value) => {
              setEmpresaSeleccionada(value);
              setNuevoUsuario({
                ...nuevoUsuario,
                idEmpresa: value,
                idDepartamento: '',
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione una Empresa" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                new Map(
                  departamentos
                    .map((dep) => dep.empresa)
                    .filter(
                      (empresa): empresa is Empresa => empresa !== undefined,
                    )
                    .map((empresa) => [empresa.idEmpresa, empresa]),
                ).values(),
              ).map((empresa) => (
                <SelectItem
                  key={empresa.idEmpresa}
                  value={String(empresa.idEmpresa)}
                >
                  {empresa.nombreEmpresa}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Selector de Departamento */}
          <Select
            disabled={!empresaSeleccionada}
            onValueChange={(value) =>
              setNuevoUsuario({ ...nuevoUsuario, idDepartamento: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un Departamento" />
            </SelectTrigger>
            <SelectContent>
              {departamentosFiltrados.map((dep) => (
                <SelectItem
                  key={dep.idDepartamento}
                  value={String(dep.idDepartamento)}
                >
                  {dep.nombreDepartamento}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Selector de Rol */}
          <Select
            onValueChange={(value) =>
              setNuevoUsuario({ ...nuevoUsuario, idRol: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un Rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((rol) => (
                <SelectItem key={rol.idRol} value={String(rol.idRol)}>
                  {rol.nombreRol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleCrearUsuario} className="w-full">
            Crear Usuario
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6">
        <UsuariosTable
          usuarios={usuarios}
          onEditarUsuario={handleEditarUsuario}
          onToggleActivo={handleToggleActivo}
        />
      </div>
      <Dialog
        open={!!usuarioEditando}
        onOpenChange={() => setUsuarioEditando(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          {usuarioEditando && (
            <div className="space-y-4">
              <Input
                type="text"
                value={usuarioEditando.nombreUsuario}
                onChange={(e) =>
                  setUsuarioEditando({
                    ...usuarioEditando,
                    nombreUsuario: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                value={usuarioEditando.nombreCompleto}
                onChange={(e) =>
                  setUsuarioEditando({
                    ...usuarioEditando,
                    nombreCompleto: e.target.value,
                  })
                }
              />
              <Input
                type="email"
                value={usuarioEditando.email}
                onChange={(e) =>
                  setUsuarioEditando({
                    ...usuarioEditando,
                    email: e.target.value,
                  })
                }
              />
              <Select
                onValueChange={(value) =>
                  setUsuarioEditando({
                    ...usuarioEditando,
                    departamento:
                      departamentos.find(
                        (dep) => dep.idDepartamento === Number(value),
                      ) || usuarioEditando.departamento,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un Departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departamentosFiltrados.map((dep) => (
                    <SelectItem
                      key={dep.idDepartamento}
                      value={String(dep.idDepartamento)}
                    >
                      {dep.nombreDepartamento}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setUsuarioEditando({
                    ...usuarioEditando,
                    rol:
                      roles.find((rol) => rol.idRol === Number(value)) ||
                      usuarioEditando.rol,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un Rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((rol) => (
                    <SelectItem key={rol.idRol} value={String(rol.idRol)}>
                      {rol.nombreRol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleGuardarEdicion}>Guardar Cambios</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsuariosPage;
