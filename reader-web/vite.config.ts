import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // можливо знадобиться імпорт path

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Це змушує Vite використовувати один і той самий React для всього проєкту
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
});