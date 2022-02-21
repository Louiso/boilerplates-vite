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

export const saveCredentials = (credentials: AccessToken) => {
  localStorage.setItem('accessToken', credentials.accessToken);
  localStorage.setItem('userId', credentials.user._id);
  localStorage.setItem('refreshToken', credentials.refreshToken);
  localStorage.setItem('accessTokenExpiresAt', credentials.accessTokenExpiresAt);
  localStorage.setItem('refreshTokenExpiresAt', credentials.refreshTokenExpiresAt);
};

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

const getAccessToken = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const accessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
  const refreshToken = localStorage.getItem('refreshToken');
  const refreshTokenExpiresAt = localStorage.getItem('refreshTokenExpiresAt');

  if (new Date().getTime() >= new Date(accessTokenExpiresAt!).getTime()) {
    if (new Date().getTime() < new Date(refreshTokenExpiresAt!).getTime()) {
      const { data: refreshTokenResponse } = await instance.post<Response<AccessToken>>(
        '/auth/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken!,
        }),
      );

      if (!refreshTokenResponse.success) throw new Error(refreshTokenResponse.message);

      saveCredentials(refreshTokenResponse.data);

      return refreshTokenResponse.data.accessToken;
    }

    throw new Error('No hay token de acceso válido');
  }

  return accessToken;
};

// la cuestión es si en base a este accessToken, si se vence mediante el refreshToken
// pueda obtener un nuevo accessToken
const authenticate = async () => {
  const accessToken = await getAccessToken();

  const { data } = await instance.get<Response<AccessToken>>('/auth/authenticate', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
