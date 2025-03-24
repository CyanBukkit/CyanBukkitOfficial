<!-- src/components/layout/Header.vue -->
<template>
  <a-layout-header class="header">
    <div class="flex items-center max-w-7xl mx-auto px-4 relative">
      <div class="flex-grow">
        <router-link to="/" class="text-white text-xl font-bold">CyanBukkit Studio</router-link>
      </div>
      
      <!-- 桌面端导航 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :items="menuItems"
        @click="handleMenuClick"
        class="hidden md:flex z-50"
      />

      <!-- 移动端汉堡菜单 -->
      <menu-outlined 
        class="text-white text-xl block md:hidden cursor-pointer"
        @click="showDrawer = true"
      />

      <!-- 移动端抽屉导航 -->
      <a-drawer
        placement="right"
        :visible="showDrawer"
        @close="showDrawer = false"
        :body-style="{ padding: 0 }"
        :width="280"
        class="md:hidden"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="vertical"
          :items="menuItems"
          @click="handleMenuClick"
          class="h-full overflow-y-auto"
        />
      </a-drawer>
    </div>
  </a-layout-header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MenuOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref([route.path]);

const menuItems = [
  { key: '/', label: '首页' },
  { key: '/portfolio', label: '样片网' },
  { key: '/plugin-works', label: '插件作品集' },
  { key: '/about', label: '关于我们' },
  { key: '/partners', label: '联合与代理' },
  { key: '/finance', label: '财务公示' },
];

const showDrawer = ref(false);

const handleMenuClick = (e) => {
  router.push(e.key);
  showDrawer.value = false;
};

watch(() => route.path, (newPath) => {
  selectedKeys.value = [newPath];
});

const handleResize = () => {
  if (window.innerWidth >= 768) {
    showDrawer.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.header {
  background: #001529;
  padding: 0;
  position: relative;
  z-index: 40;
}
</style>