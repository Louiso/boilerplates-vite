import GoogleLogin from 'react-google-login';

const responseGoogle = (response: any) => {
  console.log(response);
};

const Auth = () => (
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
);

export default Auth;
