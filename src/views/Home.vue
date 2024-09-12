<script lang="ts">
export default {
  name: 'Home',
};
</script>
<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import { CopyOutlined, CommentOutlined } from '@ant-design/icons-vue';
import { isWeChat, to, transformCurrentUrl } from '@/utils'
import { message, Button, TypographyParagraph, TypographyText, TypographyLink, Flex } from 'ant-design-vue';
import { useRoute } from 'vue-router'
import { targetHost, randomImgUrls } from '@/config'
import Footer from './Footer.vue';
import SocialLinks from './SocialLinks.vue';
import Time from './Time.vue'
import FloatButton from './FloatButton.vue'
import Loading from './Loading.vue'

const targetUrl = ref('https://www.fjy.zone')
const tip = ref('欢迎访问，此页面主要用于域名中转！')

const route = useRoute()

const initPage = () => {
  targetUrl.value = transformCurrentUrl(window.location, targetHost)
  if (isWeChat()) {
    tip.value = "您当前在微信环境，请复制链接到浏览器打开"
    return;
  }
  window.location.href = targetUrl.value
}

const onCopy = () => message.success('复制成功');

onMounted(() => {
  initPage()
  setRandomBackground()
})

const setRandomBackground = () => {
  let currentUrlIndex = 0;
  const bgDiv = document.querySelector('.bg-cover');

  const loadImage = () => {
    const img = new Image();
    img.onload = function() {
      bgDiv.style.backgroundImage = `url(${img.src})`;
    };
    img.onerror = function() {
      currentUrlIndex++;
      if (currentUrlIndex < randomImgUrls.length) {
        loadImage();
      } else {
        message.error('背景图片加载失败');
      }
    };
    img.src = randomImgUrls[currentUrlIndex];
  }
  loadImage();
}
</script>

<template>
  <!-- <Loading /> -->
  <div class="bg-cover">
    <Flex justify="center" align="center" class="w-100vw h-100vh">
      <Flex justify="space-between" vertical class="relative w-600px min-h-400px bg-coolgray-200 opacity-80 m-40px rounded-10px px-20px py-40px shadow-t-color shadow">
        <Time />
        <Flex justify="center" align="center" vertical>
          <TypographyText type="warning" class="font-bold font-size-18px">
            {{ tip }}
          </TypographyText>
          <TypographyParagraph mt-20px :copyable="{onCopy, tooltip: false, text: targetUrl}">
            <TypographyLink :href="targetUrl" font-size-18px target="_blank">{{ targetUrl }}</TypographyLink>
          </TypographyParagraph>
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
