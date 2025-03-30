import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hola mundito</div>,
    },
    {
        path: "/dashboard",
        element: <div>Hola dashboard</div>
    }
])