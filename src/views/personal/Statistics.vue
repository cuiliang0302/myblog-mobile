<!--数据统计-->
<template>
  <div class="statistics">
    <NavBar :title="title"></NavBar>
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
        <canvas id="trend" width="350" height="260"></canvas>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览时间</h2>
        <span></span>
      </div>
      <div class="chart">
        <canvas id="time" width="350" height="260"></canvas>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览文章</h2>
        <span></span>
      </div>
      <div class="chart">
        <canvas id="article" width="350" height="260"></canvas>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>浏览笔记</h2>
        <span></span>
      </div>
      <div class="chart">
        <canvas id="note" width="350" height="260"></canvas>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/personal/NavBar";
import {onMounted, reactive} from "vue";
import {Grid, GridItem, Tag} from 'vant';
import F2 from "@antv/f2";
import _ from 'lodash';

export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tag.name]: Tag,
    NavBar
  },
  name: "Statistics",
  setup() {
    const title = '数据统计'
    // 浏览趋势折线图表
    let trend = () => {
      const data = [{
        value: 63.4,
        city: 'New York',
        date: '2011-10-01'
      }, {
        value: 62.7,
        city: 'Alaska',
        date: '2011-10-01'
      }, {
        value: 72.2,
        city: 'Austin',
        date: '2011-10-01'
      }, {
        value: 58,
        city: 'New York',
        date: '2011-10-02'
      }, {
        value: 59.9,
        city: 'Alaska',
        date: '2011-10-02'
      }, {
        value: 67.7,
        city: 'Austin',
        date: '2011-10-02'
      }, {
        value: 53.3,
        city: 'New York',
        date: '2011-10-03'
      }, {
        value: 59.1,
        city: 'Alaska',
        date: '2011-10-03'
      }, {
        value: 69.4,
        city: 'Austin',
        date: '2011-10-03'
      }, {
        value: 55.7,
        city: 'New York',
        date: '2011-10-04'
      }, {
        value: 58.8,
        city: 'Alaska',
        date: '2011-10-04'
      }, {
        value: 68,
        city: 'Austin',
        date: '2011-10-04'
      }, {
        value: 64.2,
        city: 'New York',
        date: '2011-10-05'
      }, {
        value: 58.7,
        city: 'Alaska',
        date: '2011-10-05'
      }, {
        value: 72.4,
        city: 'Austin',
        date: '2011-10-05'
      }, {
        value: 58.8,
        city: 'New York',
        date: '2011-10-06'
      }, {
        value: 57,
        city: 'Alaska',
        date: '2011-10-06'
      }, {
        value: 77,
        city: 'Austin',
        date: '2011-10-06'
      }];
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: 'trend',
        pixelRatio: window.devicePixelRatio
      });
      // Step 2: 载入数据源
      chart.source(data, {
        date: {
          range: [0, 1],
          type: 'timeCat',
          mask: 'MM-DD'
        },
        value: {
          max: 300,
          tickCount: 4
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.tooltip({
        showCrosshairs: true,
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = chart.get('legendController').legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function (item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.forEach(function (item) {
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      chart.axis('date', {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.area()
          .position('date*value')
          .color('city')
          .adjust('stack');
      chart.line()
          .position('date*value')
          .color('city')
          .adjust('stack');
      // Step 4: 渲染图表
      chart.render();
    };
    // 浏览时间柱形图表
    let time = () => {
      const data = [{
        name: 'London',
        月份: 'Jan.',
        月均降雨量: 18.9
      }, {
        name: 'London',
        月份: 'Feb.',
        月均降雨量: 28.8
      }, {
        name: 'London',
        月份: 'Mar.',
        月均降雨量: 39.3
      }, {
        name: 'London',
        月份: 'Apr.',
        月均降雨量: 81.4
      }, {
        name: 'London',
        月份: 'May.',
        月均降雨量: 47
      }, {
        name: 'London',
        月份: 'Jun.',
        月均降雨量: 20.3
      }, {
        name: 'London',
        月份: 'Jul.',
        月均降雨量: 24
      }, {
        name: 'London',
        月份: 'Aug.',
        月均降雨量: 35.6
      }, {
        name: 'Berlin',
        月份: 'Jan.',
        月均降雨量: 12.4
      }, {
        name: 'Berlin',
        月份: 'Feb.',
        月均降雨量: 23.2
      }, {
        name: 'Berlin',
        月份: 'Mar.',
        月均降雨量: 34.5
      }, {
        name: 'Berlin',
        月份: 'Apr.',
        月均降雨量: 99.7
      }, {
        name: 'Berlin',
        月份: 'May.',
        月均降雨量: 52.6
      }, {
        name: 'Berlin',
        月份: 'Jun.',
        月均降雨量: 35.5
      }, {
        name: 'Berlin',
        月份: 'Jul.',
        月均降雨量: 37.4
      }, {
        name: 'Berlin',
        月份: 'Aug.',
        月均降雨量: 42.4
      }];
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: 'time',
        pixelRatio: window.devicePixelRatio
      });
      // Step 2: 载入数据源
      chart.source(data, {
        月均降雨量: {
          tickCount: 5
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = chart.get('legendController').legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function (item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.forEach(function (item) {
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      chart.interval()
          .position('月份*月均降雨量')
          .color('name')
          .adjust('stack');
      // Step 4: 渲染图表
      chart.render();
    };
    // 浏览文章饼图
    let article = () => {
      const data = [{
        year: '2001',
        population: 41.8
      }, {
        year: '2002',
        population: 25.8
      }, {
        year: '2003',
        population: 31.7
      }, {
        year: '2004',
        population: 46
      }, {
        year: '2005',
        population: 28
      }];
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: 'article',
        pixelRatio: window.devicePixelRatio
      });
      // Step 2: 载入数据源
      chart.source(data);
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.coord('polar');
      chart.legend({
        position: 'top'
      });
      chart.axis(false);
      chart.interval()
          .position('year*population')
          .color('year')
          .style({
            lineWidth: 1,
            stroke: '#fff'
          });
      // Step 4: 渲染图表
      chart.render();
    };
    // 浏览笔记雷达图
    let note = () => {
      const data = [{
        item: 'Design',
        user: '用户 A',
        score: 70
      }, {
        item: 'Design',
        user: '用户 B',
        score: 30
      }, {
        item: 'Development',
        user: '用户 A',
        score: 60
      }, {
        item: 'Development',
        user: '用户 B',
        score: 70
      }, {
        item: 'Marketing',
        user: '用户 A',
        score: 50
      }, {
        item: 'Marketing',
        user: '用户 B',
        score: 60
      }, {
        item: 'Users',
        user: '用户 A',
        score: 40
      }, {
        item: 'Users',
        user: '用户 B',
        score: 50
      }, {
        item: 'Test',
        user: '用户 A',
        score: 60
      }, {
        item: 'Test',
        user: '用户 B',
        score: 70
      }, {
        item: 'Language',
        user: '用户 A',
        score: 70
      }, {
        item: 'Language',
        user: '用户 B',
        score: 50
      }, {
        item: 'Technology',
        user: '用户 A',
        score: 70
      }, {
        item: 'Technology',
        user: '用户 B',
        score: 40
      }, {
        item: 'Support',
        user: '用户 A',
        score: 60
      }, {
        item: 'Support',
        user: '用户 B',
        score: 40
      }];
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: 'note',
        pixelRatio: window.devicePixelRatio
      });
      // Step 2: 载入数据源
      chart.source(data, {
        score: {
          min: 0,
          max: 120,
          nice: false,
          tickCount: 4
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.coord('polar');
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = chart.get('legendController').legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function(item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.forEach(function(item) {
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      chart.axis('score', {
        label: function label(text, index, total) {
          if (index === total - 1) {
            return null;
          }
          return {
            top: true
          };
        },
        grid: function grid(text) {
          if (text === '120') {
            return {
              lineDash: null
            };
          }
        },
        line: {
          top: false
        }
      });
      chart.area().position('item*score').color('user')
          .animate({
            appear: {
              animation: 'groupWaveIn'
            }
          });
      chart.line().position('item*score').color('user')
          .animate({
            appear: {
              animation: 'groupWaveIn'
            }
          });
      chart.point().position('item*score').color('user')
          .style({
            stroke: '#fff',
            lineWidth: 1
          })
          .animate({
            appear: {
              delay: 300
            }
          });
      // Step 4: 渲染图表
      chart.render();
    };
    onMounted(() => {
      trend();
      time();
      article();
      note();
    });
    return {
      title
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
