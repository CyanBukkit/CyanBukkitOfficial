<!-- src/pages/Portfolio.vue -->
<template>
  <MainLayout>
    <div class="portfolio max-w-7xl mx-auto py-8 px-4">
      <!-- Filter Section -->

      <div class="mb-8">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-space>
              <a-button class="hot-btn" @mouseover="showFire" @mouseleave="hideFire" @click="selectedCategory = selectedCategory === 'hot' ? 'all' : 'hot'" :class="{ 'active-filter': selectedCategory === 'hot' }">
                燃
                <div v-if="showFireEffect" class="fire-container">
                  <div class="flame"></div>
                </div>
              </a-button>
              <a-button class="warm-btn" @mouseover="showWarm" @mouseleave="hideWarm" @click="selectedCategory = selectedCategory === 'warm' ? 'all' : 'warm'" :class="{ 'active-filter': selectedCategory === 'warm' }">
                暖
                <div v-if="showWarmEffect" class="heart-container">
                  <div class="heart-particle"></div>
                </div>
              </a-button>
              <a-select v-model:value="selectedCategory" placeholder="选择分类" style="width: 200px"
                :options="categories" />
              <a-input-search v-model:value="searchText" placeholder="搜索作品" style="width: 200px" @search="onSearch" />
            </a-space>
          </a-col>
        </a-row>
      </div>



      <transition name="video-fade">
        <div>
          <div v-if="showVideoModal" class="video-modal" @click.self="handleClose">
            <div class="video-overlay" />

            <div class="video-container">
              <template v-if="isBilibiliVideo(selectedVideoUrl)">
                <!-- 不要自动静音 -->
                <iframe ref="videoPlayer" :src="selectedVideoUrl" controls class="video-element"
                  @loadedmetadata="handleVideoReady" @error="handleVideoError" scrolling="no" border="0"
                  frameborder="no" framespacing="0" allowfullscreen="true" playsinline />
              </template>
              <template v-else>
                <video ref="videoPlayer" :src="selectedVideoUrl" controls class="video-element"
                  @loadedmetadata="handleVideoReady" @error="handleVideoError" autoplay playsinline muted="false" />
              </template>
              <div class="control-bar">
                <button class="control-btn" @click.stop="toggleFullscreen">
                  <fullscreen-outlined />
                </button>
                <button class="control-btn close-btn" @click.stop="handleClose">
                  <close-outlined />
                </button>
              </div>
            </div>
          </div>


          <!-- Portfolio Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a-card v-for="item in filteredPortfolio" :key="item.id" hoverable class="portfolio-card"
              @click="openVideo(item)">
              <template #cover>
                <div>
                  <img :src="item.image" :alt="item.title" />
                </div>
              </template>
              <a-card-meta :title="item.title">
                <template #description>
                  <div>
                    <p>{{ item.description }}</p>
                    <p class="text-lg font-bold mt-2">¥{{ item.price }} 起步</p>
                    <a-tag v-for="tag in item.tags" :key="tag" class="mt-2 mr-2">
                      {{ tag }}
                    </a-tag>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </transition>
    </div>


  </MainLayout>


</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue';
import MainLayout from '../components/layout/MainLayout.vue';
import { onUnmounted } from 'vue';

const showWarmEffect = ref(false);
let warmInterval;

const createHeartParticle = () => {
  const particle = document.createElement('div');
  particle.className = 'heart-particle';
  particle.innerHTML = '♥';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.color = '#ff69b4';
  particle.style.position = 'fixed';
  particle.style.bottom = '-10px';
  particle.style.transition = 'all 1s ease-out';
  document.body.appendChild(particle);

  requestAnimationFrame(() => {
    particle.style.transform = `translateY(-50px) rotate(${Math.random() * 360}deg)`;
    particle.style.opacity = '0';
  });

  setTimeout(() => particle.remove(), 1000);
};

const showWarm = () => {
  hideWarm(); // 先清理残留
  showWarmEffect.value = true;
  warmInterval = setInterval(createHeartParticle, 80);
};

const hideWarm = () => {
  showWarmEffect.value = false;
  
  // 扩大选择器范围确保清除
  document.querySelectorAll('.heart-particle, .heart-container, [class^="heart-"]').forEach(p => p.remove());
  
  // 强制清除定时器
  if (warmInterval) {
    clearInterval(warmInterval);
    warmInterval = null;
  }

  // 添加二次清理保障
  setTimeout(() => {
    document.querySelectorAll('.heart-particle, .heart-container').forEach(p => p.remove());
  }, 100);
};

// 在onBeforeUnmount中添加
// 由于找不到 cleanupHeartParticles 函数，推测可能需要清理爱心粒子，这里复用 hideWarm 函数的清理逻辑
document.querySelectorAll('.heart-particle').forEach(p => p.remove());
// 在onUnmounted中添加
hideWarm();

const categories = [
  { value: 'all', label: '全部' },
  { value: 'hot', label: '燃' },
  { value: 'warm', label: '暖' }
];

const selectedCategory = ref('all');
const searchText = ref('');
const showFireEffect = ref(false);
let fireInterval;

const createParticle = () => {
  const particle = document.createElement('div');
  particle.className = 'fire-particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.opacity = '0';
  document.body.appendChild(particle);
  
  // 添加入场动画
  requestAnimationFrame(() => {
    particle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    particle.style.opacity = '1';
  });
  
  setTimeout(() => {
    particle.style.opacity = '0';
    particle.style.transform = 'translateY(-30px) scale(0.6)';
    particle.addEventListener('animationend', () => particle.remove());
    particle.addEventListener('transitionend', () => particle.remove(), { once: true });
  }, 700);
};

const showFire = () => {
  hideFire(); // 先清理残留
  showFireEffect.value = true;
  fireInterval = setInterval(createParticle, 50);
};

const hideFire = () => {
  showFireEffect.value = false;
  
  // 强制清除所有相关元素
  document.querySelectorAll('.fire-particle, .fire-container, .flame').forEach(el => el.remove());
  
  // 彻底清除定时器
  if (fireInterval) {
    clearInterval(fireInterval);
    fireInterval = null;
  }

  // 添加防抖确保清理完成
  setTimeout(() => {
    document.querySelectorAll('.fire-particle, .fire-container').forEach(el => el.remove());
  }, 100);
};

const portfolio = ref([
  {
    id: 1,
    title: 'RPG超燃宣传片',
    description: '没有修改不能修改！一气呵成！从开始制作到发布，必须无修改精准把控效果',
    price: 100,
    category: 'hot',
    image: '/assets/banner/1.png',
    tags: ['不能返工', '燃', '玄混'],
    videoLink: '//player.bilibili.com/player.html?isOutside=true&aid=113872719584972&bvid=BV1RMfeYrESi&cid=28019788508&p=1' // 新增视频链接字段
  },
  {
    id: 1,
    title: '短视频广告型',
    description: '短视频剪辑',
    price: 1,
    category: 'short',
    image: '/assets/banner/1.png',
    tags: ['短视频', '低价'],
    videoLink: 'https://2.kodo.cyanbukkit.cn/other/video/1.mp4' // 新增视频链接字段
  },
  {
    id: 2,
    title: '温馨向解说剪辑',
    description: '优质温馨向视频，有着治愈的旋律',
    price: 70,
    category: 'long',
    image: '/assets/banner/2.png',
    tags: ['长视频', '低价'],
    videoLink: 'https://2.kodo.cyanbukkit.cn/other/video/2.mp4' // 新增视频链接字段
  },
  {
    id: 3,
    title: '自定义定制剪辑（案例非实际样片也是别人的设计需求制作的）',
    description: '给予充分的定制化, 风格, 内容全部可定制, 所有内容都将由你来设计, 与客服交谈时, 可以把你的想法说出来, 价格在',
    price: 120,
    category: 'long',
    image: '/assets/banner/3.jpg',
    tags: ['长视频', '定制化'],
    videoLink: 'https://2.kodo.cyanbukkit.cn/other/video/3.mp4' // 新增视频链接字段
  },
  {
    id: 4,
    title: '美式',
    description: '美式蒙太奇效果',
    price: 240,
    category: 'long',
    image: '/assets/banner/4.png',
    tags: ['长视频'],
    videoLink: 'https://2.kodo.cyanbukkit.cn/other/video/4.mp4' // 新增视频链接字段
  },
]);

const filteredPortfolio = computed(() => {
  return portfolio.value.filter(item => {
    const categoryMatch = selectedCategory.value === 'all' || item.category === selectedCategory.value;
    const searchMatch = item.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.value.toLowerCase());
    return categoryMatch && searchMatch;
  });
});

const onSearch = (value) => {
  searchText.value = value;
};



// 新增视频弹窗相关状态
const showVideoModal = ref(false);
const selectedVideoUrl = ref('');

const isBilibiliVideo = (url) => {
  return url.includes('bilibili.com');
};

const openVideo = (item) => {
  selectedVideoUrl.value = item.videoLink;
  showVideoModal.value = true;
};


const props = defineProps({
  videoUrl: String
});

const emit = defineEmits(['close', 'error']);

const show = ref(false);
const videoPlayer = ref(null);
let isFullscreen = false;

// 处理全屏状态变化
const fullscreenHandler = () => {
  isFullscreen = !!document.fullscreenElement;
};

// 初始化事件监听
const initEventListeners = () => {
  document.addEventListener('fullscreenchange', fullscreenHandler);
};

// 清除事件监听
const cleanupEventListeners = () => {
  document.removeEventListener('fullscreenchange', fullscreenHandler);
};

// 视频元数据加载完成
const handleVideoReady = () => {
  videoPlayer.value.play().catch(error => {
    emit('error', { type: 'playback', message: '视频自动播放失败' });
  });
};

// 视频加载错误处理
const handleVideoError = () => {
  emit('error', { type: 'load', message: '视频加载失败' });
  handleClose();
};

// 切换全屏状态
const toggleFullscreen = async () => {
  try {
    if (!isFullscreen) {
      await videoPlayer.value.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error('全屏操作失败:', error);
  }
};

// 关闭弹窗
const handleClose = () => {
  if (isFullscreen) {
    document.exitFullscreen();
  }
  showVideoModal.value = false;
  emit('close');
};

// 监听videoUrl变化
watch(() => props.videoUrl, (newVal) => {
  show.value = !!newVal;
  if (newVal) initEventListeners();
});

// 组件卸载前清理
onBeforeUnmount(() => {
  cleanupEventListeners();
  if (isFullscreen) {
    document.exitFullscreen();
  }
  // 强制清理所有特效元素
  document.querySelectorAll('.fire-container, .fire-particle, .heart-particle, .heart-container').forEach(el => el.remove());
  
  // 清除所有可能存在的定时器
  if (fireInterval) clearInterval(fireInterval);
  if (warmInterval) clearInterval(warmInterval);
});

// 添加卸载时双重保障
onUnmounted(() => {
  hideFire();
  hideWarm();
  
  // 最终清理残留元素
  requestAnimationFrame(() => {
    document.querySelectorAll('.fire-particle, .heart-particle').forEach(el => el.remove());
  });
});

</script>

<style scoped>
.hot-btn {
  position: relative;
  overflow: visible;
  z-index: 1;
}

.fire-container {
   position: absolute;
   bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 140%;
    height: 70px;
    pointer-events: none;
    z-index: 1;
}

.heart-particle {
  position: fixed;
  bottom: -10px;
  animation: heart-float 1s ease-out;
  filter: drop-shadow(0 0 2px rgba(255,105,180,0.5));
  font-size: 1.2em;
}

@keyframes flame-flicker {
  0% { height: 90px; opacity: 0.9; }
  100% { height: 110px; opacity: 1; }
}

@keyframes particle-float {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
}

.portfolio-card {
  transition: transform 0.3s;
}

.portfolio-card:hover {
  transform: translateY(-5px);
}

.video-fade-enter-active,
.video-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.video-fade-enter-from,
.video-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.video-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.9);
}

.video-container {
  position: relative;
  width: min(90vw, 1200px);
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.control-bar {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 12px;
}

.control-btn {
  padding: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: grid;
  place-items: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

.control-btn :deep(svg) {
  font-size: 1.2em;
  color: white;
}

@media (max-width: 768px) {
  .video-container {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }

  .control-bar {
    top: 8px;
    right: 8px;
  }
}

.video-fade-enter-active,
.video-fade-leave-active {
  transition: all 0.3s ease;
}

.video-fade-enter-from,
.video-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.video-modal {
  transition: all 0.3s ease;
}

.hot-btn.active-filter {
  background: rgba(255, 87, 34, 0.1);
  border-color: #ff5722;
  box-shadow: 0 0 8px rgba(255, 87, 34, 0.3);
}

.warm-btn.active-filter {
  background: rgba(255, 152, 0, 0.1);
  border-color: #ff9800;
  box-shadow: 0 0 8px rgba(255, 152, 0, 0.3);
}


.hot-btn {
  position: relative;
  overflow: visible;
  z-index: 1;
}

.fire-container {
   position: absolute;
   bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px) scaleY(0.9);
    width: 140%;
    height: 70px;
   filter: drop-shadow(0 2px 8px rgba(255, 80, 0, 0.3));
   opacity: 1;
   transition: opacity 0.3s;
   filter: drop-shadow(0 0 8px rgba(255, 80, 0, 0.3));
   pointer-events: none;
   z-index: 1;
   overflow: hidden;
 }

.flame {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, #ff3300, #ff6600, #ff9900);
  border-radius: 50% 50% 0 0;
  filter: blur(10px);
  animation: flame-flicker 0.3s infinite alternate;
}

.fire-particle {
  position: fixed;
  bottom: -10px;
  width: 5px;
  height: 5px;
  background: #ff6600;
  border-radius: 50%;
  animation: particle-float 1s ease-out;
  pointer-events: none;
}

@keyframes flame-flicker {
  0% { height: 90px; opacity: 0.9; }
  100% { height: 110px; opacity: 1; }
}

@keyframes particle-float {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
}

.portfolio-card {
  transition: transform 0.3s;
}

.portfolio-card:hover {
  transform: translateY(-5px);
}

.video-fade-enter-active,
.video-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.video-fade-enter-from,
.video-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.video-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.9);
}

.video-container {
  position: relative;
  width: min(90vw, 1200px);
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.control-bar {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 12px;
}

.control-btn {
  padding: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: grid;
  place-items: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

.control-btn :deep(svg) {
  font-size: 1.2em;
  color: white;
}

@media (max-width: 768px) {
  .video-container {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }

  .control-bar {
    top: 8px;
    right: 8px;
  }
}

.video-fade-enter-active,
.video-fade-leave-active {
  transition: all 0.3s ease;
}

.video-fade-enter-from,
.video-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.video-modal {
  transition: all 0.3s ease;
}

.hot-btn.active-filter {
  background: rgba(255, 87, 34, 0.1);
  border-color: #ff5722;
  box-shadow: 0 0 8px rgba(255, 87, 34, 0.3);
}

.warm-btn.active-filter {
  background: rgba(255, 152, 0, 0.1);
  border-color: #ff9800;
  box-shadow: 0 0 8px rgba(255, 152, 0, 0.3);
}

.heart-particle {
  animation: heart-float 1s ease-out;
  filter: drop-shadow(0 0 2px rgba(255,105,180,0.5));
}

@keyframes heart-float {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-80px) rotate(720deg); opacity: 0; }
}


</style>