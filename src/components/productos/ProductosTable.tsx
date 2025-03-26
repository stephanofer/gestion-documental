import { useEffect, useState } from "react";
import { useProductoStore } from "@/store/ProductoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

interface TablaProductosProps {
  idCatalogoSeleccionado: number | null;
  idMarcaSeleccionada: number | null;
}

const TablaProductos = ({ idCatalogoSeleccionado, idMarcaSeleccionada }: TablaProductosProps) => {
  const { productos, cargarProductosPorCatalogoYMarca, limpiarProductos, eliminarProducto, seleccionarProducto } = useProductoStore();
  
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (idCatalogoSeleccionado) {
      cargarProductosPorCatalogoYMarca(idCatalogoSeleccionado, idMarcaSeleccionada);
    } else {
      limpiarProductos();
    }
  }, [idCatalogoSeleccionado, idMarcaSeleccionada, cargarProductosPorCatalogoYMarca, limpiarProductos]);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.codigoProducto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>

      <Input
        type="text"
        placeholder="Buscar por nombre o código..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 w-100"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <TableRow key={producto.idProducto}>
                <TableCell>{producto.codigoProducto}</TableCell>
                <TableCell>{producto.nombreProducto}</TableCell>
                <TableCell>{producto.marca ? producto.marca.nombreMarca : "Sin marca"}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>S/. {producto.precioPlataforma.toFixed(2)}</TableCell>
                <TableCell>{producto.estado ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => seleccionarProducto(producto)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => producto.idProducto && eliminarProducto(producto.idProducto)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No hay productos disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaProductos;
