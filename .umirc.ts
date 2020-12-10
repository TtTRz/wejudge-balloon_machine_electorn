import { defineConfig } from 'umi';

export default defineConfig({
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/home',
      component: '@/pages/home'
    },
    {
      path: '/',
      component: '@/pages/login'
    },
  ],
  proxy: {
    '/api': {
      // 'target': 'https://api.dev.wejudge.net/dev/',
      'target': 'https://api.wejudge.net/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    }
  }
});