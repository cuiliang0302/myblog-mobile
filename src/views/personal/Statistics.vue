<!--数据统计-->
<template>
  <div class="statistics">
    <NavBar :title="'数据统计'"></NavBar>
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
        <h2>浏览趋势</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="trend" :style="{ width: '350px', height: '300px' }"></div>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览时间</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="time" :style="{ width: '350px', height: '300px' }"></div>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览文章</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="article" :style="{ width: '350px', height: '350px' }"></div>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览笔记</h2>
        <span></span>
      </div>
      <div class="chart">
        <div id="note" :style="{ width: '350px', height: '360px' }"></div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/personal/NavBar";
import {onMounted, reactive, ref} from "vue";
import {Grid, GridItem, Tag, Toast} from 'vant';
import * as echarts from 'echarts'
import {getStatistics} from '@/api/record'
import user from "@/utils/user";
import {getCarousel} from "@/api/management";
import {getEcharts} from "@/api/public";
import {postLogin} from "@/api/account";
import store from "@/store";

export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tag.name]: Tag,
    NavBar
  },
  name: "Statistics",
  setup() {
    // 引入用户信息模块
    let {userId, isLogin} = user()
    // 数据概览
    const dataCount = reactive({})
    // echarts曲线颜色
    const color = ref([
      "#74b9ff",
      "#81ecec",
      "#55efc4",
      "#a29bfe",
      "#ffeaa7",
      "#fab1a0",
      "#ff7675",
      "#ff7675",
      "#b2bec3"
    ])

    // 浏览趋势折线图
    async function trend() {
      let chartData = await getEcharts(userId.value, 'trend')
      console.log(chartData)
      for (let i in chartData.xAxis) {
        chartData.xAxis[i] = chartData.xAxis[i].slice(5)
      }
      let myChart = echarts.init(document.getElementById("trend"));
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
            data: chartData.xAxis
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
            data: chartData.article_view
          },
          {
            name: '收藏文章数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: chartData.article_collect
          },
          {
            name: '评论文章数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: chartData.article_comment
          },
          {
            name: '浏览笔记数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: chartData.section_view
          },
          {
            name: '收藏笔记数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: chartData.section_comment
          },
          {
            name: '评论笔记数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: chartData.section_collect
          }
        ]
      });
      //自适应大小
      window.onresize = function () {
        myChart.resize();
      };
    };

    // 浏览时间柱形图
    async function time() {
      let chartData = await getEcharts(userId.value, 'time')
      console.log(chartData)
      let myChart = echarts.init(document.getElementById("time"));
      // 绘制图表
      myChart.setOption({
        color: color.value,
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
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
          data: ['01', '03', '05', '07', '09', '11', '13', '15', '17', '19', '21', '23']
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
            data: chartData.article
          },
          {
            name: '笔记',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: chartData.section
          }
        ]
      });
      //自适应大小
      window.onresize = function () {
        myChart.resize();
      };
    };

    // 浏览文章饼图
    async function article() {
      let chartData = await getEcharts(userId.value, 'article')
      console.log(chartData)
      let myChart = echarts.init(document.getElementById("article"));
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
            radius: '50%',
            data: chartData.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
      //自适应大小
      window.onresize = function () {
        myChart.resize();
      };
    };

    // 浏览笔记雷达图
    async function note() {
      let chartData = await getEcharts(userId.value, 'note')
      console.log(chartData)
      let myChart = echarts.init(document.getElementById("note"));
      // 绘制图表
      myChart.setOption({
        color: color.value,
        legend: {},
        radar: {
          // shape: 'circle',
          radius: '60%',
          indicator: chartData.indicator
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: chartData.data
            }
          ]
        }]
      });
      //自适应大小
      window.onresize = function () {
        myChart.resize();
      };
    };

    // 获取数据概览数据
    async function statisticsData() {
      let statistics_data = await getStatistics(userId.value)
      for (let i in statistics_data) {
        dataCount[i] = statistics_data[i]
      }
    }

    // // 获取浏览趋势图数据
    // async function echartsData() {
    //   trendData = await getEcharts(userId.value, 'trend')
    //   console.log(trendData)
    //   console.log(trendData.xAxis)
    // }

    onMounted(() => {
      statisticsData()
      trend();
      time()
      article()
      note()
    });
    return {
      dataCount,
    }
  }
}
</script>

<style scoped lang="scss">
section {
  background-color: white;
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
