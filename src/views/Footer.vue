<script lang="ts">
export default {
  name: 'Footer',
};
</script>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { TypographyLink, Space, Flex } from 'ant-design-vue';
import { formatDate } from '@/utils'
import { siteAuthor, siteName, siteUrl, siteIcp } from '@/config'

</script>

<template>
  <Flex justify="center" align="center" class="w-full fixed bottom-0 h-auto text-white bg-black:40 sm:p-4px pb-4px">
    <Space :size="4" class="flex flex-col sm:flex-row">
      <span class="hidden sm:inline">Copyright &copy; {{ formatDate(new Date().getTime(), 'y') }}</span>
      <TypographyLink v-if="siteAuthor || siteName" class="!text-color-t-color" :href="siteUrl" target="_blank">
        <Space :size="2">
          <span v-if="siteName">{{ siteName }}</span>
          <span v-if="siteAuthor">{{ siteAuthor }}</span>
        </Space>
      </TypographyLink>
      <TypographyLink v-if="siteIcp" href="https://beian.miit.gov.cn" target="_blank" class="!text-white !hover:text-color-t-color">
        {{ siteIcp }}
      </TypographyLink>
    </Space>
  </Flex>
</template>

<style scoped></style>
