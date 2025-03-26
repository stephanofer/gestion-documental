import { useEffect, useState } from "react";
import { useAcuerdoMarcoStore, useCatalogoStore } from "../store/AcuerdoCatalogoStore";
import { useMarcaStore } from "../store/MarcaStore"; // Nuevo store para marcas
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TablaProductos from "../components/productos/ProductosTable";

const ProductosPage = () => {
  const { cargarAcuerdos, acuerdos } = useAcuerdoMarcoStore();
  const { cargarCatalogos, catalogos } = useCatalogoStore();
  const { cargarMarcas, marcas } = useMarcaStore(); // Obtener marcas

  const [acuerdoSeleccionado, setAcuerdoSeleccionado] = useState<string | null>(null);
  const [catalogoSeleccionado, setCatalogoSeleccionado] = useState<number | null>(null);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    cargarAcuerdos();
    setCatalogoSeleccionado(null);
    setMarcaSeleccionada(null);
  }, [cargarAcuerdos]);

  useEffect(() => {
    if (acuerdoSeleccionado) {
      cargarCatalogos(Number(acuerdoSeleccionado));
      setCatalogoSeleccionado(null); // Resetear catálogo al cambiar de acuerdo
    }
  }, [acuerdoSeleccionado, cargarCatalogos]);

  useEffect(() => {
    if (catalogoSeleccionado) {
      cargarMarcas(); // Cargar marcas solo si se selecciona un catálogo
    }
  }, [catalogoSeleccionado, cargarMarcas]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Gestión de Productos</h2>
      <div className="flex gap-4 mb-4">
        <Select onValueChange={(value) => {
          setAcuerdoSeleccionado(value);
          setCatalogoSeleccionado(null); // Resetear catálogo al cambiar de acuerdo
          setMarcaSeleccionada(null); // Resetear marca al cambiar de acuerdo
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un Acuerdo Marco" />
          </SelectTrigger>
          <SelectContent>
            {acuerdos.map((acuerdo) => (
              <SelectItem key={acuerdo.idAcuerdo} value={acuerdo.idAcuerdo.toString()}>
                {acuerdo.nombreAcuerdo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={catalogoSeleccionado ? catalogoSeleccionado.toString() : ""}
          onValueChange={(value) => setCatalogoSeleccionado(value ? Number(value) : null)}
          disabled={!acuerdoSeleccionado}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un Catálogo Electrónico" />
          </SelectTrigger>
          <SelectContent>
            {catalogos.map((catalogo) => (
              <SelectItem key={catalogo.idCatalogo} value={catalogo.idCatalogo.toString()}>
                {catalogo.descripcionCatalogo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setMarcaSeleccionada(value ? Number(value) : null)}
          disabled={marcas.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una Marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas las marcas</SelectItem> {/* Opción para ver todos los productos del catálogo */}
            {marcas.map((marca) => (
              <SelectItem key={marca.idMarca} value={marca.idMarca.toString()}>
                {marca.nombreMarca}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TablaProductos key={`${catalogoSeleccionado}-${marcaSeleccionada}`} idCatalogoSeleccionado={catalogoSeleccionado} idMarcaSeleccionada={marcaSeleccionada} />
    </div>
  );
};

export default ProductosPage;
