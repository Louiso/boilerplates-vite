import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_SERVER_URL}/api/v1`,
});

interface Response<T = any> {
  data: T;
  success: boolean;
  message: string;
}

interface User {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AccessToken {
  accessToken: string;
  accessTokenExpiresAt: string;
  oauthTokenExpiresAt: string;
  refreshToken: string;
  scope: string;
  user: User;
}

const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await instance.post<Response<AccessToken>>(
    '/auth/token',
    new URLSearchParams({
      email,
      password,
      grant_type: 'password',
      scope: 'auth:read',
    }),
  );

  if (!data.data) throw new Error(data.message);

  return data;
};

const loginWithGoogle = async (googleToken: string) => {
  return instance.post('/login', { googleToken });
};

const register = async (email: string, password: string) => {
  return instance.post('/login', { email, password });
};

const authenticate = async () => {
  const { data } = await instance.get<
    AxiosResponse<{ data: any; success: boolean; message: string }>
  >('/auth/authenticate', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  console.log('data.data', data.data);

  if (!data.data.success) throw new Error(data.data.message);

  return data;
};

const AuthService = {
  loginWithEmailPassword,
  register,
  loginWithGoogle,
  authenticate,
};

export default AuthService;
