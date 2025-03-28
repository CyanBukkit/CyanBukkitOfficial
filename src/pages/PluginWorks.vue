<!-- src/pages/PluginWorks.vue -->
<template>
  <MainLayout>
    <div class="plugin-works max-w-7xl mx-auto py-8 px-4">
      <h1 class="text-4xl font-bold mb-8 text-center">插件作品集</h1>

      <!-- Organization Info -->
      <div class="org-info bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-12 shadow-lg">
        <div class="flex items-center mb-4">
          <a-avatar :size="64" src="https://avatars.githubusercontent.com/u/162384745?s=200&v=4" class="mr-4" />
          <div>
            <h2 class="text-2xl font-bold">CyanBukkit</h2>
            <p class="text-blue-100">大庆瑞鸿网络科技工作室直属开源项目组织</p>
          </div>
        </div>
        <p class="mb-4">专注于Minecraft服务器开发、插件生态优化和跨时代游戏体验设计</p>
        <div class="flex flex-wrap gap-2">
          <a-button type="primary" ghost href="https://github.com/CyanBukkit" target="_blank" class="mr-2">
            <a-icon type="github" /> GitHub
          </a-button>
          <a-button ghost href="https://bgithub.xyz/cyanbukkit" target="_blank" class="mr-2">
            <a-icon type="link" /> 国内镜像
          </a-button>
          <a-button ghost href="https://kkgithub.com/cyanbukkit" target="_blank" class="mr-2">
            <a-icon type="link" /> 备用链接
          </a-button>
        </div>
      </div>

      <!-- Featured Project -->
      <div class="featured-project bg-white rounded-xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
        <a-row :gutter="0">
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
              <div class="repository-links mb-4">
                <h3 class="text-xl font-bold mb-2">代码仓库</h3>
                <a-space>
                  <a-button type="primary" size="large" :href="featuredProject.repository" target="_blank">
                    <a-icon type="github" /> GitHub
                  </a-button>
                  <a-button size="large" :href="featuredProject.mirror" target="_blank">
                    <a-icon type="link" /> 国内镜像
                  </a-button>
                </a-space>
              </div>
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
  title: 'CyanBukkit 核心框架',
  description: '高性能Minecraft服务器插件开发框架，提供稳定高效的Spigot/Bukkit插件开发解决方案',
  techStack: ['Java 17+', 'Spigot/Bukkit', 'MySQL', 'Redis', 'Nginx', 'Gradle'],
  repository: 'https://github.com/CyanBukkit/CyanTemplate',
  mirror: 'https://hub.fastgit.org/CyanBukkit/CyanTemplate'
});

const projects = ref([
  {
    id: 1,
    title: 'CyanTemplate',
    description: 'Spigot/Bukkit插件开发模板，内置常用功能模块',
    techStack: ['Java', 'Spigot/Bukkit', 'Gradle'],
    repository: 'https://github.com/CyanBukkit/CyanTemplate',
    mirror: 'https://hub.fastgit.org/CyanBukkit/CyanTemplate'
  },
  {
    id: 2,
    title: 'AutoBukkitPluginMake',
    description: '自动化Bukkit插件生成工具',
    techStack: ['Java', 'Spigot/Bukkit', 'Gradle'],
    repository: 'https://github.com/CyanBukkit/AutoBukkitPluginMake',
    mirror: 'https://hub.fastgit.org/CyanBukkit/AutoBukkitPluginMake'
  },
  {
    id: 3,
    title: 'CyanShop',
    description: 'Minecraft服务器商城系统',
    techStack: ['Java', 'Spigot/Bukkit', 'MySQL'],
    repository: 'https://github.com/CyanBukkit/CyanShop',
    mirror: 'https://hub.fastgit.org/CyanBukkit/CyanShop'
  }
]);
</script>

<style scoped>
.org-info {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.featured-project {
  transition: transform 0.3s, box-shadow 0.3s;
}

.featured-project:hover {
  transform: translateY(-5px);
}

.project-list .ant-card {
  transition: all 0.3s;
}

.project-list .ant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>