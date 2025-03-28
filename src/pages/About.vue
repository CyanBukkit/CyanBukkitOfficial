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
        <a-tab-pane key="executives" tab="管理团队">
          <TeamMemberList :members="executives" />
        </a-tab-pane>
        <a-tab-pane key="technical" tab="技术团队">
          <TeamMemberList :members="technical" />
        </a-tab-pane>
        <!-- <a-tab-pane key="partners" tab="合伙人">
          <TeamMemberList :members="partners" />
        </a-tab-pane> -->
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
    name: '六欲玄易',
    title: '执行董事',
    avatar: '/assets/images/workers/1.png',
    skills: ['总指挥杂项任务', '中二策划人', '团队管理'],
    workTime: '几乎每天',
    description: '主播出身, 平面设计师有着法式美学, 擅长各种平面设计, 后自学编程自立门户'
  },
  {
    id: 2,
    name: 'LC',
    title: '公关管理人',
    avatar: '/assets/images/workers/2.png',
    skills: ['公关',  '程序开发'],
    workTime: '周一至周五 9:00-18:00',
    description: '15年Java软件开发经验, 专注于前端后端开发, 擅长Java, Python, 曾参与多个大型项目开发'
  },
  {
    id: 3,
    name: '张灯笼',
    title: '高层运营',
    avatar: '/assets/images/workers/3.jpg',
    skills: ['高管', '监事', '运维'],
    workTime: '周一至周五 9:00-18:00',
    description: '在校大学生, 擅长Java, Python， 团队初创者'
  }
]);

const technical = ref([{
    id: 4,
    name: '楚楚',
    title: '开发',
    avatar: '/assets/images/workers/4.jpg',
    skills: ['MC插件开发'],
    workTime: '未知',
    description: '生存，小游戏spigotmc插件开发'
  },
  {
    id: 5,
    name: '林十米',
    title: '摄影师',
    avatar: '/assets/images/workers/5.jpg',
    skills: ['MC宣传片拍摄'],
    workTime: '每晚9点-12点',
    description: '玄易的首位徒弟型摄影师, 擅长MC宣传片拍摄'
  },
]);

const partners = ref([]);
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
