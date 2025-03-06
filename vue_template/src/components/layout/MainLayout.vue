<!-- src/components/layout/MainLayout.vue -->
<template>
  <a-layout>
    <Header />
    <a-layout-content>
      <slot></slot>
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

<style scoped>
.ant-layout {
  min-height: 100vh;
}
</style>