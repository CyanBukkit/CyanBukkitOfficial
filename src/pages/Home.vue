<!-- src/pages/Home.vue -->
<template>
  <MainLayout>
    <div class="home">
      <!-- Hero Banner -->
      <a-carousel class="hero-banner" autoplay>
        <div v-for="(banner, index) in banners" :key="index" class="banner-slide">
          <img :src="banner.image" :alt="banner.title" class="banner-image" />
          <div class="banner-content">
            <h1>{{ banner.title }}</h1>
            <p>{{ banner.description }}</p>
          </div>
        </div>
      </a-carousel>

      <!-- Stats Section -->
      <div class="stats-section">
        <div class="max-w-7xl mx-auto py-16 px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div v-for="stat in stats" :key="stat.title" class="stat-card">
              <h3 class="text-3xl font-bold">{{ stat.value }}</h3>
              <p>{{ stat.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Latest Works -->
      <div class="works-section">
        <div class="max-w-7xl mx-auto py-16 px-4">
          <h2 class="text-3xl font-bold mb-8">最新作品</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a-card v-for="work in latestWorks" :key="work.id" hoverable>
              <template #cover>
                <img :src="work.image" :alt="work.title" />
              </template>
              <a-card-meta :title="work.title" :description="work.description" />
            </a-card>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '../components/layout/MainLayout.vue';

const banners = ref([
  {
    title: '创意无限',
    description: '专业的创意团队，为您打造独特的视觉体验',
    image: '/assets/images/banner1.jpg'
  },
  {
    title: '技术革新',
    description: '引领行业技术发展，创造无限可能',
    image: '/assets/images/banner2.jpg'
  }
]);

const stats = ref([
  { title: '完成项目', value: '500+' },
  { title: '合作客户', value: '200+' },
  { title: '团队成员', value: '50+' },
  { title: '获得奖项', value: '30+' }
]);

const latestWorks = ref([
  {
    id: 1,
    title: '创意摄影',
    description: '2024最新摄影作品',
    image: '/assets/images/work1.jpg'
  },
  {
    id: 2,
    title: '品牌设计',
    description: '全新品牌视觉系统',
    image: '/assets/images/work2.jpg'
  },
  {
    id: 3,
    title: '网站开发',
    description: '响应式企业官网',
    image: '/assets/images/work3.jpg'
  }
]);
</script>

<style scoped>
.hero-banner {
  height: 600px;
}
.banner-slide {
  height: 600px;
  position: relative;
}
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.stats-section {
  background: #f0f2f5;
}
.stat-card {
  text-align: center;
  padding: 24px;
}
</style>