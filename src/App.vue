<!-- src/App.vue -->
<template>
  <router-view></router-view>
</template>

<script setup>
// Component logic here if needed
</script>

<style>
#app {
  min-height: 100vh;
  @apply overflow-x-hidden;
}

.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>