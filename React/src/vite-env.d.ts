/// <reference types="vite/client" />

interface ImportMetaEnv {
    env: {
        BASE_URL?: string,
        WEB_SOCKET_URL?: string,
    }
}

interface ImportMeta {
    env: ImportMetaEnv
}