import { useAuthStore } from "@/store/AuthStore";
import { Navigate, Outlet } from "react-router-dom";

export function AuthorizedUsers() {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    console.log(isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to={"/"}/>
    }
  return (
    <Outlet />
  )
}