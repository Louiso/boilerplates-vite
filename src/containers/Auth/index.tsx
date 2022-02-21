// import { useAuthorizationQuery } from 'generated/graphql';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AuthService from 'app/extensions/auth';
import { useFormik } from 'formik';
import useSaveCredentialAndRedirect from 'hooks/useSaveCredentialAndRedirect';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import * as Yup from 'yup';

const Auth = () => {
  const { saveCredentials } = useSaveCredentialAndRedirect();
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
      const loginQueryResult = await AuthService.loginWithEmailPassword({
        email: values.email,
        password: values.password,
      });

      saveCredentials(loginQueryResult.data);
    },
  });

  const _handleSuccessLogin = async (
    provideResponse: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    const loginQueryResult = await AuthService.loginWithExternalApp({
      token: (provideResponse as GoogleLoginResponse).tokenId,
      externalApp: 'google',
    });

    saveCredentials(loginQueryResult.data);
  };

  const _handleFailureLogin = (response: any) => {
    console.log(response);
  };

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
      <Button color="primary" fullWidth onClick={_handleClickSubmit}>
        Iniciar sesión
      </Button>
      <GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText="Conecta con google"
        onSuccess={_handleSuccessLogin}
        onFailure={_handleFailureLogin}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Auth;
