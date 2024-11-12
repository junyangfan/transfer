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
const actualImageUrl = ref('')

const route = useRoute()

const initPage = () => {
  targetUrl.value = transformCurrentUrl(window.location, targetHost)
  if (isWeChat()) {
    tip.value = "您当前在微信环境，请直接点击右上角「...」，选择「在浏览器打开」，或者手动复制下方链接到浏览器打开！"
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
    // 使用fetch API获取图片URL
    fetch(randomImgUrls[currentUrlIndex])
      .then(response => {
        // 检查响应是否成功
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // 获取重定向后的图片URL
        return response.url;
      })
      .then(url => {
        actualImageUrl.value = url;
        bgDiv.style.backgroundImage = `url(${url})`;
      })
      .catch(error => {
        currentUrlIndex++;
        if (currentUrlIndex < randomImgUrls.length) {
          // 使用 setTimeout 来避免递归调用
          setTimeout(loadImage, 0);
        } else {
          console.error('所有背景图片加载失败', error);
        }
      });
  };

  loadImage();
};

const downloadBg = () => {
  if (!actualImageUrl.value) {
    message.error('背景图片未加载，请刷新后重试');
    return;
  }

  fetch(actualImageUrl.value)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'bg.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(error => {
      message.error('下载失败: ' + error.message);
    });
};
</script>

<template>
  <!-- <Loading /> -->
  <div class="bg-cover">
    <Flex justify="center" align="center" class="w-100vw h-100vh">
      <!-- <Button type="primary" @click="downloadBg" class="absolute top-20px right-20px opacity-80">
        下载壁纸
      </Button> -->
      <Flex justify="space-between" vertical class="relative w-600px min-h-420px bg-coolgray-200 opacity-80 m-40px rounded-10px px-20px py-40px shadow-t-color shadow">
        <Time />
        <Flex justify="center" align="center" vertical>
          <TypographyText type="warning" class="font-bold font-size-18px">
            {{ tip }}
          </TypographyText>
          <TypographyParagraph underline :content="targetUrl" class="mt-15px text-color-t-color font-size-18px" :ellipsis="{rows: 3}" @click="onCopy" :copyable="{onCopy, tooltip: false, text: targetUrl}" />
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
