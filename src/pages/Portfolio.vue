<!-- src/pages/Portfolio.vue -->
<template>
  <MainLayout>
    <div class="portfolio max-w-7xl mx-auto py-8 px-4">
      <!-- Filter Section -->

      <div class="mb-8">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-space>
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
              <video ref="videoPlayer" :src="selectedVideoUrl" controls class="video-element"
                @loadedmetadata="handleVideoReady" @error="handleVideoError" />

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
            <a-card v-for="item in filteredPortfolio" :key="item.id" hoverable class="portfolio-card" @click="openVideo(item)">
              <template #cover>
                <div >
                  <img :src="item.image" :alt="item.title" />
                </div>
              </template>
              <a-card-meta :title="item.title">
                <template #description>
                  <div>
                    <p>{{ item.description }}</p>
                    <p class="text-lg font-bold mt-2">¥{{ item.price }}</p>
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
import MainLayout from '../components/layout/MainLayout.vue';

const categories = [
  { value: 'all', label: '全部' },
  { value: 'short', label: '短视频' },
  { value: 'long', label: '长视频' }
];

const selectedCategory = ref('all');
const searchText = ref('');

const portfolio = ref([
  {
    id: 1,
    title: '短视频AI剪辑',
    description: '短视频剪辑',
    price: 1,
    category: 'short',
    image: '/assets/banner/1.png',
    tags: ['短视频', '低价'],
    videoLink: '/assets/videos/1.mp4' // 新增视频链接字段
  },
  {
    id: 2,
    title: '温馨向解说剪辑',
    description: '优质温馨向视频，有着治愈的旋律',
    price: 70,
    category: 'long',
    image: '/assets/banner/2.png',
    tags: ['长视频', '低价'],
    videoLink: '/assets/videos/2.mp4' // 新增视频链接字段
  },
  {
    id: 3,
    title: '全自定义定制剪辑',
    description: '给予充分的定制化, 风格, 内容全部可定制',
    price: 120,
    category: 'long',
    image: '/assets/banner/3.jpg',
    tags: ['长视频', '定制化'],
    videoLink: '/assets/videos/3.mp4' // 新增视频链接字段
  },
  {
    id: 4,
    title: '美式',
    description: '美式蒙太奇效果',
    price: 240,
    category: 'long',
    image: '/assets/banner/4.png',
    tags: ['长视频'],
    videoLink: '/assets/videos/4.mp4' // 新增视频链接字段
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

const openVideo = (item) => {
  selectedVideoUrl.value = item.videoLink;
  showVideoModal.value = true;
};


import { FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue';

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
});

</script>

<style scoped>
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
</style>
