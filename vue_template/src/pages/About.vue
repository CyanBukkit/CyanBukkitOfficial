<!-- src/pages/About.vue -->
<template>
  <MainLayout>
    <div class="about max-w-7xl mx-auto py-8 px-4">
      <!-- Team Introduction -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold mb-4">关于我们</h1>
        <p class="text-lg">专业的团队，创新的理念，卓越的服务</p>
      </div>

      <!-- Team Categories -->
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="executives" tab="高管团队">
          <TeamMemberList :members="executives" />
        </a-tab-pane>
        <a-tab-pane key="technical" tab="技术团队">
          <TeamMemberList :members="technical" />
        </a-tab-pane>
        <a-tab-pane key="partners" tab="合伙人">
          <TeamMemberList :members="partners" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '../components/layout/MainLayout.vue';

const activeKey = ref('executives');

const executives = ref([
  {
    id: 1,
    name: '张总监',
    title: '创意总监',
    avatar: '/assets/images/exec1.jpg',
    skills: ['战略规划', '品牌建设', '团队管理'],
    workTime: '周一至周五 9:00-18:00',
    description: '10年创意行业经验，曾带领团队获得多个国际设计大奖'
  },
  {
    id: 2,
    name: '李总监',
    title: '技术总监',
    avatar: '/assets/images/exec2.jpg',
    skills: ['技术架构', '项目管理', '团队建设'],
    workTime: '周一至周五 9:00-18:00',
    description: '15年软件开发经验，专注于创新技术应用'
  }
]);

const technical = ref([
  {
    id: 3,
    name: '王工程师',
    title: '前端开发',
    avatar: '/assets/images/tech1.jpg',
    skills: ['Vue.js', 'React', 'TypeScript'],
    workTime: '周一至周五 10:00-19:00',
    description: '5年前端开发经验，擅长用户体验优化'
  },
  {
    id: 4,
    name: '刘工程师',
    title: '后端开发',
    avatar: '/assets/images/tech2.jpg',
    skills: ['Node.js', 'Python', 'MySQL'],
    workTime: '周一至周五 10:00-19:00',
    description: '6年后端开发经验，专注于高并发系统设计'
  },
  {
    id: 6,
    name: '吴工程师',
    title: 'UI/UX设计师',
    avatar: '/assets/images/tech1.jpg',
    skills: ['Figma', 'Adobe XD', 'Sketch', '用户研究'],
    workTime: '周一至周五 10:00-19:00',
    description: '4年设计经验，专注于用户体验设计和交互设计，曾主导多个大型项目的界面设计'
  },
  {
    id: 6,
    name: '吴工程师',
    title: 'UI/UX设计师',
    avatar: '/assets/images/tech1.jpg',
    skills: ['Figma', 'Adobe XD', 'Sketch', '用户研究'],
    workTime: '周一至周五 10:00-19:00',
    description: '4年设计经验，专注于用户体验设计和交互设计，曾主导多个大型项目的界面设计'
  },
  {
    id: 6,
    name: '吴工程师',
    title: 'UI/UX设计师',
    avatar: '/assets/images/tech1.jpg',
    skills: ['Figma', 'Adobe XD', 'Sketch', '用户研究'],
    workTime: '周一至周五 10:00-19:00',
    description: '4年设计经验，专注于用户体验设计和交互设计，曾主导多个大型项目的界面设计'
  }
]);

const partners = ref([
  {
    id: 5,
    name: '陈合伙人',
    title: '市场总监',
    avatar: '/assets/images/partner1.jpg',
    skills: ['市场策划', '商务拓展', '品牌营销'],
    workTime: '弹性工作制',
    description: '8年市场营销经验，负责品牌战略和市场拓展'
  }
]);
</script>

<script>
// 团队成员列表组件
const TeamMemberList = {
  props: {
    members: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <a-card v-for="member in members" :key="member.id" class="member-card">
        <template #cover>
          <img :src="member.avatar" :alt="member.name" class="member-avatar" />
        </template>
        <a-card-meta :title="member.name">
          <template #description>
            <div>
              <p class="font-bold">{{ member.title }}</p>
              <p class="mt-2">{{ member.description }}</p>
              <div class="mt-2">
                <strong>工作时间：</strong>{{ member.workTime }}
              </div>
              <div class="mt-2">
                <strong>技能：</strong>
                <a-tag v-for="skill in member.skills" :key="skill" class="mt-1 mr-1">
                  {{ skill }}
                </a-tag>
              </div>
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
  `
};
</script>

<style scoped>
.member-card {
  transition: transform 0.3s;
}
.member-card:hover {
  transform: translateY(-5px);
}
.member-avatar {
  height: 300px;
  object-fit: cover;
}
</style>