// import { useAuthorizationQuery } from 'generated/graphql';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AuthService from 'app/extensions/auth';
import { useAuth } from 'app/extensions/hooks';
import { useFormik } from 'formik';
import GoogleLogin from 'react-google-login';
import * as Yup from 'yup';

const responseGoogle = (response: any) => {
  console.log(response);
};
const Auth = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      const login = await AuthService.loginWithEmailPassword({
        email: values.email,
        password: values.password,
      });
      console.log('login', login);
    },
  });

  // useAuthorizationQuery();
  useAuth({
    onCompleted: () => {
      // redirigir a la página de redireccionamiento
    },
    onError: () => {
      // no hacer nada para q el usuario se loguee
    },
  });

  const _handleClickSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div>
      <TextField
        {...formik.getFieldProps('email')}
        error={Boolean(formik.touched.email && formik.errors.email)}
        label="Correo Electrónico"
        size="small"
        variant="standard"
        fullWidth
      />
      <TextField
        {...formik.getFieldProps('password')}
        label="Contraseña"
        error={Boolean(formik.touched.password && formik.errors.password)}
        type="password"
        size="small"
        sx={{
          mt: 1,
        }}
        variant="standard"
        fullWidth
      />
      <Button color="primary" onClick={_handleClickSubmit}>
        Iniciar sesión
      </Button>
      <GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // prompt="consent"
        // responseType="code"
        // accessType="offline"
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Auth;
