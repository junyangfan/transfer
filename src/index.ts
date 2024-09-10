import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import routers from '@/routers'
import 'ant-design-vue/dist/reset.css';

createApp(App).use(routers).mount('#root');
