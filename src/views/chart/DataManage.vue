<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-29 11:41:53
 * @FilePath: \datashow\src\views\chart\DataManage.vue
 * @descripttion: [运营分析的页面]
 * @editor: [lujie]
-->
<template>
  <div class="pie">
    <div class="pie-content">
      <div class="pie-left">
        <my-chart
          class="mbvh"
          ref="zw"
          id="zw"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="zw"
        ></my-chart>
        <my-chart
          ref="js"
          id="js"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="js"
        ></my-chart>
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
          ref="cx"
          id="cx"
          class="mbvh"
          bgClass="bg-module-center"
          titleClass="bg-title bg-title-center"
          :options="cx"
        ></my-chart>
        <div class="pie-scroll bg-module-center">
          <p class="bg-title bg-title-center">审批日志</p>
          <vue-seamless-scroll class="pie-scroll-inner" :data="listData">
            <ul>
              <li
                class="pie-scroll-item fx fx-v-c"
                v-for="obj in listData"
                :key="obj.id"
              >
                <div class="fx-1 pie-scroll-left f12 fx fx-v-c">
                  <i class="el-icon-document"></i>{{ obj.cont }}
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
          ref="cj"
          id="cj"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="cj"
        ></pie-chart>
        <pie-chart
          ref="user"
          id="user"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="user"
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
      message: {},
      time: 0,
      // 审批日志
      listData: [
        {
          id: 1,
          cont: "接收到X X市民政局移送婚姻登记档案16卷",
          date: "2020-06-08 16:48:04"
        },
        {
          id: 2,
          cont: "接收到X X市人力资源保障局移送工伤认定档案P卷",
          date: "2020-06-08 16:48:04"
        },
        {
          id: 3,
          cont: "接收到X X市第一人民医院移送出生档案34卷",
          date: "2020-06-08 16:48:04"
        },
        {
          id: 4,
          cont: "接收到X X市房产交易中心移送房产登记档案376卷",
          date: "2020-06-08 16:48:04"
        },
        {
          id: 5,
          cont: "接收到张三捐赠xx先水源分布图",
          date: "2020-06-08 16:48:04"
        },
        {
          id: 6,
          cont: "审批日志需要相关领导进行签字和发送",
          date: "2020-06-08 16:48:04"
        }
      ]
    };
  },
  computed: {
    // 政务外网
    zw() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "政务外网",
        option: {
          tooltip: { trigger: "axis" },
          xAxis: {
            name: "分类",
            data: ["民政局", "教育局", "房管局", "工商局", "公检法", "其他"]
          },
          legend: {
            bottom: "1%",
            textStyle: { color: "#ffffff" }
          },
          grid: { bottom: "20%", top: "15%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "导入数",
              type: "bar",
              data: this.message.zwwwdrs
            },
            {
              name: "审计数",
              type: "bar",
              data: this.message.zwwwsjs
            }
          ]
        }
      };
    },
    // 单位数据检索和调卷利用情况
    js() {
      const jy = this.message.dwsjjy || [0, 0, 0, 0];
      const cx = this.message.dwsjcx || [0, 0, 0, 0];
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "单位数据检索和调卷利用情况",
        option: {
          legend: {
            bottom: "0",
            textStyle: { color: "#ffffff" }
          },
          dataset: {
            source: [
              ["search", "borrow", "types"],
              [cx[0], jy[0], "教育局"],
              [cx[1], jy[1], "民政局"],
              [cx[2], jy[2], "工商局"],
              [cx[3], jy[3], "房管局"]
            ]
          },
          tooltip: {},
          xAxis: {
            name: "数量",
            nameGap: 25
          },
          grid: { bottom: "18%", top: "15%" },
          yAxis: { name: "类别", type: "category" },
          series: [
            {
              type: "bar",
              name: "查询",
              encode: {
                x: "search",
                y: "types"
              }
            },
            {
              type: "bar",
              name: "借阅",
              encode: {
                x: "borrow",
                y: "types"
              }
            }
          ]
        }
      };
    },
    // 开放档案查阅情况
    cj() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "开放档案查阅情况",
        option: {
          series: [
            {
              top: "-5%",
              name: "开放档案查阅情况",
              type: "pie",
              radius: ["30%", "55%"],
              data: this.message.yhchjsp
            }
          ]
        }
      };
    },
    // 政务数据展示
    msgList() {
      return [
        {
          id: 1,
          name: "政务(已办理)",
          mount: this.message.zwybl || 0,
          up: true,
          color: "#67c23a",
          hb: this.message.zwyblhb || 0
        },
        {
          id: 2,
          name: "政务(办理中)",
          mount: this.message.zwblz || 0,
          up: false,
          color: "#e6a23c",
          hb: this.message.zwblzhb || 0
        },
        {
          id: 3,
          name: "政务(未办理)",
          mount: this.message.zwwbl || 0,
          up: false,
          color: "#409eff",
          hb: this.message.zwwblhb || 0
        }
      ];
    },
    // 数据查询
    cx() {
      return {
        height: (100 * 320) / 1080 + "vh",
        title: "数据查询",
        option: {
          legend: {
            bottom: "0",
            textStyle: { color: "#ffffff" }
          },
          tooltip: { trigger: "axis" },
          xAxis: {
            name: "资源",
            data: ["文书", "照片", "录音", "录像", "特殊载体"]
          },
          grid: { bottom: "18%", top: "16%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "档案处",
              type: "line",
              data: this.message.sjcx_dac
            },
            {
              name: "办公室",
              type: "line",
              data: this.message.sjcx_bgs
            },
            {
              name: "行政处",
              type: "line",
              data: this.message.sjcx_xzc
            },
            {
              name: "法规处",
              type: "line",
              data: this.message.sjcx_fgc
            },
            {
              name: "信息技术处",
              type: "line",
              data: this.message.sjcx_xxjsc
            },
            {
              name: "保管处",
              type: "line",
              data: this.message.sjcx_bgc
            }
          ]
        }
      };
    },
    // 非开放档案预申请情况
    user() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "非开放档案预申请情况",
        option: {
          series: [
            {
              top: "-5%",
              name: "非开放档案预申请情况",
              type: "pie",
              radius: ["30%", "55%"],
              data: this.message.yhjyjsp
            }
          ]
        }
      };
    }
  },
  mounted() {
    const refs = ["zw", "js", "cj", "cx", "user"];
    this.initData(refs, true);
    window.addEventListener("resize", resizeChart(refs, this));
    this.timer = setInterval(() => {
      let resuleRefs = [];
      this.time += 5;
      this.time % 5 === 0 && resuleRefs.push("zw");
      this.time % 10 === 0 && resuleRefs.push("js");
      this.time % 15 === 0 && resuleRefs.push("cj");
      this.time % 20 === 0 && resuleRefs.push("cx");
      this.time % 25 === 0 && resuleRefs.push("user");
      this.initData(resuleRefs);
    }, 5000);
  },
  // 销毁定时器和事件
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
      this.$server.chart.manage(res => {
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
    height: 226px;
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
