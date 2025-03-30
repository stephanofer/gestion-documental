import { useEffect, useState } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorContainer() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const error = useRouteError();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
        //Entra cuando la pagina (path) no existe
      setErrorMessage('Esta pagina no exsite');
    } else {
        //Entra aca cuando es un error interno por ejempo cuando se lanza throw Error
      setErrorMessage('Ocurrió un error interno');
    }
  }, [error]);

  console.log(errorMessage);
  return <div>{errorMessage}</div>;
}
