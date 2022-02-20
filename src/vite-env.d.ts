/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_SECRET: string;
  readonly VITE_AUTH_SERVER_URL: string;
  readonly VITE_AUTH_APP: string;
  // more env variables...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
