import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(
  {
    plugins: [
      react(), 
      envCompatible(), // Load environment variables from .env files
    ],
    resolve: {
      alias: [
        {
          find: '@services',
          replacement: path.resolve(path.join(__dirname, '/src/services')),
        },
        {
          find: '@components',
          replacement: path.resolve(path.join(__dirname, '/src/components')),
        },
        {
          find: '@assets',
          replacement: path.resolve(path.join(__dirname, '/src/assets')),
        },
        {
          find: '@pages',
          replacement: path.resolve(path.join(__dirname, '/src/pages'))
        },
        {
          find: '@contexts',
          replacement: path.resolve(path.join(__dirname, '/src/contexts'))
        },
        {
          find: '@hooks',
          replacement: path.resolve(path.join(__dirname, '/src/hooks'))
        },
        {
          find: '@utilities',
          replacement: path.resolve(path.join(__dirname, '/src/utilities'))
        }
      ]
    }
})
