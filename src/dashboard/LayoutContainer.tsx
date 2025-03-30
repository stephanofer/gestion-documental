import { useAuthStore } from '@/store/AuthStore';

export function LayoutDashboardContainer() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <h1>Bienvenido</h1>
      <p>{user?.username}</p>
    </>
  );
}
