import {fileURLToPath, URL} from "node:url"

import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: "/Vue3-TS-ChatGPT/",
  build: {
    outDir: 'docs',
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // }
  },
  server: {
    port: 3456 // 指定端口号
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
