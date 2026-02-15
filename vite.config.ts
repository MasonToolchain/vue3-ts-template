import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log(env)

  return {
    plugins: [
      VueRouter({}),
      // ⚠️ Vue must be placed after VueRouter()
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS(),
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        symbolId: 'icon-[dir]-[name]',
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        // 如果有其他要自动导入的库，只需要在imports数组中追加该库就行。
        imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core'],
      }),
      Components({
        deep: true,
        directoryAsNamespace: false,
      }),
      vueI18n({
        // 语言包目录
        include: path.resolve(__dirname, './src/i18n/locales/**'),
        // 开发模式下也启动编译时处理
        runtimeOnly: false,
        // 仅使用组合式 API
        compositionOnly: true,
        // 完整安装
        fullInstall: true,
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
