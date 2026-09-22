import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tracker from 'vite-plugin-tracker';
import observe from 'vite-plugin-observe';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isXhs = mode === 'xhs';

  return {
    // 生产包使用相对资源路径，部署到任意 GitHub Pages 子路径都能正常加载；小红书离线包也必须使用相对路径。
    base: mode === 'production' || isXhs ? './' : '/',
    plugins: [
      // 小红书离线包不能包含联网/观测插件；普通开发包保持原有插件顺序。
      ...(
        isXhs
          ? []
          : [
              tracker({ baseUrl: env.VITE_API_BASE_URL || 'http://localhost:8090' }),
              observe({ serverPrefix: env.VITE_BASE_PATH || '/' }),
            ]
      ),
      react(),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    css: {
      // PostCSS 走内联配置，不用 postcss.config.js —— 工程是 ESM-only，禁止 .js 源码。
      // tailwindcss() 不传参时自动加载同级 tailwind.config.ts
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    server: {
      port: 8070,
      host: '0.0.0.0',
      allowedHosts: (env.VITE_ALLOWED_HOSTS || 'localhost').split(','),
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8090',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: ['es2017', 'chrome61'],
      cssTarget: 'chrome61',
      modulePreload: false,
      sourcemap: false,
    },
  };
});
