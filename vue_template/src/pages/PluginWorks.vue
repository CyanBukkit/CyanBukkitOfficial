<!-- src/pages/PluginWorks.vue -->
<template>
  <MainLayout>
    <div class="plugin-works max-w-7xl mx-auto py-8 px-4">
      <h1 class="text-4xl font-bold mb-8">插件作品集</h1>

      <!-- Featured Project -->
      <div class="featured-project mb-16">
        <a-row :gutter="24">
          <a-col :span="12">
            <img :src="featuredProject.image" :alt="featuredProject.title" class="w-full rounded-lg shadow-lg" />
          </a-col>
          <a-col :span="12">
            <div class="p-4">
              <h2 class="text-3xl font-bold mb-4">{{ featuredProject.title }}</h2>
              <p class="text-lg mb-4">{{ featuredProject.description }}</p>
              <div class="tech-stack mb-4">
                <h3 class="text-xl font-bold mb-2">技术栈</h3>
                <a-tag v-for="tech in featuredProject.techStack" :key="tech" class="mr-2 mb-2">
                  {{ tech }}
                </a-tag>
              </div>
              <a-button type="primary" size="large">查看详情</a-button>
            </div>
          </a-col>
        </a-row>
      </div>

      <!-- Project List -->
      <div class="project-list">
        <a-row :gutter="[24, 24]">
          <a-col :span="8" v-for="project in projects" :key="project.id">
            <a-card hoverable>
              <template #cover>
                <img :src="project.image" :alt="project.title" />
              </template>
              <a-card-meta :title="project.title">
                <template #description>
                  <div>
                    <p class="mb-2">{{ project.description }}</p>
                    <div class="tech-tags">
                      <a-tag v-for="tech in project.techStack" :key="tech" class="mr-1 mb-1">
                        {{ tech }}
                      </a-tag>
                    </div>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '../components/layout/MainLayout.vue';

const featuredProject = ref({
  title: '智能数据分析平台',
  description: '为企业提供全方位的数据分析解决方案，包括数据可视化、预测分析和实时监控等功能。',
  image: '/assets/images/featured-project.jpg',
  techStack: ['Vue.js', 'Node.js', 'TensorFlow', 'Docker']
});

const projects = ref([
  {
    id: 1,
    title: '电商数据分析插件',
    description: '集成多平台数据，提供销售趋势分析',
    image: '/assets/images/plugin1.jpg',
    techStack: ['Vue.js', 'Python', 'MySQL']
  },
  {
    id: 2,
    title: '社交媒体管理工具',
    description: '多平台内容管理和数据分析',
    image: '/assets/images/plugin2.jpg',
    techStack: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 3,
    title: '在线教育平台插件',
    description: '课程管理和学习追踪系统',
    image: '/assets/images/plugin3.jpg',
    techStack: ['Vue.js', 'Django', 'PostgreSQL']
  }
]);
</script>

<style scoped>
.featured-project img {
  max-height: 400px;
  object-fit: cover;
}
</style>