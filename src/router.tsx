import { createBrowserRouter } from 'react-router-dom';
import { LayoutContainer } from './login/LayoutContainer';
import { ErrorContainer } from './login/ErrorContainer';
import { LoginContainer } from './login/LoginContainer';
import { LayoutDashboardContainer } from './dashboard/LayoutContainer';
import { AuthorizedUsers } from './components/app/AuthorizedUsers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutContainer />,
    errorElement: (
      <LayoutContainer>
        <ErrorContainer />
      </LayoutContainer>
    ),
    children: [
      {
        index: true,
        element: <LoginContainer />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <AuthorizedUsers />,
    children: [{
        index: true, element: <LayoutDashboardContainer/>
    }]
  },
]);
