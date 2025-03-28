// src/main.js
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './style.css';
import App from './App.vue';
import router from './router';
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'  // 该文件不存在，已注释掉

const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(VueVideoPlayer);
app.mount('#app');