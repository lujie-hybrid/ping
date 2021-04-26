<!--
 * @author: lujie
 * @Date: 2020-06-18 15:47:44
 * @LastEditTime: 2020-07-29 11:45:20
 * @FilePath: \datashow\src\views\chart\Identify.vue
 * @descripttion: [鉴定处页面]
 * @editor: [lujie]
-->
<template>
  <div class="pie">
    <div class="pie-content">
      <div class="pie-left">
        <my-chart
          class="mbvh"
          ref="jdtj"
          id="jdtj"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="jdtj"
        ></my-chart>
        <pie-chart
          ref="grgzqk"
          id="grgzqk"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="grgzqk"
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
          ref="yftj"
          class="mbvh"
          id="yftj"
          bgClass="bg-module-center"
          titleClass="bg-title bg-title-center"
          :options="yftj"
        ></my-chart>
        <div class="pie-scroll bg-module-center">
          <p class="bg-title bg-title-center">问题汇总</p>
          <vue-seamless-scroll class="pie-scroll-inner" :data="listData">
            <ul>
              <li
                class="pie-scroll-item fx fx-v-c"
                v-for="obj in listData"
                :key="obj.id"
              >
                <div class="fx-1 ope-scroll-left f12">
                  <i class="el-icon-warning-outline"></i> {{ obj.cont }}
                </div>
                <p class="f12">{{ obj.date }}</p>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="pie-right">
        <pie-chart
          class="mbvh"
          ref="zblc"
          id="zblc"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="zblc"
        ></pie-chart>
        <pie-chart
          ref="th"
          id="th"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="th"
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
      // 问题汇总
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
          date: "2020-06-08 16:58:48",
          cont: "接收到张三捐赠xx先水源分布图"
        }
      ],
      time: 0
    };
  },
  computed: {
    // 阶段统计
    jdtj() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "阶段统计",
        option: {
          tooltip: {},
          xAxis: {
            name: "阶段",
            data: ["初审", "复审", "专家组审", "审定", "入库"]
          },
          grid: { bottom: "10%", top: "15%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "阶段统计",
              type: "bar",
              data: this.message.jdtj
            }
          ]
        }
      };
    },
    // 个人工作情况
    grgzqk() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "个人工作情况",
        option: {
          tooltip: {},
          legend: { bottom: "0" },
          series: [
            {
              top: "-5%",
              name: "个人工作情况",
              type: "pie",
              roseType: "radius",
              radius: ["30%", "70%"],
              data: this.message.grgzqk
            }
          ]
        }
      };
    },
    // 按月份统计
    yftj() {
      return {
        height: (100 * 250) / 1080 + "vh",
        title: "按月份统计",
        option: {
          tooltip: {},
          xAxis: {
            name: "月份",
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
          },
          grid: { bottom: "10%", top: "18%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "按月份统计",
              type: "line",
              data: this.message.ayftj
            }
          ]
        }
      };
    },
    // 整编流程
    zblc() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "整编流程",
        option: {
          tooltip: {},
          legend: { bottom: "0" },
          series: [
            {
              top: "-5%",
              name: "整编流程",
              type: "pie",
              radius: ["40%", "70%"],
              data: this.message.zblc
            }
          ]
        }
      };
    },
    // 每月退还情况
    th() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "每月退还情况",
        option: {
          tooltip: {},
          legend: { bottom: "0" },
          series: [
            {
              top: "-5%",
              name: "每月退还情况",
              type: "pie",
              radius: ["40%", "70%"],
              data: this.message.mythqk
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
          name: "已整编(卷)",
          mount: this.message.yzb || 0,
          up: false,
          color: "#e6a23c",
          hb: this.message.yzbhb || 0
        },
        {
          id: 3,
          name: "待整编(卷)",
          mount: this.message.dzb || 0,
          up: false,
          color: "#409eff",
          hb: this.message.dzbhb || 0
        },
        {
          id: 4,
          name: "整编中(卷)",
          mount: this.message.zbz || 0,
          up: false,
          color: "#409eff",
          hb: this.message.zbzhb || 0
        }
      ];
    }
  },
  mounted() {
    const refs = ["jdtj", "grgzqk", "zblc", "yftj", "th"];
    this.initData(refs, true);
    window.addEventListener("resize", resizeChart(refs, this));
    this.timer = setInterval(() => {
      let resuleRefs = [];
      this.time += 5;
      this.time % 5 === 0 && resuleRefs.push("jdtj");
      this.time % 10 === 0 && resuleRefs.push("grgzqk");
      this.time % 15 === 0 && resuleRefs.push("zblc");
      this.time % 20 === 0 && resuleRefs.push("yftj");
      this.time % 25 === 0 && resuleRefs.push("th");
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
      this.$server.chart.identify(res => {
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
    width: 27.86vw;
  }
  &-center {
    flex: 1;
    margin: 0 18px;
  }
  &-right {
    width: 27.86vw;
  }
  &-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 178px;
    /* padding: 2vh 2vw; */
    &-item {
      color: #ffffff;
      margin-left: 15px;
      /* flex: 1; */
      border-radius: 6px;
      height: 110px;
      width: 150px;
    }
    &-item:nth-child(1) {
      margin-left: 0;
      background-color: #64c5ea;
      > p:nth-child(1) {
        color: #1477aa;
      }
    }
    &-item:nth-child(2) {
      background-color: #eedfc2;
      > p:nth-child(1) {
        color: #a77b36;
      }
    }
    &-item:nth-child(3) {
      background-color: #9ee5ee;
      > p:nth-child(1) {
        color: #36a78d;
      }
    }
    &-item:nth-child(4) {
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
