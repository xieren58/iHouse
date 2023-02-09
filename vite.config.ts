import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "买房计算器",
        short_name: "iHouse",
        description: "买房计算器",
        start_url: ".",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        //导航界面的背景颜色
        background_color: "#444C60",
        //手机最上方显示运营商及电量、时间等这一栏的颜色
        theme_color: "#444C60",
        //页面显示效果为没有地址栏和底部状态栏
        display: "standalone",
      }
    }),
  ],
  build: {
    outDir: "docs",
  },
})
