<!-- src/pages/Portfolio.vue -->
<template>
  <MainLayout>
    <div class="portfolio max-w-7xl mx-auto py-8 px-4">
      <!-- Filter Section -->
      <div class="mb-8">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-space>
              <a-select
                v-model:value="selectedCategory"
                placeholder="选择分类"
                style="width: 200px"
                :options="categories"
              />
              <a-input-search
                v-model:value="searchText"
                placeholder="搜索作品"
                style="width: 200px"
                @search="onSearch"
              />
            </a-space>
          </a-col>
        </a-row>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <a-card
          v-for="item in filteredPortfolio"
          :key="item.id"
          hoverable
          class="portfolio-card"
        >
          <template #cover>
            <img :src="item.image" :alt="item.title" />
          </template>
          <a-card-meta :title="item.title">
            <template #description>
              <div>
                <p>{{ item.description }}</p>
                <p class="text-lg font-bold mt-2">¥{{ item.price }}</p>
                <a-tag v-for="tag in item.tags" :key="tag" class="mt-2 mr-2">
                  {{ tag }}
                </a-tag>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import MainLayout from '../components/layout/MainLayout.vue';

const categories = [
  { value: 'all', label: '全部' },
  { value: 'photography', label: '摄影' },
  { value: 'design', label: '设计' },
  { value: 'video', label: '视频' }
];

const selectedCategory = ref('all');
const searchText = ref('');

const portfolio = ref([
  {
    id: 1,
    title: '商业摄影套餐A',
    description: '专业商品摄影，包含10张精修图片',
    price: 2999,
    category: 'photography',
    image: '<tool_call>ImageGetter.get(search_term="professional product photography", image_save_path="/data/chats/4whzj/workspace/vue_template/public/assets/images/portfolio1.jpg", mode="search")</tool_call>',
    tags: ['商品摄影', '电商']
  },
  {
    id: 2,
    title: '品牌设计套餐',
    description: '品牌VI设计，包含logo和基础应用设计',
    price: 9999,
    category: 'design',
    image: '<tool_call>ImageGetter.get(search_term="brand identity design", image_save_path="/data/chats/4whzj/workspace/vue_template/public/assets/images/portfolio2.jpg", mode="search")</tool_call>',
    tags: ['品牌设计', 'VI设计']
  },
  {
    id: 3,
    title: '企业宣传片',
    description: '5分钟企业形象片拍摄制作',
    price: 19999,
    category: 'video',
    image: '<tool_call>ImageGetter.get(search_term="corporate video production", image_save_path="/data/chats/4whzj/workspace/vue_template/public/assets/images/portfolio3.jpg", mode="search")</tool_call>',
    tags: ['视频制作', '企业宣传']
  }
]);

const filteredPortfolio = computed(() => {
  return portfolio.value.filter(item => {
    const categoryMatch = selectedCategory.value === 'all' || item.category === selectedCategory.value;
    const searchMatch = item.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchText.value.toLowerCase());
    return categoryMatch && searchMatch;
  });
});

const onSearch = (value) => {
  searchText.value = value;
};
</script>

<style scoped>
.portfolio-card {
  transition: transform 0.3s;
}
.portfolio-card:hover {
  transform: translateY(-5px);
}
</style>
