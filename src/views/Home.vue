<script lang="ts">
export default {
  name: 'Home',
};
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { isWeChat, to, transformCurrentUrl } from '@/utils'
import { message, Button, TypographyParagraph, TypographyText, Flex } from 'ant-design-vue';
import { targetHost } from '@/config'
import Footer from './Footer.vue';
import SocialLinks from './SocialLinks.vue';
import Time from './Time.vue'
import FloatButton from './FloatButton.vue'
import Loading from './Loading.vue'

const targetUrl = ref('https://www.fjy.zone')
const tip = ref('欢迎访问，点击下方按钮即可跳转到目标网站！')
const showJumpButton = ref(false)

const initPage = () => {
  targetUrl.value = transformCurrentUrl(window.location, targetHost)
  if (isWeChat()) {
    tip.value = "您当前在微信环境，请直接点击右上角「...」，选择「在浏览器打开」，或者手动复制下方链接到浏览器打开！"
  } else {
    showJumpButton.value = true
  }
}

const handleJump = () => {
  window.location.href = targetUrl.value
}

const onCopy = () => message.success('复制成功');

onMounted(() => {
  initPage()
})
</script>

<template>
  <!-- <Loading /> -->
  <div class="bg-cover bg-[url('https://static.fjy.zone/pic/transfer-bg.jpg')] bg-center bg-no-repeat min-h-screen w-full">
    <Flex justify="center" align="center" class="w-100vw h-100vh">
      <Flex justify="space-between" vertical class="relative w-600px min-h-420px bg-coolgray-200 opacity-80 m-40px rounded-10px px-20px py-40px shadow-t-color shadow">
        <Time />
        <Flex justify="center" align="center" vertical>
          <TypographyText type="warning" class="font-bold font-size-18px">
            {{ tip }}
          </TypographyText>
          <TypographyParagraph underline :content="targetUrl" class="mt-15px text-color-t-color font-size-18px" @click="onCopy" :copyable="{tooltip: false, text: targetUrl, onCopy}">
            {{ targetUrl }}
          </TypographyParagraph>
        </Flex>
        <Flex v-if="showJumpButton" justify="center" align="center" vertical>
          <Button type="primary" @click="handleJump">
            前往
          </Button>
        </Flex>
        <SocialLinks />
        <TypographyText type="secondary" class="font-size-10px absolute bottom-8px right-20px">
          点击右下角图标添加群组反馈问题！
        </TypographyText>
      </Flex>
    </Flex>
    <FloatButton />
    <Footer />
  </div>
</template>

<style scoped></style>
