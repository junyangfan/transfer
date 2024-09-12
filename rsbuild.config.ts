import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginLess } from '@rsbuild/plugin-less';

export default defineConfig({
  plugins: [pluginVue(), pluginLess()],
  server: {
    port: 12345,
    historyApiFallback: {
      index: '/'
    }
  },
  html: {
    title: process.env.SITE_TITLE,
    favicon: process.env.SITE_FAVICON
  },
  source: {
    alias: {
      '@': './src'
    },
  }
});
