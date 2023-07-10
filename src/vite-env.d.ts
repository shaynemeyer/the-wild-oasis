/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
  readonly VITE_SUPABASE_KEY;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
