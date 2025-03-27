import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash, Eye } from "lucide-react";
import { useCaracteristicaStore } from "@/store/CaracteristicaStore";
import { useValorStore } from "@/store/ValorStore";

export default function GestionCaracteristicas() {
  const { caracteristicas, obtenerCaracteristicas, crearCaracteristica, eliminarCaracteristica, cargando } =
    useCaracteristicaStore();
  const { valores, obtenerValores } = useValorStore();

  const [nombre, setNombre] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [caracteristicaSeleccionada, setCaracteristicaSeleccionada] = useState<{ id: number; nombre: string } | null>(
    null
  );
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerCaracteristicas();
  }, [obtenerCaracteristicas]);

  const handleAdd = async () => {
    if (nombre.trim() !== "") {
      try {
        await crearCaracteristica({ nombreCaracteristica: nombre });
        setNombre("");
      } catch (error) {
        console.error("Error al crear la característica:", error);
      }
    }
  };

  const abrirModal = async (caracteristica: { id: number; nombre: string }) => {
    setCaracteristicaSeleccionada(caracteristica);
    setModalOpen(true);
    await obtenerValores();
  };

  const valoresFiltrados = valores.filter(
    (valor) => valor.idCaracteristica === caracteristicaSeleccionada?.id && valor.valor.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Formulario para agregar característica */}
      <Card>
        <CardHeader>
          <CardTitle>Crear Nueva Característica</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input placeholder="Nombre de la característica" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <Button onClick={handleAdd} disabled={cargando}>
            <Plus className="mr-2 h-4 w-4" /> {cargando ? "Guardando..." : "Agregar"}
          </Button>
        </CardContent>
      </Card>

      {/* Tabla de características */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Características</CardTitle>
        </CardHeader>
        <CardContent>
          {cargando ? (
            <p className="text-center text-gray-500">Cargando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caracteristicas.length > 0 ? (
                  caracteristicas.map((caracteristica) => (
                    <TableRow key={caracteristica.idCaracteristica}>
                      <TableCell>{caracteristica.idCaracteristica}</TableCell>
                      <TableCell>{caracteristica.nombreCaracteristica ?? "Sin nombre"}</TableCell>
                      <TableCell className="flex gap-2">
                        {/* Botón para ver valores */}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            abrirModal({
                              id: caracteristica.idCaracteristica,
                              nombre: caracteristica.nombreCaracteristica ?? "Sin nombre",
                            })
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Botón para eliminar */}
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => eliminarCaracteristica(caracteristica.idCaracteristica)}
                          disabled={cargando}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      No hay características registradas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal para ver valores de la característica */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Valores de {caracteristicaSeleccionada?.nombre}</DialogTitle>
          </DialogHeader>

          {/* Buscador */}
          <Input
            placeholder="Buscar valor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="mb-4"
          />

          {/* Contenedor con scroll para la tabla */}
          <div className="max-h-[50vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valoresFiltrados.length > 0 ? (
                  valoresFiltrados.map((valor) => (
                    <TableRow key={valor.idValorCaracteristica}>
                      <TableCell>{valor.idValorCaracteristica}</TableCell>
                      <TableCell>{valor.valor}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-gray-500">
                      No hay valores registrados para esta característica.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
