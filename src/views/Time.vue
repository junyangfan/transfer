<script lang="ts">
export default {
  name: 'Time',
};
</script>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { getCurrentTime } from '@/utils'

const currentTime = ref({});
const timeInterval = ref(null);

// 更新时间
const updateTimeData = () => {
  currentTime.value = getCurrentTime();
};

onMounted(() => {
  updateTimeData();
  timeInterval.value = setInterval(updateTimeData, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timeInterval.value);
});
</script>

<template>
  <div>
    <div class="flex justify-center font-bold font-size-5">
      <span>{{ currentTime.year }}年&nbsp;</span>
      <span>{{ currentTime.month }}月&nbsp;</span>
      <span>{{ currentTime.day }}日&nbsp;</span>
      <span>{{ currentTime.weekday }}&nbsp;</span>
    </div>
    <div class="flex justify-center font-bold mt-10px font-size-12">{{ currentTime.hour }}:{{ currentTime.minute }}:<span text-t-color>{{ currentTime.second }}</span> </div>
  </div>
</template>

<style scoped></style>
