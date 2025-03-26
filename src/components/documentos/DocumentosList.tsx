import { useEffect, useState } from "react";
import { useDocumentoStore } from "../../store/DocumentoStore";
import ModalMovimientos from "./modalMovimientos";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const DocumentosList = () => {
  const { documentos, cargarDocumentos, descargarDocumento } = useDocumentoStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<number | null>(null);

  useEffect(() => {
    cargarDocumentos();
  }, [cargarDocumentos]);

  const abrirModalMovimientos = (idDocumento: number) => {
    setSelectedDocumento(idDocumento);
    setModalOpen(true);
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <h2 className="text-xl font-bold">Gestión de Documentos</h2>
      </CardHeader>
      <CardContent>
        {documentos?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Departamento de Origen</TableHead>
                <TableHead>Usuario Original</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentos.map((doc) => (
                <TableRow key={doc.idDocumento}>
                  <TableCell>{doc.tipoDocumento}</TableCell>
                  <TableCell>{doc.numeroDocumento}</TableCell>
                  <TableCell>
                    {doc.fechaDocumento ? new Date(doc.fechaDocumento).toLocaleDateString() : "Fecha no disponible"}
                  </TableCell>
                  <TableCell>
                    {doc.departamentoActual ? doc.departamentoActual.nombreDepartamento : "Sin asignar"}
                  </TableCell>
                  <TableCell>
                    {doc.usuarioActual ? `${doc.usuarioActual.nombreUsuario}` : "Sin asignar"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="default" onClick={() => abrirModalMovimientos(doc.idDocumento)}>
                      Ver Movimientos
                    </Button>
                    <Button variant="outline" onClick={() => descargarDocumento(doc.idDocumento)}>
                      Descargar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500 text-center mt-4">No hay documentos disponibles.</p>
        )}
      </CardContent>
      {modalOpen && selectedDocumento && (
        <ModalMovimientos idDocumento={selectedDocumento} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </Card>
  );
};

export default DocumentosList;
