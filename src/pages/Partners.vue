<!-- src/pages/Partners.vue -->
<template>
  <MainLayout>
    <div class="partners max-w-7xl mx-auto py-8 px-4">
      <h1 class="text-4xl font-bold text-center mb-16">联合与代理</h1>

      <!-- Partners Showcase -->
      <div class="partner-types mb-16">
        <a-tabs v-model:activeKey="activeTab">
          <a-tab-pane key="tech" tab="技术合作伙伴">
            <PartnerGrid :partners="techPartners" />
          </a-tab-pane>
          <a-tab-pane key="creative" tab="创意合作伙伴">
            <PartnerGrid :partners="creativePartners" />
          </a-tab-pane>
          <a-tab-pane key="business" tab="商业合作伙伴">
            <PartnerGrid :partners="businessPartners" />
          </a-tab-pane>
        </a-tabs>
      </div>

      <!-- Cooperation Process -->
      <div class="cooperation-process mb-16">
        <h2 class="text-2xl font-bold mb-8">合作流程</h2>
        <a-steps :current="1">
          <a-step title="提交申请" description="填写合作意向表单" />
          <a-step title="需求评估" description="双方进行详细沟通" />
          <a-step title="签订协议" description="确定合作方式和条款" />
          <a-step title="正式合作" description="开始项目合作" />
        </a-steps>
      </div>

      <!-- Contact Form -->
      <div class="contact-form">
        <h2 class="text-2xl font-bold mb-8">合作咨询</h2>
        <a-form :model="formState" @finish="onFinish">
          <a-form-item label="公司名称" name="company" :rules="[{ required: true }]">
            <a-input v-model:value="formState.company" />
          </a-form-item>
          <a-form-item label="联系人" name="contact" :rules="[{ required: true }]">
            <a-input v-model:value="formState.contact" />
          </a-form-item>
          <a-form-item label="联系方式" name="phone" :rules="[{ required: true }]">
            <a-input v-model:value="formState.phone" />
          </a-form-item>
          <a-form-item label="合作意向" name="intention" :rules="[{ required: true }]">
            <a-textarea v-model:value="formState.intention" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">提交申请</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '../components/layout/MainLayout.vue';
import { message } from 'ant-design-vue';

const activeTab = ref('tech');
const formState = ref({
  company: '',
  contact: '',
  phone: '',
  intention: ''
});

const techPartners = ref([
  {
    name: '丹阳剑客网络有限公司',
    logo: 'https://cloud.swordsman.com.cn/images/r99950x.webp',
    description: '一家优秀的有着悠久历史的服务器提供租用服务以及方案策划的公司',
    link: 'https://cloud.swordsman.com.cn/?ifa1c20'
  },
  // ... more partners
]);

const creativePartners = ref([
  // {
  //   name: '创意设计工作室',
  //   logo: '/assets/images/creative-partner1.jpg',
  //   description: '专注于创意设计和品牌策划'
  // },
  // ... more partners
]);

const businessPartners = ref([
  // {
  //   name: '商业咨询集团',
  //   logo: '/assets/images/business-partner1.jpg',
  //   description: '提供专业的商业策略和市场分析'
  // },
  // ... more partners
]);

const onFinish = values => {
  console.log('Success:', values);
  message.info('提交系统暂未完善,请联系QQ:2569224983');
};
</script>

<script>
// Partner Grid Component
const PartnerGrid = {
  props: {
    partners: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <a-card v-for="partner in partners" :key="partner.name" hoverable @click="partner.link ? window.open(partner.link, '_blank') : null">
        <template #cover>
          <img :src="partner.logo" :alt="partner.name" class="h-48 object-contain" />
        </template>
        <a-card-meta :title="partner.name" :description="partner.description" />
      </a-card>
    </div>
  `
};
</script>

<style scoped>
.partners {
  min-height: calc(100vh - 64px - 200px);
}
</style>