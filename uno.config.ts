import { defineConfig, presetUno, presetAttributify, transformerVariantGroup, transformerDirectives } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  },
  presets: [presetAttributify(), presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      't-color': '#fb6c28',
    },
  },
});