import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/~taifj/Web-sovelluskehitys%20TX00EY23-3009/Viikon%205%20tehtavat/forms/',
});
