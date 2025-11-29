import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/~taifj/Web-sovelluskehitys%20TX00EY23-3009/Viikon%206%20tehtavat/tailwind/',
  server: {
    proxy: {
      '/api': {
        target: 'https://media2.edu.metropolia.fi/media-api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
