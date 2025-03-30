import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  children?: ReactNode;
};

export function LayoutContainer({ children }: Props) {
  return (
    <>
    <h1>HEADER</h1>
    {children ?? <Outlet />}
    <h1>FOOTER</h1>
    </>
  );
}
