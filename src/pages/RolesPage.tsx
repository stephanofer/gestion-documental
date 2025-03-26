import { useState } from "react";
import RolesTable from "@/components/roles/RolesTable";
import PermisosTable from "@/components/roles/PermisosTable";
import { Button } from "@/components/ui/button";

const RolesPage = () => {
  const [activeTab, setActiveTab] = useState<"roles" | "permisos">("roles");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Roles y Permisos</h1>

      {/* Botones de navegación */}
      <div className="flex space-x-4 mb-6">
        <Button variant={activeTab === "roles" ? "default" : "outline"} onClick={() => setActiveTab("roles")}>
          Roles
        </Button>
        <Button variant={activeTab === "permisos" ? "default" : "outline"} onClick={() => setActiveTab("permisos")}>
          Permisos
        </Button>
      </div>

      {/* Contenido dinámico basado en la pestaña seleccionada */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {activeTab === "roles" && <RolesTable />}
        {activeTab === "permisos" && <PermisosTable />}
      </div>
    </div>
  );
};

export default RolesPage;
