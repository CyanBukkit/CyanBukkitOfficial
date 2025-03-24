<!-- src/components/layout/Footer.vue -->
<template>
  <a-layout-footer class="footer">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="footer-section">
          <h3 class="text-lg font-bold mb-4">关于我们</h3>
          <p>CyanBukkit网站是由 大庆瑞鸿网络科技工作室运营 工作室主要专注于我的世界服务器插件、服务端和宣传片的定制开发。我们以“公司如家”为理念，鼓励随时随地办公。团队成员具有丰富经验，包括Java程序员、剪辑师、海报设计师、网络音乐人等。室长性格独特，热衷于编程语言和程序接口，对Minecraft有深厚理解。尽管学历普遍不高，但我们在各自领域都有卓越成就和专业能力。工作室致力于提供高质量服务和产品，相信通过团队合作和不断学习进步，我们将取得更大成功。</p>
        </div>
        <div class="footer-section">
          <h3 class="text-lg font-bold mb-4">联系方式</h3>
          <p>邮箱：admin@lanternmc.cn</p>
          <p>电话：400-133-5385</p>
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
            <a href="https://space.bilibili.com/60051886"><VideoCameraOutlined /></a>
            <a href="https://github.com/CyanBukkit"><GithubOutlined /></a>
            <a href="https://pd.qq.com/s/1texmvle1"><QqOutlined /></a>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <p>&copy; 2025 CyanBukkit Union. All rights reserved.</p>
      </div>
    </div>
  </a-layout-footer>
</template>

<script setup>
import { VideoCameraOutlined, GithubOutlined, QqOutlined } from '@ant-design/icons-vue';
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