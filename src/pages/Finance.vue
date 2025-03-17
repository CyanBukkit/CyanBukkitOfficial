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
  { value: '2024Q1', label: '2024年全年' },
];

const financialData = {
  '2024Q1': {
    stats: [
      { title: '年度营收', value: 15642.16, trend: 'down' },
      { title: '总支出', value: 16236.25, trend: 'up' },
      { title: '净收支', value: -594.09, trend: 'down' },
      { title: '账户余额', value: 594.04, trend: 'down' }
    ],
    monthlyRevenue: [
      { month: '2024-01', value: 4200.00 },
      { month: '2024-03', value: 3800.00 },
      { month: '2024-12', value: 5642.16 }
    ],
    incomeCategories: [
      { type: '线上支付', count: 87, ratio: '68%', amount: 10642.10 },
      { type: '技术服务', count: 45, ratio: '25%', amount: 3900.00 },
      { type: '利息收入', count: 12, ratio: '5%', amount: 781.50 },
      { type: '其他收入', count: 5, ratio: '2%', amount: 318.56 }
    ],
    expenseCategories: [
      { type: '平台服务', count: 92, ratio: '61%', amount: 9901.23 },
      { type: '技术运维', count: 35, ratio: '24%', amount: 3895.00 },
      { type: '业务结算', count: 18, ratio: '12%', amount: 1948.00 },
      { type: '其他支出', count: 4, ratio: '3%', amount: 492.02 }
    ],
    balanceChange: {
      start: 900.69,
      end: 594.04,
      period: '2024-01-01 至 2024-12-30'
    }
  },
  //
};

const currentStats = ref(financialData['2024Q1'].stats);
const reportData = ref(financialData['2024Q1'].details);

const columns = [
  { title: '类别', dataIndex: 'type', key: 'type' },
  { title: '笔数', dataIndex: 'count', key: 'count' },
  { title: '占比', dataIndex: 'ratio', key: 'ratio' },
  { title: '金额', dataIndex: 'amount', key: 'amount' }
];

const handleQuarterChange = (value) => {
  currentStats.value = financialData[value].stats;
  reportData.value = value.includes('FY') 
    ? (financialData[value]?.incomeCategories || []).concat(financialData[value]?.expenseCategories || [])
    : financialData[value]?.details || [];
  updateChart(value);
};

const initChart = () => {
  chart = echarts.init(chartContainer.value);
  updateChart(selectedQuarter.value);
};

const updateChart = (quarter) => {
  const data = financialData[quarter]?.monthlyRevenue || [];
  const option = {
    title: { text: '月度营收趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: data?.map(item => item.month) || []
    },
    yAxis: { type: 'value' },
    series: [{
      data: data?.map(item => item.value) || [],
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