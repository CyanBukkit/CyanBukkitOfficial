<!-- src/components/layout/Footer.vue -->
<template>
  <a-layout-footer class="footer">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="footer-section">
          <h3 class="text-lg font-bold mb-4">关于我们</h3>
          <p>专业的工作室，致力于提供高质量的创意服务</p>
        </div>
        <div class="footer-section">
          <h3 class="text-lg font-bold mb-4">联系方式</h3>
          <p>邮箱：contact@studio.com</p>
          <p>电话：+86 123 4567 8900</p>
        </div>
        <div class="footer-section">
          <h3 class="text-lg font-bold mb-4">快速链接</h3>
          <ul>
            <li><router-link to="/portfolio">样片网</router-link></li>
            <li><router-link to="/plugin-works">插件作品集</router-link></li>
            <li><router-link to="/about">关于我们</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="text-lg font-bold mb-4">关注我们</h3>
          <div class="social-links">
            <a href="#"><WechatOutlined /></a>
            <a href="#"><WeiboOutlined /></a>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <p>&copy; 2024 Studio. All rights reserved.</p>
      </div>
    </div>
  </a-layout-footer>
</template>

<script setup>
import { WechatOutlined, WeiboOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.footer {
  background: #f0f2f5;
  padding: 48px 24px;
}
.social-links a {
  margin-right: 16px;
  font-size: 24px;
  color: #1890ff;
}
</style>