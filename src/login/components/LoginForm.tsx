import { useForm } from 'react-hook-form';
import { Login, LoginSchem, loginDefaultValues } from '../schems/LoginSchem';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLogin } from '../mutations/login';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/AuthStore';

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { mutateAsync, isPending } = useLogin();

  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const methods = useForm<Login>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchem),
    defaultValues: loginDefaultValues,
  });
  const onSubmit = async (values: Login) => {
    setErrorMessage('');
    try {
      const { role, id, username } = await mutateAsync(values);
      setAuth(true, { role, id, username });
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403)
          setErrorMessage('Credenciales invalidas');
      }
    }
  };

  return (
    <>
      {errorMessage && errorMessage}
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormField
            control={methods.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button
            type="submit"
            disabled={isPending || !methods.formState.isValid}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
