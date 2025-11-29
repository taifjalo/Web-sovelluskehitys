import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/~taifj/Web-sovelluskehitys%20TX00EY23-3009/Viikon%205%20tehtavat/tailwind/',
});
