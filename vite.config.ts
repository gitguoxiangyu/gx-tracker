import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
  build:{
    rollupOptions: {
      input: './src/core/index.ts',
      output: [
        // 导出多个模块类型的打包结果
        {
          file: path.resolve(__dirname , './dist/esm/index.esm.js'),
          format: 'es',
        },
        {
          file: path.resolve(__dirname , './dist/cjs/index.cjs.js'),
          format: 'cjs',
        }
      ]
    }
  }
})