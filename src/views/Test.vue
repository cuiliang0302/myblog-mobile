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
            <h2>20</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>收藏文章数</p>
            </span>
            <h2>12</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>评论文章数</p>
            </span>
            <h2>2</h2>
          </van-grid-item>
        </van-grid>
        <van-grid :column-num="3">
          <van-grid-item>
            <span>
              <p>浏览笔记数</p>
            </span>
            <h2>20</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>收藏笔记数</p>
            </span>
            <h2>11</h2>
          </van-grid-item>
          <van-grid-item>
            <span>
              <p>评论笔记数</p>
            </span>
            <h2>1</h2>
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
        <div id="note" :style="{ width: '350px', height: '350px' }"></div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/personal/NavBar";
import {onMounted, reactive, ref} from "vue";
import {Grid, GridItem, Tag} from 'vant';
import * as echarts from 'echarts'

export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tag.name]: Tag,
    NavBar
  },
  name: "Test",
  setup() {
    // echarts曲线颜色
    const color = ref([
      "#3498db",
      "#2ecc71",
      "#1abc9c",
      "#9b59b6",
      "#f1c40f",
      "#e67e22",
      "#e74c3c"
    ])
    // 浏览趋势折线图
    let trend = () => {
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
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
      //自适应大小
      window.onresize = function () {
        myChart.resize();
      };
    };
    // 浏览时间柱形图
    let time = () => {
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
          data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
      //自适应大小
      window.onresize = function () {
        myChart.resize();
      };
    };
    // 浏览文章饼图
    let article = () => {
      let myChart = echarts.init(document.getElementById("article"));
      // 绘制图表
      myChart.setOption({
        color: color.value,
        tooltip: {
          trigger: 'item'
        },
        legend: {

        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ],
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
    let note = () => {
      let myChart = echarts.init(document.getElementById("note"));
      // 绘制图表
      myChart.setOption({
        color: color.value,
        legend: {
          data: ['预算分配', '实际开销']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '销售（Sales）', max: 6500},
            { name: '管理（Administration）', max: 16000},
            { name: '信息技术（Information Technology）', max: 30000},
            { name: '客服（Customer Support）', max: 38000},
            { name: '研发（Development）', max: 52000},
            { name: '市场（Marketing）', max: 25000}
          ]
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: '预算分配'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: '实际开销'
            }
          ]
        }]
      });
      //自适应大小
      window.onresize = function () {
        myChart.resize();
      };
    };
    onMounted(() => {
      trend();
      time()
      article()
      note()
    });
    return {}
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
