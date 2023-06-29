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
