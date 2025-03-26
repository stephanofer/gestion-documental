import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ProductoService } from "@/services/productoService";
import { useCatalogoStore, useAcuerdoMarcoStore } from "@/store/AcuerdoCatalogoStore";
import { useMarcaStore } from "@/store/MarcaStore";
import { ProductoDTO } from "@/types/producto";

// 📌 Esquema de validación con Zod
const productoSchema = z.object({
  codigoProducto: z.string().min(1, "El código es obligatorio"),
  nombreProducto: z.string().min(1, "El nombre es obligatorio"),
  descripcionProducto: z.string().min(1, "La descripción es obligatoria"),
  stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
  precioPlataforma: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  estado: z.boolean(),
  idCatalogo: z.string().min(1, "Selecciona un catálogo"),
  idMarca: z.string().min(1, "Selecciona una marca"),
});

const CrearProductoPage = () => {
  const navigate = useNavigate();
  const { cargarCatalogos, cargarTodosLosCatalogos, catalogos } = useCatalogoStore();
  const { cargarMarcas, marcas } = useMarcaStore();
  const idAcuerdo = useAcuerdoMarcoStore((state) => state.idAcuerdo);

  useEffect(() => {
    if (idAcuerdo) {
      cargarCatalogos(idAcuerdo);
    } else {
      cargarTodosLosCatalogos();
    }
    cargarMarcas();
  }, [idAcuerdo, cargarCatalogos, cargarTodosLosCatalogos, cargarMarcas]);

  // 📌 Hook para manejar el formulario
  const form = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      codigoProducto: "",
      nombreProducto: "",
      descripcionProducto: "",
      stock: 0,
      precioPlataforma: 0,
      estado: true,
      idCatalogo: "",
      idMarca: "",
    },
  });

  type ProductoFormData = Omit<ProductoDTO, "catalogoElectronico" | "marca"> & {
    idCatalogo: string;
    idMarca: string;
  };
  

  const onSubmit = async (data: ProductoFormData) => {
    try {
      const catalogo = catalogos.find((c) => c.idCatalogo.toString() === data.idCatalogo);
      const marca = marcas.find((m) => m.idMarca.toString() === data.idMarca);
  
      if (!catalogo || !marca) {
        console.error("Error: Catálogo o Marca no encontrados");
        return;
      }
  
      await ProductoService.crearProducto({
        ...data,
        catalogoElectronico: { 
          idCatalogo: Number(data.idCatalogo), 
          codigoCatalogo: catalogo.codigoCatalogo, 
          descripcionCatalogo: catalogo.descripcionCatalogo
        },
        marca: { 
          idMarca: Number(data.idMarca), 
          nombreMarca: marca.nombreMarca 
        },
        caracteristicas: data.caracteristicas ?? [], // 👈 Aseguramos que siempre se envíe un array
      });
  
      navigate("/dashboard/productos");
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  };
  
  
  

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Crear Producto</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Código del Producto */}
          <FormField
            control={form.control}
            name="codigoProducto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nombre */}
          <FormField
            control={form.control}
            name="nombreProducto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descripción */}
          <FormField
            control={form.control}
            name="descripcionProducto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stock */}
            <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                    <Input 
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Precio Plataforma */}
            <FormField
            control={form.control}
            name="precioPlataforma"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Precio Plataforma</FormLabel>
                <FormControl>
                    <Input 
                    type="number"
                    step="0.01"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

          {/* Estado */}
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={(value) => field.onChange(value === "true")}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value ? "Activo" : "Inactivo"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Activo</SelectItem>
                    <SelectItem value="false">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Catálogo Electrónico */}
          <FormField
            control={form.control}
            name="idCatalogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catálogo Electrónico</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un catálogo" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogos.map((catalogo) => (
                      <SelectItem key={catalogo.idCatalogo} value={catalogo.idCatalogo.toString()}>
                        {catalogo.descripcionCatalogo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Marca */}
          <FormField
            control={form.control}
            name="idMarca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {marcas.map((marca) => (
                      <SelectItem key={marca.idMarca} value={marca.idMarca.toString()}>
                        {marca.nombreMarca}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botón de Enviar */}
          <Button type="submit" className="w-full">
            Crear Producto
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CrearProductoPage;
