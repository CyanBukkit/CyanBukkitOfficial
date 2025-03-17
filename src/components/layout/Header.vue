<!-- src/components/layout/Header.vue -->
<template>
  <a-layout-header class="header">
    <div class="flex justify-between items-center max-w-7xl mx-auto">
      <div class="logo">
        <router-link to="/" class="text-white text-xl font-bold">Studio</router-link>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :items="menuItems"
        @click="handleMenuClick"
      />
    </div>
  </a-layout-header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

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

const handleMenuClick = (e) => {
  router.push(e.key);
};

watch(() => route.path, (newPath) => {
  selectedKeys.value = [newPath];
});
</script>

<style scoped>
.header {
  background: #001529;
  padding: 0;
}
</style>