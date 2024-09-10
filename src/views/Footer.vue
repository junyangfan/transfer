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
  <Flex justify="center" align="center" class="w-full fixed bottom-0 h-30px text-white bg-black:40">
    <Space :size="4" class="font-size-12px sm:text-base">
      <span>Copyright</span>
      <span>&copy;</span>
      <span>{{ formatDate(new Date().getTime(), 'y') }}</span>
      <TypographyLink v-if="siteAuthor || siteName" class="!text-color-t-color font-size-12px sm:text-base" :href="siteUrl" target="_blank">
        <Space :size="2">
          <span v-if="siteName">{{ siteName }}</span>
          <span v-if="siteAuthor">{{ siteAuthor }}</span>
        </Space>
      </TypographyLink>
      <TypographyLink v-if="siteIcp" href="https://beian.miit.gov.cn" target="_blank" class="!text-white !hover:text-color-t-color font-size-12px sm:text-base">
        {{ siteIcp }}
      </TypographyLink>
    </Space>
  </Flex>
</template>

<style scoped></style>
