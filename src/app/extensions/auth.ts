import axios from 'axios';

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

export interface AccessToken {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
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

interface LoginWithExternalAppArgs {
  token: string;
  externalApp: string;
}

const loginWithExternalApp = async ({ token, externalApp }: LoginWithExternalAppArgs) => {
  const { data } = await instance.post<Response<AccessToken>>(
    '/auth/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code: `${externalApp}:${token}`,
    }),
  );

  return data;
};

const register = async (email: string, password: string) => {
  return instance.post('/login', { email, password });
};

const authenticate = async () => {
  const { data } = await instance.get<Response<AccessToken>>('/auth/authenticate', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!data.success) throw new Error(data.message);

  return data;
};

const AuthService = {
  loginWithEmailPassword,
  register,
  loginWithExternalApp,
  authenticate,
};

export default AuthService;
