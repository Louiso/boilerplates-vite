/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_SECRET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
