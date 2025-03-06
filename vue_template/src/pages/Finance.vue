<!-- src/pages/Finance.vue -->
<template>
  <MainLayout>
    <div class="finance max-w-7xl mx-auto py-8 px-4">
      <h1 class="text-4xl font-bold text-center mb-16">财务公示</h1>

      <!-- Quarter Selector -->
      <div class="text-center mb-8">
        <a-select
          v-model:value="selectedQuarter"
          style="width: 200px"
          @change="handleQuarterChange"
        >
          <a-select-option v-for="quarter in quarters" :key="quarter.value" :value="quarter.value">
            {{ quarter.label }}
          </a-select-option>
        </a-select>
      </div>

      <!-- Financial Overview -->
      <div class="financial-overview mb-16">
        <a-row :gutter="16">
          <a-col :span="8" v-for="stat in currentStats" :key="stat.title">
            <a-card>
              <a-statistic
                :title="stat.title"
                :value="stat.value"
                :precision="2"
                :value-style="{ color: stat.trend === 'up' ? '#3f8600' : '#cf1322' }"
              >
                <template #suffix>
                  <component :is="stat.trend === 'up' ? 'rise-outlined' : 'fall-outlined'" />
                </template>
              </a-statistic>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <!-- Revenue Chart -->
      <div class="revenue-chart mb-16">
        <h2 class="text-2xl font-bold mb-4">营收趋势</h2>
        <div ref="chartContainer" style="height: 400px"></div>
      </div>

      <!-- Detailed Report -->
      <div class="detailed-report">
        <h2 class="text-2xl font-bold mb-4">详细报告</h2>
        <a-table :columns="columns" :data-source="reportData" :pagination="false">
          <template #headerCell="{ column }">
            <template v-if="column.dataIndex === 'amount'">
              <span>金额（元）</span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import MainLayout from '../components/layout/MainLayout.vue';
import { RiseOutlined, FallOutlined } from '@ant-design/icons-vue';
import * as echarts from 'echarts';

const selectedQuarter = ref('2024Q1');
const chartContainer = ref(null);
let chart = null;

const quarters = [
  { value: '2024Q1', label: '2024年第一季度' },
  { value: '2023Q4', label: '2023年第四季度' },
  { value: '2023Q3', label: '2023年第三季度' },
  { value: '2023Q2', label: '2023年第二季度' }
];

const financialData = {
  '2024Q1': {
    stats: [
      { title: '季度营收', value: 2345678.90, trend: 'up' },
      { title: '净利润', value: 567890.12, trend: 'up' },
      { title: '运营成本', value: 1234567.89, trend: 'down' }
    ],
    monthlyRevenue: [
      { month: '1月', value: 780000 },
      { month: '2月', value: 820000 },
      { month: '3月', value: 745678.90 }
    ],
    details: [
      { key: '1', item: '产品销售', amount: 1500000 },
      { key: '2', item: '技术服务', amount: 500000 },
      { key: '3', item: '咨询服务', amount: 345678.90 }
    ]
  }
  // ... other quarters data
};

const currentStats = ref(financialData['2024Q1'].stats);
const reportData = ref(financialData['2024Q1'].details);

const columns = [
  { title: '项目', dataIndex: 'item', key: 'item' },
  { title: '金额', dataIndex: 'amount', key: 'amount' }
];

const handleQuarterChange = (value) => {
  currentStats.value = financialData[value].stats;
  reportData.value = financialData[value].details;
  updateChart(value);
};

const initChart = () => {
  chart = echarts.init(chartContainer.value);
  updateChart(selectedQuarter.value);
};

const updateChart = (quarter) => {
  const data = financialData[quarter].monthlyRevenue;
  const option = {
    title: { text: '月度营收趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: data.map(item => item.month)
    },
    yAxis: { type: 'value' },
    series: [{
      data: data.map(item => item.value),
      type: 'line',
      smooth: true
    }]
  };
  chart.setOption(option);
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', () => chart?.resize());
});

watch(selectedQuarter, (newValue) => {
  handleQuarterChange(newValue);
});
</script>

<style scoped>
.finance {
  min-height: calc(100vh - 64px - 200px);
}
</style>