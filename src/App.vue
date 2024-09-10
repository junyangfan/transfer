<template>
  <ConfigProvider :theme="theme">
    <router-view />
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
const theme = {
  token: {
    colorPrimary: '#fb6c28',
  },
}
</script>
<style scoped></style>
