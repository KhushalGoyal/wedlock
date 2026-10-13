/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional endpoint the inquiry form POSTs to. No secrets belong here. */
  readonly VITE_INQUIRY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
