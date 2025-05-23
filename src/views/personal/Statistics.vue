<!--数据统计-->
<template>
  <div class="statistics">
    <PersonalNavBar :title="'数据统计'"></PersonalNavBar>
    <section>
      <div class="title">
        <h2>数据概览</h2>
        <span></span>
      </div>
      <div class="overview">
        <van-grid :column-num="3">
          <van-grid-item>
            <span>
              <p>浏览文章数</p>
            </span>
            <h2>{{ dataCount.article_history }}</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>收藏文章数</p>
            </span>
            <h2>{{ dataCount.article_collect }}</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>评论文章数</p>
            </span>
            <h2>{{ dataCount.article_comment }}</h2>
          </van-grid-item>
        </van-grid>
        <van-grid :column-num="3">
          <van-grid-item>
            <span>
              <p>浏览笔记数</p>
            </span>
            <h2>{{ dataCount.section_history }}</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>收藏笔记数</p>
            </span>
            <h2>{{ dataCount.section_collect }}</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>评论笔记数</p>
            </span>
            <h2>{{ dataCount.section_comment }}</h2>
          </van-grid-item>
        </van-grid>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>最近七天浏览趋势</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="trend" :style="{ height: '300px' }"></div>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览时间</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="time" :style="{ height: '300px' }"></div>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览文章</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="article" :style="{ height: '350px' }"></div>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览笔记</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="note" :style="{ height: '360px' }"></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {onMounted, reactive, ref} from "vue";
import * as echarts from 'echarts'
import {storeToRefs} from 'pinia'
import {useThemeStore, useUserStore} from '@/store';
import record from "@/api/record";
import {showFailToast} from "vant";

const user = useUserStore();
const theme = useThemeStore();
const {is_dark} = storeToRefs(theme)
// 数据概览
const dataCount = reactive({})
// echarts明亮模式曲线颜色
const echartsLight = ref([
  "#3498db",
  "#f1c40f",
  "#2ecc71",
  "#f2b3c9",
  "#16a085",
  "#e67e22",
  '#008dd0',
  '#c22931',
  '#8e44ad',
  '#157623',
])
// echarts暗黑模式曲线颜色
const echartsDark = ref([
  '#e1605e',
  '#3498db',
  '#658f95',
  '#e9937e',
  '#7cb9a0',
  '#f0734f',
  '#eed875',
  '#62996a',
  '#5db0b3',
  '#1abc9c',
])

// echarts背景色
const bgc = ref()
// echarts颜色
const color = ref()
// 设置echarts主题色
const setColor = () => {
  if (is_dark.value === true) {
    bgc.value = '#1f1f1f'
    color.value = echartsDark.value
  } else {
    bgc.value = '#ffffff'
    color.value = echartsLight.value
  }
  console.log(bgc.value)
}

// 浏览趋势折线图
const trend = async () => {
  const query = {chart: 'trend'}
  const date = []
  const article_view = []
  const article_collect = []
  const article_comment = []
  const section_view = []
  const section_collect = []
  const section_comment = []
  try {
    const chartData = await record.getUserEcharts(query)
    for (let i in chartData) {
      date.push(chartData[i].date.slice(5))
      article_view.push(chartData[i].article_view)
      article_collect.push(chartData[i].article_collect)
      article_comment.push(chartData[i].article_comment)
      section_view.push(chartData[i].section_view)
      section_collect.push(chartData[i].section_collect)
      section_comment.push(chartData[i].section_comment)
    }
  } catch (e) {
    console.log(e)
    showFailToast("获取浏览趋势数据失败")
  }
  let myChart;
  if (is_dark.value === true) {
    myChart = echarts.init(document.getElementById("trend"), 'dark');
  } else {
    myChart = echarts.init(document.getElementById("trend"));
  }
  // 绘制图表
  myChart.setOption({
    color: color.value,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['浏览文章数', '收藏文章数', '评论文章数', '浏览笔记数', '收藏笔记数', '评论笔记数']
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: date
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '浏览文章数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: article_view
      },
      {
        name: '收藏文章数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: article_collect
      },
      {
        name: '评论文章数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: article_comment
      },
      {
        name: '浏览笔记数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: section_view
      },
      {
        name: '收藏笔记数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: section_comment
      },
      {
        name: '评论笔记数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: section_collect
      }
    ],
    backgroundColor: bgc.value
  });
  //自适应大小
  window.onresize = function () {
    myChart.resize();
  };
}

// 浏览时间柱形图
const time = async () => {
  const query = {chart: 'time'}
  const time = []
  const article = []
  const section = []
  try {
    const chartData = await record.getUserEcharts(query)
    console.log("time", chartData)
    chartData.forEach(function (item, index) {
      let article_count = 0
      let section_count = 0
      if (index % 2 === 0) {
        time.push(item.time)
        article_count = chartData[index].article + chartData[index + 1].article
        section_count = chartData[index].section + chartData[index + 1].section
        article.push(article_count)
        section.push(section_count)
      }
    })
  } catch (e) {
    console.log(e)
    showFailToast("获取浏览时间失败")
  }
  let myChart;
  if (is_dark.value === true) {
    myChart = echarts.init(document.getElementById("time"), 'dark');
  } else {
    myChart = echarts.init(document.getElementById("time"));
  }
  // 绘制图表
  myChart.setOption({
    color: color.value,
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // Use axis to trigger tooltip
        type: 'shadow',
        label: {
          formatter: function (params) {
            return params.value + ":00-" + (parseInt(params.value) + 1) + ":59";
          }
        }
      }
    },
    legend: {
      data: ['文章', '笔记']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: time,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '文章',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: article
      },
      {
        name: '笔记',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: section
      }
    ],
    backgroundColor: bgc.value
  });
  //自适应大小
  window.onresize = function () {
    myChart.resize();
  };
}

// 浏览文章饼图
const article = async () => {
  const query = {chart: 'article'}
  try {
    const chartData = await record.getUserEcharts(query)
    console.log("article", chartData)
    let myChart;
    console.log(is_dark.value)
    if (is_dark.value === true) {
      myChart = echarts.init(document.getElementById("article"), 'dark');
    } else {
      myChart = echarts.init(document.getElementById("article"));
    }
    // 绘制图表
    myChart.setOption({
      color: color.value,
      tooltip: {
        trigger: 'item'
      },
      legend: {},
      series: [
        {
          type: 'pie',
          top: '10%',
          radius: '50%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      backgroundColor: bgc.value
    });
    //自适应大小
    window.onresize = function () {
      myChart.resize();
    };
  } catch (e) {
    console.log(e)
    showFailToast("获取浏览文章数据失败")
  }
}

// 浏览笔记雷达图
const note = async () => {
  const query = {chart: 'note'}
  const indicator = []
  const data = []
  try {
    const chartData = await record.getUserEcharts(query)
    for (let i in chartData) {
      const item = {
        name: chartData[i].name,
        max: chartData[i].max
      }
      indicator.push(item)
      data.push(chartData[i].data)
    }
  } catch (e) {
    console.log(e)
    showFailToast("获取笔记数据失败")
  }
  let myChart;
  if (is_dark.value === true) {
    myChart = echarts.init(document.getElementById("note"), 'dark');
  } else {
    myChart = echarts.init(document.getElementById("note"));
  }
  // 绘制图表
  myChart.setOption({
    color: color.value,
    legend: {
      show: false
    },
    tooltip: {
      trigger: 'item'
    },
    radar: {
      // shape: 'circle',
      radius: '60%',
      indicator: indicator
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: data,
          name: '笔记统计'
        }
      ]
    }],
    backgroundColor: bgc.value
  });
  //自适应大小
  window.onresize = function () {
    myChart.resize();
  };
}

// 获取数据概览数据
const statisticsData = async () => {
  try {
    const statistics_data = await record.getStatistics()
    for (let i in statistics_data) {
      dataCount[i] = statistics_data[i]
    }
  } catch (e) {
    console.log(e)
    showFailToast("获取数据概览失败")
  }
}

onMounted(() => {
  setColor()
  statisticsData()
  trend();
  time()
  article()
  note()
});
</script>

<style scoped lang="less">

section {
  //@include background_color('background_color3');
  background-color: var(--background_color3);
  margin: 0.267rem;
  border-radius: 0.267rem;

  .title {
    padding: 0.267rem;

    h2 {
      margin: 0;
      padding: 0;
      font-weight: normal;
    }

    span {
      display: inline-block;
      height: 0.08rem;
      width: 1.933rem;
      background-image: linear-gradient(to right, #3498db, #2ecc71);
    }
  }

  .chart {
    text-align: center;
  }
}

.van-grid-item {
  span {
    p {
      display: inline-block;
    }
  }
}
</style>
