// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Configuration globale pour tous les fichiers .br
          source: '/Utc/:lang/Build/:file*.br',
          headers: [
            {
              key: 'Content-Encoding',
              value: 'br',
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // Configuration spécifique pour les fichiers JavaScript
          source: '/Utc/:lang/Build/:file*.js',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/javascript',
            },
          ],
        },
        {
          // Configuration spécifique pour les fichiers WebAssembly
          source: '/Utc/:lang/Build/:file*.wasm',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/wasm',
            },
          ],
        },
        {
          // Configuration spécifique pour les fichiers data
          source: '/Utc/:lang/Build/:file*.data',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/octet-stream',
            },
          ],
        },
      ];
    },
    // Ajout de la configuration pour les fichiers statiques
    webpack: (config, { isServer }) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      return config;
    },
  };
  
  export default nextConfig;
  