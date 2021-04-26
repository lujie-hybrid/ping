<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-27 10:37:46
 * @FilePath: \datashow\src\views\chart\PieDetail.vue
 * @descripttion: [数据统计的页面]
 * @editor: [lujie]
-->
<template>
  <div class="pie">
    <div class="pie-content">
      <div class="pie-left">
        <my-chart
          class="mbvh"
          ref="gc"
          id="gc"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="gc"
        ></my-chart>
        <pie-chart
          ref="dafl"
          id="dafl"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="dafl"
        ></pie-chart>
      </div>
      <div class="pie-center">
        <ul class="pie-msg bg-module-center mbvh">
          <li
            class="pie-msg-item fx-v-c fx fx-h-c fx-v"
            v-for="item in msgList"
            :key="item.id"
          >
            <p class="f16">{{ item.name }}</p>
            <p class="f34 mt6 fma fw">
              {{ item.mount }}
            </p>
            <p class="f16">环比 + {{ item.hb }}%</p>
          </li>
        </ul>
        <my-chart
          ref="dazy"
          class="mbvh"
          bgClass="bg-module-center"
          titleClass="bg-title bg-title-center"
          id="dazy"
          :options="dazy"
        ></my-chart>
        <div class="pie-scroll bg-module-center">
          <p class="bg-title bg-title-center">日志新闻</p>
          <vue-seamless-scroll class="pie-scroll-inner" :data="listData">
            <ul>
              <li
                class="pie-scroll-item fx fx-v-c"
                v-for="obj in listData"
                :key="obj.id"
              >
                <div class="fx-1 pie-scroll-left f12">
                  <i class="el-icon-folder-opened"></i>{{ obj.title }}
                  {{ obj.cont }}
                </div>
                <p class="f12">{{ obj.date }}</p>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="pie-right">
        <my-chart
          ref="ssdd"
          class="mbvh"
          id="ssdd"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="ssdd"
        ></my-chart>
        <pie-chart
          ref="cj"
          id="cj"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="cj"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { resizeChart } from "@/utils/common";
export default {
  name: "pie",
  data() {
    return {
      // 接口获取的数据
      message: {},
      // 日志新闻
      listData: [
        {
          id: 1,
          title: "档案采集",
          date: "2020-06-04 10:41:20",
          cont: "接收到X X市民政局移送婚姻登记档案16卷"
        },
        {
          id: 2,
          title: "档案采集",
          date: "2020-06-04 15:22:43",
          cont: "接收到X X市人力资源保障局移送工伤认定档案P卷"
        },
        {
          id: 3,
          title: "档案采集",
          date: "2020-06-08 11:02:31",
          cont: "接收到X X市第一人民医院移送出生档案34卷"
        },
        {
          id: 4,
          title: "档案采集",
          date: "2020-06-08 16:48:04",
          cont: "接收到X X市房产交易中心移送房产登记档案376卷"
        },
        {
          id: 5,
          title: "档案采集",
          date: "2020-06-08 16:58:48",
          cont: "接收到张三捐赠xx先水源分布图"
        },
        {
          id: 6,
          title: "档案采集",
          date: "2020-06-08 11:02:31",
          cont: "接收到X X市第一人民医院移送出生档案34卷"
        },
        {
          id: 7,
          title: "档案采集",
          date: "2020-06-08 16:48:04",
          cont: "接收到X X市房产交易中心移送房产登记档案376卷"
        },
        {
          id: 8,
          title: "档案采集",
          date: "2020-06-08 16:58:48",
          cont: "接收到张三捐赠xx先水源分布图"
        }
      ],
      time: 0
    };
  },
  computed: {
    // 历年馆藏档案
    gc() {
      return {
        title: "历年馆藏档案",
        height: (100 * 334) / 1080 + "vh",
        option: {
          tooltip: {},
          xAxis: {
            name: "年份",
            axisLabel: {
              rotate: 70
            },
            data: [
              1909,
              1920,
              1925,
              1930,
              1935,
              1940,
              1945,
              1950,
              1955,
              1960,
              1965,
              1970,
              1975,
              1980,
              1995,
              2000,
              2005,
              2010,
              2015,
              2020
            ]
          },
          // grid: { bottom: 60, top: "22%" },
          yAxis: { name: "万件" },
          series: [
            {
              name: "历年馆藏档案",
              type: "line",
              data: this.message.lngcda
            }
          ]
        }
      };
    },
    // 档案分类
    dafl() {
      return {
        title: "档案分类",
        height: (100 * 334) / 1080 + "vh",
        option: {
          tooltip: {},
          series: [
            {
              top: "-15%",
              name: "档案分类",
              type: "pie",
              radius: ["30%", "50%"],
              data: this.message.dafl
            }
          ]
        }
      };
    },
    // 档案资源统计
    dazy() {
      return {
        height: (100 * 241) / 1080 + "vh",
        title: "档案资源统计",
        option: {
          tooltip: {},
          xAxis: {
            name: "资源",
            data: ["政务内网", "政务外网", "因特网"]
          },
          grid: { bottom: "12%", top: "18%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "档案资源",
              type: "bar",
              data: this.message.dazytj,
              barWidth: "35%"
            }
          ]
        }
      };
    },
    // 已数字化档案
    ssdd() {
      const data = this.message.yszhda || [0, 0, 0, 0];
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "已数字化档案",
        option: {
          dataset: {
            source: [
              ["mount", "types"],
              [data[0], "录像"],
              [data[1], "录音"],
              [data[2], "照片"],
              [data[3], "文书"]
            ]
          },
          tooltip: {},
          xAxis: {
            name: "数量",
            nameGap: 20
          },
          grid: { bottom: "10%" },
          yAxis: { name: "类别", type: "category" },
          series: [
            {
              type: "bar",
              encode: {
                x: "mount",
                y: "types"
              }
            }
          ]
        }
      };
    },
    // 档案采集比例
    cj() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "档案采集比例",
        option: {
          tooltip: { formatter: `{b}：{c}%` },
          legend: { bottom: "2%" },
          series: [
            {
              top: "-5%",
              name: "档案采集",
              type: "pie",
              radius: ["40%", "60%"],
              data: this.message.dacjbl,
              label: {
                formatter: `{b}：{c}%`
              }
            }
          ]
        }
      };
    },
    // 中间数据
    msgList() {
      return [
        {
          id: 1,
          name: "馆藏总量(卷)",
          mount: this.message.gczl || 0,
          up: true,
          color: "#67c23a",
          hb: this.message.gczlhb || 0
        },
        {
          id: 2,
          name: "已数字化总量(卷)",
          mount: this.message.yszhzl || 0,
          up: false,
          color: "#e6a23c",
          hb: this.message.yszhzlhb || 0
        },
        {
          id: 3,
          name: "今日接收(卷)",
          mount: this.message.jrjs || 0,
          up: false,
          color: "#409eff",
          hb: this.message.jrjshb || 0
        }
      ];
    }
  },
  mounted() {
    const refs = ["gc", "dafl", "ssdd", "cj", "dazy"];
    this.initData(refs, true);
    window.addEventListener("resize", resizeChart(refs, this));
    this.timer = setInterval(() => {
      let resuleRefs = [];
      this.time += 5;
      this.time % 5 === 0 && resuleRefs.push("ssdd");
      this.time % 10 === 0 && resuleRefs.push("cj");
      this.time % 15 === 0 && resuleRefs.push("dazy");
      this.initData(resuleRefs);
    }, 5000);
  },
  // 销毁
  beforeDestroy() {
    window.removeEventListener("resize", window.resizeChart);
    clearInterval(this.timer);
  },
  components: {},
  methods: {
    /**
     * @Date: 2020-06-17 11:39:05
     * @description: [desc]
     * @param {refs} 要更新的图表ref集合
     * @param {isInit} 是否是首次更新
     * @editor: [lujie]
     */
    initData(refs, isInit) {
      this.$server.chart.stat(res => {
        this.message = res;
        this.$nextTick(() => {
          refs.forEach(r => {
            if (isInit) {
              this.$refs[r].initData();
            } else {
              this.$refs[r].updateChartData();
            }
          });
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pie {
  &-content {
    margin: 0 auto;
    display: flex;
  }
  &-left {
    width: 27.34vw;
  }
  &-center {
    flex: 1;
    margin: 0 18px;
  }
  &-right {
    width: 27.34vw;
  }
  &-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 187px;
    /* padding: 2vh 2vw; */
    &-item {
      color: #ffffff;
      margin-left: 40px;
      /* flex: 1; */
      border-radius: 6px;
      height: 110px;
      width: 178px;
    }
    &-item:nth-child(1) {
      margin-left: 0;
      background-color: #64c5ea;
      > p:nth-child(1) {
        color: #1477aa;
      }
    }
    &-item:nth-child(2) {
      background-color: #9ee5ee;
      > p:nth-child(1) {
        color: #36a78d;
      }
    }
    &-item:nth-child(3) {
      background-color: #dbb0df;
      > p:nth-child(1) {
        color: #975c8a;
      }
    }
  }
  &-scroll {
    height: 296px;
    display: flex;
    flex-direction: column;
    /* padding: 5vh 3vh 1.5vh 3vh; */
    width: 100%;
    &-inner {
      overflow: hidden;
      height: 100%;
      flex: 1;
    }
    &-item {
      height: 38px;
      padding: 0 12px;
      color: #a5e7f0;
    }
    &-item:nth-child(2n + 1) {
      background-color: #053c61;
    }
    &-left i {
      margin-right: 5px;
      font-size: 18px;
    }
  }
}
.mbvh {
  margin-bottom: 30px;
}
</style>
