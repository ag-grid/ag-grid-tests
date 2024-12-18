import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      external: [
        'vue',
        'ag-grid-enterprise',
        'ag-grid-vue3',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
