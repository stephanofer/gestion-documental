import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (!data.token || !data.id || !data.username || !data.role) {
        throw new Error("User data is missing in the response");
      }


      login({
        token: data.token,
        id: data.id,
        username: data.username,
        role: data.role,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nombre de Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-max self-center">
                Iniciar sesión
              </Button>
              <div className="text-center text-sm">
                ¿Tienes Problemas?{" "}
                <a href="#" className="underline underline-offset-4">
                  Contacta a Soporte
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/loginimg.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al continuar, aceptas nuestros <a href="#">Términos de Servicio</a> y <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
